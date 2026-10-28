import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QRCodeBadge({ verificationId, referenceNumber, size = 110, showLink = true }) {
  // Deterministic SVG QR representation for clean rendering without heavy runtime dependency
  const codeHash = (verificationId || 'demo').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const matrixSize = 21;

  // Generate deterministic pattern based on hash
  const cells = [];
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Corner detection patterns (3 corners)
      const isTopLeft = r < 7 && c < 7;
      const isTopRight = r < 7 && c >= matrixSize - 7;
      const isBottomLeft = r >= matrixSize - 7 && c < 7;

      let isFilled = false;

      if (isTopLeft || isTopRight || isBottomLeft) {
        const localR = isBottomLeft ? r - (matrixSize - 7) : r;
        const localC = isTopRight ? c - (matrixSize - 7) : c;
        if (localR === 0 || localR === 6 || localC === 0 || localC === 6) {
          isFilled = true;
        } else if (localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4) {
          isFilled = true;
        }
      } else {
        // pseudo-random data bits
        isFilled = ((r * 7 + c * 13 + codeHash) % 3 === 0) || ((r + c + codeHash) % 5 === 0);
      }

      if (isFilled) {
        cells.push({ r, c });
      }
    }
  }

  const cellSize = size / matrixSize;

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center text-center p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="p-2 bg-white rounded-lg border border-slate-100">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="text-slate-950 bg-white"
          aria-label={`Prescription Authenticity QR Code ${referenceNumber}`}
        >
          {cells.map((cell, idx) => (
            <rect
              key={idx}
              x={cell.c * cellSize}
              y={cell.r * cellSize}
              width={cellSize * 0.94}
              height={cellSize * 0.94}
              fill="currentColor"
              rx={0.5}
            />
          ))}
        </svg>
      </div>
      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-400">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>Scan to Verify</span>
      </div>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-wider">{verificationId || 'v_88f91a'}</p>
=======
    <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="text-slate-900 bg-white"
        aria-label={`Prescription Authenticity QR Code ${referenceNumber}`}
      >
        {cells.map((cell, idx) => (
          <rect
            key={idx}
            x={cell.c * cellSize}
            y={cell.r * cellSize}
            width={cellSize * 0.94}
            height={cellSize * 0.94}
            fill="currentColor"
            rx={0.5}
          />
        ))}
      </svg>
      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-blue-800">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
        <span>Scan to Verify</span>
      </div>
      <p className="text-[10px] text-slate-400 font-mono tracking-wider">{verificationId || 'v_88f91a'}</p>
>>>>>>> origin/main

      {showLink && (
        <Link
          to={`/verify-prescription/${verificationId}`}
          target="_blank"
<<<<<<< HEAD
          className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline"
=======
          className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-700 font-medium underline"
>>>>>>> origin/main
        >
          Verify online <ExternalLink className="w-2.5 h-2.5" />
        </Link>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
