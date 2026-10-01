export class GameManager {
  constructor(io) {
    this.io = io;
    this.players = new Map();
    this.territories = this.initializeTerritories();
    this.gameLoop();
  }

  initializeTerritories() {
    const territories = [];
    const regions = [
      'North America', 'South America', 'Europe', 'Africa', 'Middle East',
      'India', 'East Asia', 'Southeast Asia', 'Oceania'
    ];

    for (let i = 0; i < regions.length; i++) {
      territories.push({
        id: i,
        name: regions[i],
        owner: null,
        troops: 0,
        defenseLevel: 1,
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }
    return territories;
  }

  addPlayer(playerId, playerData) {
    this.players.set(playerId, {
      id: playerId,
      name: playerData.name || `Player_${playerId.slice(0, 5)}`,
      gold: 1000,
      population: 5000,
      armySize: 100,
      economy: 1,
      military: 1,
      production: 1,
      color: playerData.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      territories: [],
      allies: [],
      createdAt: Date.now()
    });

    // Start with one territory
    const startTerritory = this.territories[Math.floor(Math.random() * this.territories.length)];
    if (!startTerritory.owner) {
      startTerritory.owner = playerId;
      startTerritory.troops = 100;
      this.players.get(playerId).territories.push(startTerritory.id);
    }
  }

  getPlayer(playerId) {
    return this.players.get(playerId);
  }

  removePlayer(playerId) {
    const player = this.players.get(playerId);
    if (player) {
      // Give territories back to neutral
      player.territories.forEach(tId => {
        const territory = this.territories[tId];
        territory.owner = null;
        territory.troops = 0;
      });
    }
    this.players.delete(playerId);
  }

  conquerTerritory(attackerId, territoryId) {
    const attacker = this.players.get(attackerId);
    const territory = this.territories[territoryId];

    if (!attacker || !territory) return false;
    if (territory.owner === attackerId) return false;

    const attackPower = attacker.armySize * attacker.military;
    const defensePower = territory.troops * territory.defenseLevel;

    if (attackPower > defensePower) {
      const oldOwner = territory.owner;
      territory.owner = attackerId;
      territory.troops = Math.max(10, attacker.armySize - defensePower / 2);
      
      if (!attacker.territories.includes(territoryId)) {
        attacker.territories.push(territoryId);
      }

      if (oldOwner) {
        const oldPlayer = this.players.get(oldOwner);
        oldPlayer.territories = oldPlayer.territories.filter(id => id !== territoryId);
      }

      attacker.armySize = Math.max(0, attacker.armySize - defensePower / 2);
      return true;
    }
    return false;
  }

  upgradeArmy(playerId, amount = 50) {
    const player = this.players.get(playerId);
    if (!player) return false;

    const cost = amount * 10 * player.military;
    if (player.gold >= cost) {
      player.gold -= cost;
      player.armySize += amount;
      return true;
    }
    return false;
  }

  upgradeEconomy(playerId) {
    const player = this.players.get(playerId);
    if (!player) return false;

    const cost = 500 * player.economy;
    if (player.gold >= cost) {
      player.gold -= cost;
      player.economy += 0.5;
      return true;
    }
    return false;
  }

  upgradePopulation(playerId) {
    const player = this.players.get(playerId);
    if (!player) return false;

    const cost = 300 * player.production;
    if (player.gold >= cost) {
      player.gold -= cost;
      player.population += 1000;
      player.production += 0.3;
      return true;
    }
    return false;
  }

  formAlliance(playerId1, playerId2) {
    const player1 = this.players.get(playerId1);
    const player2 = this.players.get(playerId2);

    if (player1 && player2) {
      if (!player1.allies.includes(playerId2)) {
        player1.allies.push(playerId2);
      }
      if (!player2.allies.includes(playerId1)) {
        player2.allies.push(playerId1);
      }
      return true;
    }
    return false;
  }

  getWorldState() {
    return {
      territories: this.territories,
      players: Array.from(this.players.values()),
      timestamp: Date.now()
    };
  }

  gameLoop() {
    setInterval(() => {
      // Generate resources for each player
      for (const [, player] of this.players) {
        const territoryCount = player.territories.length;
        player.gold += territoryCount * player.economy * 5;
        player.population += territoryCount * player.production * 10;
        
        // Slowly regenerate troops
        player.territories.forEach(tId => {
          const territory = this.territories[tId];
          territory.troops = Math.min(territory.troops + player.military, player.armySize);
        });
      }

      this.io.emit('world-update', this.getWorldState());
    }, 2000); // Update every 2 seconds
  }
}
