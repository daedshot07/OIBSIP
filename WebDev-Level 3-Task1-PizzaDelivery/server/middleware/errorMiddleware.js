function notFound(req, res) { res.status(404).json({ success: false, message: 'Route not found' }); }
function errorHandler(err, req, res, next) { console.error(err); if (res.headersSent) return next(err); const status = err.statusCode || (err.name === 'ValidationError' ? 400 : err.code === 11000 ? 409 : 500); const message = status === 500 ? 'Internal server error' : err.message; res.status(status).json({ success: false, message }); }
module.exports = { notFound, errorHandler };
