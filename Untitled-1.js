// Simple Express server for contact form
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const morgan = require('morgan');

const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(xss());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const allowedOrigin = process.env.FRONTEND_URL || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['POST', 'OPTIONS'],
}));

const windowMin = Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 1;
const maxReq = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5;
const limiter = rateLimit({
  windowMs: windowMin * 60 * 1000,
  max: maxReq,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try later.' },
});
app.use('/api/contact', limiter);

app.use('/api/contact', contactRouter);

// Basic health route
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, error: err.message || 'Server error' });
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  // Optionally test mailer config at startup
  const mailer = require('./mailer');
  try {
    await mailer.verify();
    console.log('Mailer verified.');
  } catch (e) {
    console.warn('Mailer verification failed (check SMTP env):', e.message);
  }
});