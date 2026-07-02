import 'dotenv/config';
import app  from './app.js';
import pool from './db/pool.js';

const PORT = process.env.APP_PORT || 3000;

pool.getConnection()
  .then(conn => {
    conn.release();
    console.log('Conexion a MySQL establecida');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a MySQL:', err.message);
    process.exit(1);
  });