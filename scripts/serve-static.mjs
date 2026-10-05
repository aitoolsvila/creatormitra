import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve(".next-export");
const basePath = "/creatormitra";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://127.0.0.1").pathname,
    );
    if (pathname === basePath) {
      res.writeHead(308, { Location: basePath + "/" });
      res.end();
      return;
    }
    if (!pathname.startsWith(basePath + "/")) {
      res.writeHead(404);
      res.end();
      return;
    }
    const relative = pathname.slice(basePath.length + 1);
    let file = resolve(root, relative);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    try {
      const info = await stat(file);
      if (info.isDirectory()) {
        if (!pathname.endsWith("/")) {
          res.writeHead(308, {
            Location:
              pathname + "/" + new URL(req.url, "http://127.0.0.1").search,
          });
          res.end();
          return;
        }
        file = resolve(file, "index.html");
      }
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type":
          types[extname(file)] ||
          (relative === "opengraph-image"
            ? "image/png"
            : "application/octet-stream"),
      });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(await readFile(resolve(root, "404.html")));
    }
  } catch {
    res.writeHead(400);
    res.end("Invalid request");
  }
}).listen(3002, "127.0.0.1", () =>
  console.log(
    "Static GitHub Pages build ready for local validation on port 3002.",
  ),
);
