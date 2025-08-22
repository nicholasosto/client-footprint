import React from 'react';
import Hexagon from './Hexagon';
import { INNER_CELL_SLOT_OFFSETS } from '../../utils/cellLayout';

interface HexClusterProps {
  id: string;
  cx: number;
  cy: number;
  size: number;
  innerCellSize: number;
  title?: string;
  innerCellSpacing?: number; // multiplier (1 = tight fit, >1 = more space)
  innerGroupOffset?: { x?: number; y?: number };
}

const axialToPixel = (q: number, r: number, size: number) => {
  // Standard axial to pixel conversion for pointy-top hexes
  const x = (3 / 2) * size * q;
  const y = (Math.sqrt(3) * size * (r + q / 2));
  return { x, y };
};

// normalize slot coordinates: round to nearest integer and compute s
const normalizeSlot = (slot: { q: number; r: number; s?: number }) => {
  const q = Math.round(slot.q);
  const r = Math.round(slot.r);
  const s = -q - r;
  if (slot.s !== undefined && slot.s !== s) {
    // warn in dev only
    // eslint-disable-next-line no-console
    console.warn(`cellLayout: normalized slot q=${slot.q}->${q} r=${slot.r}->${r} (provided s=${slot.s}, computed s=${s})`);
  }
  return { q, r, s };
};

const HexCluster: React.FC<HexClusterProps> = ({ id, cx, cy, size, innerCellSize, title, innerCellSpacing = 1, innerGroupOffset }) => {
  return (
    <g>
      {/* Render the large container hexagon */}
      <Hexagon id={`${id}-cluster`} cx={cx} cy={cy} size={size} title={title} />

      {/* Render the inner cells */}
      {INNER_CELL_SLOT_OFFSETS.map((offset, index) => {
  // normalize/validate the source slot (keeps layout ordered even if data has floats)
  const slot = normalizeSlot(offset as any);
        // small downward shift to avoid colliding with cluster title
        const titleClearance = Math.max(6, Math.round(innerCellSize * 0.35));
        // use spacing multiplier so inner-cell positions scale independently of cell radius
        const spacingSize = innerCellSize * innerCellSpacing;
        const { x, y } = axialToPixel(slot.q, slot.r, spacingSize);
    const cellId = `${id}-c${index + 1}`;
    // apply optional inner-group offset (shifts the whole inner-cell pattern)
    const gx = innerGroupOffset?.x ?? 0;
    const gy = innerGroupOffset?.y ?? 0;

    return (
          <Hexagon
            key={cellId}
            id={cellId}
      cx={cx + x + gx}
      cy={cy + y + titleClearance + gy}
            size={innerCellSize}
            title={`C${index + 1}`} // Example title
          />
        );
      })}
    </g>
  );
};

export default HexCluster;
