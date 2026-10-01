import './TerritoryInfo.css'

function TerritoryInfo({ territory, players, onConquer, canConquer }) {
  const owner = players.find((p) => p.id === territory.owner)

  return (
    <div className="territory-info">
      <h2>📍 {territory.name}</h2>

      <div className="territory-details">
        <div className="detail-item">
          <span className="detail-label">Owner:</span>
          <span className="detail-value">
            {owner ? (
              <span style={{ color: owner.color }}>●</span>
            ) : (
              <span>⚪</span>
            )}
            {owner ? owner.name : 'Neutral'}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Troops:</span>
          <span className="detail-value">⚔️ {Math.floor(territory.troops)}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Defense Level:</span>
          <span className="detail-value">🛡️ {territory.defenseLevel}</span>
        </div>
      </div>

      {canConquer && (
        <button className="conquer-btn" onClick={onConquer}>
          ⚔️ Attack Territory
        </button>
      )}

      {!canConquer && owner && (
        <div className="owned-info">
          <p>✓ This territory is controlled by {owner.name}</p>
        </div>
      )}
    </div>
  )
}

export default TerritoryInfo