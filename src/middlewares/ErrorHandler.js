export const errorHandler = (err, req, res, next) => {
  const status  = err.status || err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.path} -> ${status}: ${message}`
  );

  res.status(status).json({
    error: { status, message },
  });
};