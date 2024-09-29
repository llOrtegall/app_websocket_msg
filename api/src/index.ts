import { PORT, CORS_ORIGIN, JWT_SECRET } from './config';
import WebSocket, { WebSocketServer } from 'ws';
import { verify } from 'jsonwebtoken';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users';
import { ExtendedWebSocket } from './types/types';

const app = express();

app.use(express.json());
app.use(cors({ 
  origin: CORS_ORIGIN,
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', userRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (socket: ExtendedWebSocket, req) => {
  
  const cookies = req.headers.cookie;

  if (cookies) {
    const token = cookies.includes('chat_app_token') ? cookies.split('=')[1] : null;
    if (token) {
      verify(token, JWT_SECRET, {}, async (err: any, decoded: any) => {
        if (err) throw err;
        const { id, email, names, lastnames } = decoded;
        socket.id = id;
        socket.email = email;
        socket.names = names;
        socket.lastnames = lastnames;
      });
    }
  }


  [...wss.clients].forEach((client: ExtendedWebSocket) => {
    client.send(JSON.stringify({
      online: [...wss.clients].map((client: ExtendedWebSocket) => ({ id: client.id, email: client.email, names: client.names, lastnames: client.lastnames }))
    }));
  });
  

})
