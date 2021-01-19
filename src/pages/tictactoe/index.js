import React, { useState, useEffect } from 'react'
import HostPopup from './host-popup'
import firebase from 'firebase'
import { useAuth } from 'contexts/auth'

export default () => {
  const [hostForm, setHostForm] = useState(false)
  const [rooms, setRooms] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    // Load the rooms for the first time
    const fetchRooms = async () => {
      await firebase
        .database()
        .ref('tictactoe/games')
        .get()
        .then((snapshot) => {
          let rooms = []
          snapshot.forEach((snap) => {
            rooms.push({ id: snap.key, ...snap.val() })
          })
          setRooms(rooms)
        })
    }

    // Update the room list when new room added
    firebase
      .database()
      .ref('tictactoe/games')
      .on('child_added', (snapshot) => {
        setRooms((rooms) => [...rooms, { id: snapshot.key, ...snapshot.val() }])
      })

    fetchRooms()
  }, [])

  const handleOpenHostGamePopup = (event) => setHostForm(true)

  const handleCancelHost = (event) => setHostForm(false)

  const handleHostGame = (room) => async (event) => {
    event.preventDefault()
    await firebase
      .database()
      .ref('tictactoe/games')
      .push({
        name: room.name,
        host: {
          username: user.username,
          uid: user.uid,
        },
      })
      .then(() => {
        console.log('set success')
      })
      .catch((error) => {
        console.log('error', error)
      })

    setHostForm(false)
  }

  const handleJoinGame = (room) => async (event) => {
    const confirm = window.confirm(
      `Are you sure you want to join ${room.name} and play against ${room.host.username}?`
    )
    if (confirm) {
      // TODO:
    }
  }

  return (
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
                  <h2 className="overflow-ellipsis">{room.name}</h2>
                  <p className="overflow-ellipsis text-sm text-gray-700 group-hover:text-gray-200">
                    {room.host.username}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
