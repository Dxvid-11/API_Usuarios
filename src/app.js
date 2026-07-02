import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: { status: 404, message: 'Ruta no encontrada' } });
});

// Manejador de errores (siempre al final)
app.use(errorHandler);

export default app;