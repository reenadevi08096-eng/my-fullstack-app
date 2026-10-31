const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./config/logger');
const setupSecurity = require('./middlewares/security');
const apiLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

const aiRoutes = require('./routes/aiRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

setupSecurity(app);

app.use(cors());
app.use(express.json());

const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(
  morgan(morganFormat, {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use('/api', apiLimiter);

app.use('/api/ai', aiRoutes);
app.use('/api/data', dataRoutes);

app.use(errorHandler);

module.exports = app;
