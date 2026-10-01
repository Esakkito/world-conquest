import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { GameManager } from './gameManager.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

const gameManager = new GameManager(io);

// REST API Routes
app.get('/api/world', (req, res) => {
  res.json(gameManager.getWorldState());
});

app.get('/api/player/:playerId', (req, res) => {
  const player = gameManager.getPlayer(req.params.playerId);
  res.json(player);
});

// WebSocket Events
io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  socket.on('join-game', (playerData) => {
    gameManager.addPlayer(socket.id, playerData);
    io.emit('player-joined', { playerId: socket.id, ...playerData });
  });

  socket.on('conquer-territory', (data) => {
    const success = gameManager.conquerTerritory(socket.id, data.territoryId);
    io.emit('territory-update', { territoryId: data.territoryId, owner: socket.id, success });
  });

  socket.on('upgrade-army', (data) => {
    gameManager.upgradeArmy(socket.id, data.amount);
    io.emit('player-updated', gameManager.getPlayer(socket.id));
  });

  socket.on('upgrade-economy', (data) => {
    gameManager.upgradeEconomy(socket.id);
    io.emit('player-updated', gameManager.getPlayer(socket.id));
  });

  socket.on('upgrade-population', (data) => {
    gameManager.upgradePopulation(socket.id);
    io.emit('player-updated', gameManager.getPlayer(socket.id));
  });

  socket.on('form-alliance', (data) => {
    gameManager.formAlliance(socket.id, data.allyId);
    io.emit('alliance-formed', { playerId: socket.id, allyId: data.allyId });
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    gameManager.removePlayer(socket.id);
    io.emit('player-left', { playerId: socket.id });
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🌍 World Conquest Server running on port ${PORT}`);
});
