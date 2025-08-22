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
}

const axialToPixel = (q: number, r: number, size: number) => {
  // Standard axial to pixel conversion for pointy-top hexes
  const x = (3 / 2) * size * q;
  const y = (Math.sqrt(3) * size * (r + q / 2));
  return { x, y };
};

const HexCluster: React.FC<HexClusterProps> = ({ id, cx, cy, size, innerCellSize, title }) => {
  return (
    <g>
      {/* Render the large container hexagon */}
      <Hexagon id={`${id}-cluster`} cx={cx} cy={cy} size={size} title={title} />

      {/* Render the inner cells */}
      {INNER_CELL_SLOT_OFFSETS.map((offset, index) => {
        // small downward shift to avoid colliding with cluster title
        const titleClearance = Math.max(6, Math.round(innerCellSize * 0.25));
        const { x, y } = axialToPixel(offset.q, offset.r, innerCellSize);
        const cellId = `${id}-c${index + 1}`;
        
        return (
          <Hexagon
            key={cellId}
            id={cellId}
            cx={cx + x}
            cy={cy + y + titleClearance}
            size={innerCellSize}
            title={`C${index + 1}`} // Example title
          />
        );
      })}
    </g>
  );
};

export default HexCluster;
