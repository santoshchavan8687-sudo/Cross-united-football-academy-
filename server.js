// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.DEFAULT_APP_PORT ? Number(process.env.DEFAULT_APP_PORT) : Number(process.env.PORT) || 3e3;
app.use(express.json());
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "healthy",
    app: "Cross United Football Academy",
    version: "1.0.0"
  });
});
var distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa"
  });
  app.use(vite.middlewares);
}
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Cross United Football Academy server listening on port ${PORT}`);
});
