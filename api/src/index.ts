import { PORT, CORS_ORIGIN, JWT_SECRET } from './config';
import { WebSocketServer } from 'ws';
import { verify } from 'jsonwebtoken';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users';

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

wss.on('connection', (socket, req) => {
  
  const cookies = req.headers.cookie;

  if (cookies) {
    const tokenCookieString = cookies.split(';').find((cookie: string) => cookie.includes('token'));
    if (tokenCookieString) {
      const token = tokenCookieString.split('=')[1];
      if (token) {
        verify(token, JWT_SECRET, {}, async (err: any, decoded: any) => {
          if (err) throw err;
          console.log(decoded);
        });
      }
    }
  }

})
