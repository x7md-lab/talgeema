import express from 'express';
import { createServer } from 'http';
// cors middleware
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/data', (req, res) => {
  res.status(200).json({
     message: 'Hello from the API!'
  }); 
});

 // start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
