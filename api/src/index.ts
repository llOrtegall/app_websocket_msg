import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const ORIGIN = process.env.CORS_ORIGIN!;

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: ORIGIN }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});