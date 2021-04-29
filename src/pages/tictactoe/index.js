import React, { useState, useEffect } from 'react'
import HostPopup from './host-popup'
import firebase from 'firebase'
import { useAuth } from 'contexts/auth'
import { useTictactoe } from 'contexts/tictactoe'
import { Switch, useHistory, useRouteMatch } from 'react-router-dom'
import PrivateRoute from 'components/private-route'
import TictactoeGame from 'pages/tictactoe/game'

export default () => {
  const { path, url } = useRouteMatch()
  const history = useHistory()
  const tictactoe = useTictactoe()
  const [hostForm, setHostForm] = useState(false)
  const { user } = useAuth()
  const rooms = tictactoe.games ?? []

  useEffect(() => {
    // Load the rooms for the first time
    tictactoe.fetchGames()
    // Update the room list when new room added
    tictactoe.subscribeGames()

    return () => tictactoe.unsubscribeGames()
  }, [])

  const handleOpenHostGamePopup = (event) => setHostForm(true)

  const handleCancelHost = (event) => setHostForm(false)

  const handleHostGame = (room) => async (event) => {
    event.preventDefault()
    await tictactoe.hostGame(room.name)
    setHostForm(false)
  }

  const handleJoinGame = (room) => async (event) => {
    const confirm = window.confirm(
      `Are you sure you want to join ${room.metadata.name} and play against ${room.host.username}?`
    )
    if (confirm) {
      await tictactoe.joinGame(room.id)
      history.push(`${path}/game`)
    }
  }

  return (
    <Switch>
      <PrivateRoute path={`${path}/game`}>
        <TictactoeGame />
      </PrivateRoute>
      <PrivateRoute path={path}>
        <div>
          {hostForm && (
            <HostPopup onCancel={handleCancelHost} onHost={handleHostGame} />
          )}

          <div className="max-w-md container mx-auto px-4">
            <div>
              <button
                className="w-full px-4 py-2 outline-none focus:outline-none focus:ring bg-green-400 text-white rounded-none mt-8 mb-4 hover:bg-green-500"
                onClick={handleOpenHostGamePopup}
              >
                Host a Game
              </button>
            </div>

            <div>
              <ul
                className="border border-green-400 divide-y divide-green-100"
                style={{ height: '500px', maxHeight: '70vh' }}
              >
                {rooms.map((room, i) => (
                  <li
                    key={i}
                    className="group px-2 py-1 bg-gray-200 cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={handleJoinGame(room)}
                  >
                    <div>
                      <h2 className="overflow-ellipsis">
                        {room.metadata?.name}
                      </h2>
                      <p className="overflow-ellipsis text-sm text-gray-700 group-hover:text-gray-200">
                        {room.host?.username}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PrivateRoute>
    </Switch>
  )
}
