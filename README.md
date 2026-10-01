# 🌍 World Conquest - Online Multiplayer Strategy Game

Conquer territories, manage your empire, and dominate the world in this real-time multiplayer strategy game!

## Features

### 🗺️ World Map
- Interactive world map with 9 major territories
- Real-time territory visualization with player colors
- Zoom and pan controls
- Dynamic troop counts display

### 👑 Empire Management
- **Economy**: Generate gold from controlled territories
- **Population**: Grow your population to expand your power
- **Military**: Build and upgrade your army to conquer territories
- **Resources**: Manage gold, population, and troops strategically

### ⚔️ Combat System
- Attack enemy territories
- Defense levels affect battle outcomes
- Troops are consumed during attacks
- Conquered territories generate resources

### 🤝 Multiplayer Features
- Real-time multiplayer gameplay via Socket.IO
- Form alliances with other players
- Cooperative strategy and coordination
- Live world state updates

### 🎮 Modern UI
- Sleek dark theme with cyan and lime accents
- Real-time player stats panel
- Territory information display
- Upgrade management interface

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **Socket.IO** - Real-time multiplayer communication

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **HTML5 Canvas** - World map rendering
- **CSS3** - Modern styling with animations

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Esakkito/world-conquest.git
cd world-conquest
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

This will start both the backend (port 3000) and frontend (port 5173).

## How to Play

1. **Enter your name** and join the game
2. **View the world map** - Click on territories to select them
3. **Manage your empire:**
   - 💰 Gold is generated from your controlled territories
   - 👥 Grow your population to increase production
   - ⚔️ Build an army to conquer new territories
4. **Conquer territories:**
   - Click on an enemy territory
   - Click "Attack Territory" to attempt conquest
   - Your military power and troops determine victory
5. **Upgrade your empire:**
   - Military: Increase troop count and attack power
   - Economy: Boost gold generation
   - Population: Expand population and production
6. **Form alliances** with other players for mutual support

## Game Mechanics

### Resource Generation
- Each controlled territory generates:
  - Gold: `5 × Territory Count × Economy Level` per cycle
  - Population: `10 × Territory Count × Production Level` per cycle

### Combat
- **Attack Power** = Army Size × Military Level
- **Defense Power** = Territory Troops × Defense Level
- If attack power > defense power, territory is conquered
- Attacker loses troops equal to defense power / 2

### Upgrades
- **Military**: Costs `50 × 10 × Military Level` gold per 50 troops
- **Economy**: Costs `500 × Economy Level` gold
- **Population**: Costs `300 × Production Level` gold

## Project Structure

```
world-conquest/
├── server/
│   ├── index.js           # Main server file
│   └── gameManager.js     # Game logic and state management
├── client/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── style.css      # Global styles
│   │   ├── App.css        # App styles
│   │   └── components/
│   │       ├── WorldMap.jsx      # Map rendering
│   │       ├── PlayerPanel.jsx   # Player stats and upgrades
│   │       └── TerritoryInfo.jsx # Territory details
│   └── vite.config.js
└── package.json
```

## Future Enhancements

- [ ] Persistent database for game state
- [ ] User authentication and accounts
- [ ] Advanced AI opponents
- [ ] Diplomacy system (trade, treaties)
- [ ] Special units and technologies
- [ ] Leaderboards and rankings
- [ ] Mobile responsive design
- [ ] Sound effects and background music
- [ ] Map customization
- [ ] Tournament mode

## Contributing

Feel free to fork this repository and submit pull requests with improvements!

## License

MIT License - feel free to use this project as you wish!

---

**Start your conquest today! 🌍⚔️👑**
