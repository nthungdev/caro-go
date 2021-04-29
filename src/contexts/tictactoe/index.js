import React, { useContext, createContext, useState, useEffect } from 'react'
import { useAuth } from 'contexts/auth'
import firebase from 'firebase'

import * as Helper from './helpers'

const defaultValue = {
  games: undefined,
  activeGame: undefined,
  joinGame: async (gameId) => {},
  quitGame: async (gameId) => {},
  hostGame: async (gameName) => {},
  fetchGames: async () => {},
  subscribeGames: async () => {},
  unsubscribeGames: async () => {},
}

const gameMode = 'tictactoe'

const TictactoeContext = createContext(defaultValue)

export const useTictactoe = () => {
  const game = useContext(TictactoeContext)
  if (game === undefined) {
    throw new Error('useGame must be used within a GameContext')
  }
  return game
}

export const TictactoeProvider = ({ children }) => {
  const [state, setState] = useState(defaultValue)
  const [ping, setPing] = useState(null)
  const auth = useAuth()
  const user = firebase.auth().currentUser

  useEffect(() => {
    startPinging()
  }, [state.activeGame])

  useEffect(() => {
    const getActiveGame = async () => {
      const db = firebase.database()
      await db
        .ref('users')
        .child(user.uid)
        .child('activeGame')
        .once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            const { role, gameId, gameMode } = snapshot.val()
            if (gameId && gameMode && role) {
              db.ref(gameMode)
                .child('games')
                .child(gameId)
                .once('value')
                .then((snapshot) => {
                  const data = snapshot.val()
                  const pingHost = data.host?.ping ?? 0
                  const pingOpp = data.opponent?.ping ?? 0
                  const duration = 5 * 60 * 1000
                  const now = Date.now()
                  if (now - pingHost > duration) {
                    // host timeout
                    console.log('host timeout')
                    setState((s) => ({ ...s, activeGame: null }))
                  } else if (now - pingOpp > duration) {
                    // opp timeout
                    console.log('opp timeout')
                    setState((s) => ({ ...s, activeGame: null }))
                  } else {
                    // Got activeGame
                    console.log('got activeGame')
                    setState((s) => ({ ...s, activeGame: snapshot.val() }))
                  }
                })
            }
          } else {
            setState((s) => ({ ...s, activeGame: null }))
          }
        })
    }

    if (auth.user) getActiveGame()
  }, [auth.user])

  useEffect(() => {
    return () => clearInterval(ping)
  }, [])

  const quitGame = async () => {
    await Helper.removeActiveGame(user.uid)
    const { gameId, role } = state.activeGame
    stopPinging()
    await Helper.removePing(gameId, role)
  }

  const joinGame = async (gameId) => {
    const role = 'opponent'

    await Helper.updateActiveGame(user.uid, gameId, role)
    await Helper.joinGame(user.uid, auth.user.username, gameId, role)

    setState((s) => ({
      ...s,
      activeGame: {
        gameId,
        gameMode,
        role,
      },
    }))
  }

  const hostGame = async (roomName) => {
    await firebase
      .database()
      .ref('tictactoe/games')
      .push({
        metadata: {
          name: roomName,
        },
        host: {
          username: auth.user.username,
          uid: auth.user.uid,
        },
      })
      .then(() => {
        console.log('set success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const startPinging = () => {
    if (state.activeGame) {
      const { gameId, role } = state.activeGame
      stopPinging()
      setInterval(() => Helper.ping(gameId, role), 4 * 60000)
    }
  }

  const stopPinging = () => (ping ? clearInterval(ping) : null)

  const fetchGames = async () => {
    await Helper.fetchGames().then((snapshot) => {
      let games = []
      snapshot.forEach((snap) => {
        games.push({ id: snap.key, ...snap.val() })
      })
      setState((s) => ({ ...s, games }))
    })
  }

  const subscribeGames = () =>
    firebase
      .database()
      .ref('tictactoe/games')
      .on('child_added', (snapshot) => {
        setState((s) => ({
          ...s,
          games: [...(s.games ?? []), { id: snapshot.key, ...snapshot.val() }],
        }))
      })

  const unsubscribeGames = () =>
    firebase.database().ref('tictactoe/games').off()

  return (
    <TictactoeContext.Provider
      value={{
        ...state,
        joinGame,
        quitGame,
        fetchGames,
        subscribeGames,
        unsubscribeGames,
        hostGame,
      }}
    >
      {children}
    </TictactoeContext.Provider>
  )
}
