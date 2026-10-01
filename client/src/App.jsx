import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import WorldMap from './components/WorldMap'
import PlayerPanel from './components/PlayerPanel'
import TerritoryInfo from './components/TerritoryInfo'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [player, setPlayer] = useState(null)
  const [worldState, setWorldState] = useState(null)
  const [selectedTerritory, setSelectedTerritory] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('')

  useEffect(() => {
    const newSocket = io('http://localhost:3000')
    setSocket(newSocket)

    newSocket.on('world-update', (state) => {
      setWorldState(state)
    })

    newSocket.on('player-updated', (updatedPlayer) => {
      setPlayer(updatedPlayer)
    })

    return () => newSocket.disconnect()
  }, [])

  const handleJoinGame = () => {
    if (playerName.trim() && socket) {
      socket.emit('join-game', { name: playerName })
      setGameStarted(true)
    }
  }

  const handleConquerTerritory = (territoryId) => {
    if (socket && player) {
      socket.emit('conquer-territory', { territoryId })
    }
  }

  const handleUpgradeArmy = (amount) => {
    if (socket) {
      socket.emit('upgrade-army', { amount })
    }
  }

  const handleUpgradeEconomy = () => {
    if (socket) {
      socket.emit('upgrade-economy', {})
    }
  }

  const handleUpgradePopulation = () => {
    if (socket) {
      socket.emit('upgrade-population', {})
    }
  }

  if (!gameStarted) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>🌍 World Conquest</h1>
          <p>Conquer territories, manage your empire, and dominate the world!</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJoinGame()}
          />
          <button onClick={handleJoinGame}>Join Game</button>
        </div>
      </div>
    )
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>🌍 World Conquest</h1>
        {player && <span className="player-name">Player: {player.name}</span>}
      </header>

      <div className="game-content">
        <div className="map-section">
          {worldState && (
            <WorldMap
              territories={worldState.territories}
              players={worldState.players}
              selectedTerritory={selectedTerritory}
              onTerritorySelect={setSelectedTerritory}
              onConquer={handleConquerTerritory}
              currentPlayerId={socket?.id}
            />
          )}
        </div>

        <div className="ui-panel">
          {player && (
            <>
              <PlayerPanel
                player={player}
                onUpgradeArmy={handleUpgradeArmy}
                onUpgradeEconomy={handleUpgradeEconomy}
                onUpgradePopulation={handleUpgradePopulation}
              />
              {selectedTerritory && worldState && (
                <TerritoryInfo
                  territory={worldState.territories[selectedTerritory]}
                  players={worldState.players}
                  onConquer={() => handleConquerTerritory(selectedTerritory)}
                  canConquer={player.id !== worldState.territories[selectedTerritory]?.owner}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App