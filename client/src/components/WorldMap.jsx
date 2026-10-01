import { useEffect, useRef, useState } from 'react'
import './WorldMap.css'

function WorldMap({ territories, players, selectedTerritory, onTerritorySelect, onConquer, currentPlayerId }) {
  const canvasRef = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)

  useEffect(() => {
    if (!canvasRef.current || !territories) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Clear canvas
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#0f3460'
    ctx.lineWidth = 0.5
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw territories
    territories.forEach((territory) => {
      const x = territory.x * (canvas.width / 100) + panX
      const y = territory.y * (canvas.height / 100) + panY
      const size = 40 * zoom

      // Territory circle
      const player = players.find((p) => p.id === territory.owner)
      ctx.fillStyle = player ? player.color : '#444'
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()

      // Border
      ctx.strokeStyle = selectedTerritory === territory.id ? '#00ff00' : '#fff'
      ctx.lineWidth = selectedTerritory === territory.id ? 3 : 1
      ctx.stroke()

      // Territory label
      ctx.fillStyle = '#fff'
      ctx.font = `bold ${12 * zoom}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(territory.name.split(' ')[0], x, y - size - 20)

      // Troops count
      ctx.fillStyle = '#ffff00'
      ctx.font = `${10 * zoom}px Arial`
      ctx.fillText(`⚔️ ${Math.floor(territory.troops)}`, x, y)
    })
  }, [territories, selectedTerritory, zoom, panX, panY])

  const handleCanvasClick = (e) => {
    if (!canvasRef.current || !territories) return

    const rect = canvasRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    territories.forEach((territory) => {
      const x = territory.x * (rect.width / 100) + panX
      const y = territory.y * (rect.height / 100) + panY
      const size = 40 * zoom

      const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2)
      if (distance < size) {
        onTerritorySelect(territory.id)
      }
    })
  }

  const handleWheel = (e) => {
    e.preventDefault()
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + (e.deltaY > 0 ? -0.1 : 0.1))))
  }

  return (
    <div className="world-map-container">
      <canvas
        ref={canvasRef}
        className="world-map"
        onClick={handleCanvasClick}
        onWheel={handleWheel}
      />
      <div className="map-controls">
        <button onClick={() => setZoom((prev) => Math.min(3, prev + 0.2))}>🔍+</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.2))}>🔍-</button>
      </div>
    </div>
  )
}

export default WorldMap