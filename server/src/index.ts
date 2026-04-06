import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import noteRoutes from './routes/note.routes';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
