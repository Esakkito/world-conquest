import './PlayerPanel.css'

function PlayerPanel({ player, onUpgradeArmy, onUpgradeEconomy, onUpgradePopulation }) {
  return (
    <div className="player-panel">
      <h2>👑 Empire Stats</h2>

      <div className="stat-group">
        <div className="stat-item">
          <span className="stat-label">💰 Gold</span>
          <span className="stat-value">{Math.floor(player.gold)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">👥 Population</span>
          <span className="stat-value">{Math.floor(player.population)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">⚔️ Army Size</span>
          <span className="stat-value">{Math.floor(player.armySize)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">🏰 Territories</span>
          <span className="stat-value">{player.territories.length}</span>
        </div>
      </div>

      <div className="upgrades-section">
        <h3>🔧 Upgrades</h3>

        <div className="upgrade-card">
          <div className="upgrade-header">
            <span>⚔️ Military Power</span>
            <span className="upgrade-level">Lvl {Math.floor(player.military)}</span>
          </div>
          <p>Increase attack power of your armies</p>
          <button className="upgrade-btn" onClick={() => onUpgradeArmy(50)}>
            Add 50 Troops (Cost: {Math.floor(50 * 10 * player.military)} 💰)
          </button>
        </div>

        <div className="upgrade-card">
          <div className="upgrade-header">
            <span>💹 Economy</span>
            <span className="upgrade-level">Lvl {Math.floor(player.economy)}</span>
          </div>
          <p>Increase gold generation per territory</p>
          <button className="upgrade-btn economy" onClick={onUpgradeEconomy}>
            Upgrade Economy (Cost: {Math.floor(500 * player.economy)} 💰)
          </button>
        </div>

        <div className="upgrade-card">
          <div className="upgrade-header">
            <span>📈 Population Growth</span>
            <span className="upgrade-level">Lvl {Math.floor(player.production)}</span>
          </div>
          <p>Increase population and production rate</p>
          <button className="upgrade-btn population" onClick={onUpgradePopulation}>
            Expand Population (Cost: {Math.floor(300 * player.production)} 💰)
          </button>
        </div>
      </div>

      <div className="allies-section">
        <h3>🤝 Allies ({player.allies.length})</h3>
        {player.allies.length === 0 ? (
          <p className="no-allies">No allies yet. Form alliances to strengthen your position!</p>
        ) : (
          <div className="allies-list">
            {player.allies.map((allyId) => (
              <span key={allyId} className="ally-badge">{allyId.slice(0, 8)}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PlayerPanel