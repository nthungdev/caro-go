import firebase from 'firebase'

const gameMode = 'tictactoe'

export const joinGame = async (uid, username, gameId, role) => {
  await firebase
    .database()
    .ref(gameMode)
    .child('games')
    .child(gameId)
    .child(role)
    .set({
      uid,
      username,
    })
}

export const updateActiveGame = async (uid, gameId, role) => {
  await firebase.database().ref('users').child(uid).child('activeGame').update({
    gameId,
    gameMode,
    role,
  })
}

export const removeActiveGame = async (uid) => {
  await firebase.database().ref('users').child(uid).child('activeGame').remove()
}

export const removePing = async (gameId, role) => {
  await firebase
    .database()
    .ref(gameMode)
    .child('games')
    .child(gameId)
    .child(role)
    .child('ping')
    .remove()
}

export const ping = async (gameId, role) => {
  await firebase
    .database()
    .ref(gameMode)
    .child('games')
    .child(gameId)
    .child(role)
    .child('ping')
    .set(Date.now())
}

export const fetchGames = async () =>
  await firebase.database().ref('tictactoe/games').get()
