import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// In AI Studio dev container, DEFAULT_APP_PORT is 3000 while Nginx listens on 8080.
// In Cloud Run deployment, DEFAULT_APP_PORT is not set and PORT is provided by Cloud Run.
const PORT = process.env.DEFAULT_APP_PORT
  ? Number(process.env.DEFAULT_APP_PORT)
  : (Number(process.env.PORT) || 3000);

app.use(express.json());

// Health check endpoint for Cloud Run and control plane
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API health endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    app: 'Cross United Football Academy',
    version: '1.0.0',
  });
});

const distPath = path.join(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  // Production mode: serve built client assets
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Development mode: attach Vite middleware
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cross United Football Academy server listening on port ${PORT}`);
});
