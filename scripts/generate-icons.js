import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 1);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crcTarget = buf.subarray(4, 8 + len);
  buf.writeUInt32BE(crc32(crcTarget), 8 + len);
  return buf;
}

function generatePng(width, height, isMaskable = false) {
  // RGBA buffer: each row has 1 filter byte (0) + width * 4 bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  // Colors:
  // Brand gradient start: #e91e8c (233, 30, 140)
  // Brand gradient mid:   #ec407a (236, 64, 122)
  // Brand gradient end:   #00bcd4 (0, 188, 212)

  const radius = isMaskable ? 0 : width * 0.22; // rounded corner if not maskable
  const cx = width / 2;
  const cy = height / 2;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Check rounded corner bounds
      let inBounds = true;
      if (!isMaskable) {
        const dx = Math.min(x, width - 1 - x);
        const dy = Math.min(y, height - 1 - y);
        if (dx < radius && dy < radius) {
          const cornerDist = Math.hypot(radius - dx, radius - dy);
          if (cornerDist > radius) {
            inBounds = false;
          }
        }
      }

      if (!inBounds) {
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // 135-deg linear gradient
      const t = (x + y) / (width + height);
      let r, g, b;
      if (t < 0.5) {
        const factor = t * 2;
        r = Math.round(233 + (236 - 233) * factor);
        g = Math.round(30 + (64 - 30) * factor);
        b = Math.round(140 + (122 - 140) * factor);
      } else {
        const factor = (t - 0.5) * 2;
        r = Math.round(236 + (0 - 236) * factor);
        g = Math.round(64 + (188 - 64) * factor);
        b = Math.round(122 + (212 - 122) * factor);
      }

      // Drawing Stroller art in normalized coordinates [0..1]
      const nx = x / width;
      const ny = y / height;

      // Safe zone for maskable icon: stay within circle r=0.4
      const scale = isMaskable ? 0.75 : 0.88;
      // Centered coordinate
      const sx = (nx - 0.5) / scale + 0.5;
      const sy = (ny - 0.5) / scale + 0.5;

      let isWhite = false;
      let isAccentPink = false;
      let isAccentTeal = false;

      // Canopy: semi-circle centered at (0.52, 0.49), radius 0.20, y <= 0.49
      const canopyDist = Math.hypot(sx - 0.52, sy - 0.49);
      if (canopyDist <= 0.20 && sy <= 0.49 && sx >= 0.32 && sx <= 0.72) {
        isWhite = true;
      }

      // Bassinet body: ellipse lower half
      const bx = (sx - 0.52) / 0.22;
      const by = (sy - 0.49) / 0.16;
      if (bx * bx + by * by <= 1.0 && sy >= 0.48 && sy <= 0.65 && sx >= 0.30 && sx <= 0.74) {
        isWhite = true;
      }

      // Handle: line from (0.28, 0.43) to (0.21, 0.32)
      const hDist = distToSegment(sx, sy, 0.24, 0.30, 0.34, 0.45);
      if (hDist < 0.02) {
        isWhite = true;
      }
      // Handle grip: circle at (0.24, 0.30)
      if (Math.hypot(sx - 0.24, sy - 0.30) < 0.03) {
        isWhite = true;
      }

      // Chassis legs: (0.39, 0.58) -> (0.35, 0.77) and (0.64, 0.58) -> (0.68, 0.77)
      if (distToSegment(sx, sy, 0.39, 0.58, 0.35, 0.77) < 0.016 ||
          distToSegment(sx, sy, 0.64, 0.58, 0.68, 0.77) < 0.016 ||
          distToSegment(sx, sy, 0.35, 0.77, 0.68, 0.77) < 0.014) {
        isWhite = true;
      }

      // Left wheel at (0.35, 0.78), r=0.065
      const lwDist = Math.hypot(sx - 0.35, sy - 0.78);
      if (lwDist <= 0.065) {
        if (lwDist <= 0.015) isWhite = true;
        else if (lwDist <= 0.038) isAccentPink = true;
        else isWhite = true;
      }

      // Right wheel at (0.68, 0.78), r=0.065
      const rwDist = Math.hypot(sx - 0.68, sy - 0.78);
      if (rwDist <= 0.065) {
        if (rwDist <= 0.015) isWhite = true;
        else if (rwDist <= 0.038) isAccentTeal = true;
        else isWhite = true;
      }

      // Little sparkle star at top right (0.75, 0.26)
      const stDist = Math.hypot(sx - 0.75, sy - 0.26);
      if (stDist <= 0.04) {
        const starX = Math.abs(sx - 0.75);
        const starY = Math.abs(sy - 0.26);
        if (starX * starY < 0.0003) {
          isWhite = true;
        }
      }

      if (isWhite) {
        rawData[pxOffset] = 255;
        rawData[pxOffset + 1] = 255;
        rawData[pxOffset + 2] = 255;
        rawData[pxOffset + 3] = 255;
      } else if (isAccentPink) {
        rawData[pxOffset] = 233;
        rawData[pxOffset + 1] = 30;
        rawData[pxOffset + 2] = 140;
        rawData[pxOffset + 3] = 255;
      } else if (isAccentTeal) {
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 188;
        rawData[pxOffset + 2] = 212;
        rawData[pxOffset + 3] = 255;
      } else {
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  // Compress IDAT
  const compressed = zlib.deflateSync(rawData, { level: 9 });

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bit per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // Deflate
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // No interlace

  const chunks = [
    signature,
    createChunk('IHDR', ihdr),
    createChunk('IDAT', compressed),
    createChunk('IEND', Buffer.alloc(0))
  ];

  return Buffer.concat(chunks);
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
  if (l2 === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
}

// Generate all target icons
const publicDir = path.resolve('public');
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), generatePng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), generatePng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'icon-maskable-512.png'), generatePng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePng(180, 180, false));

console.log('✅ PWA Icons generated successfully in /public!');
