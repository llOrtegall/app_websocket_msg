import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const ORIGIN = process.env.CORS_ORIGIN!;

const app = express();

app.use(express.json());
app.use(cors({ 
  origin: ORIGIN,
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