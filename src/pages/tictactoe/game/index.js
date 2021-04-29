import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTictactoe } from 'contexts/tictactoe'

const TictactoeGame = () => {
  const tictactoe = useTictactoe()
  const history = useHistory()

  useEffect(() => {
    if (tictactoe.activeGame === null) {
      window.alert('No active game')
      history.replace('/tictactoe')
    }
  }, [tictactoe.activeGame])

  return <div>Game</div>
}

export default TictactoeGame
