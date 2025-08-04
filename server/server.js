import express from 'express';
import path from 'path';
import userRouter from './routes/users.js';
import { connectDB } from './config/db.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
const PORT = 3000;

/* Automatically parse urlencoded body content and form
data from incoming requests and place it in req.body */
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (_req, res) => {
  res.sendFile(
    path.resolve(path.resolve(__dirname, '../index.html'))
  );
});

app.use('/api/user', userRouter);

/* 404 handler - TO-DO: Create custom 404 page */
app.use('*catchall', (_req, res) => {
  res.status(404).send('Not Found');
});

/* Global error handler */
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`express server listening on port ${PORT}`);
});
