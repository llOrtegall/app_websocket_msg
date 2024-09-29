import { PORT, CORS_ORIGIN } from './config';
import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users';

const app = express();

app.use(express.json());
app.use(cors({ 
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});