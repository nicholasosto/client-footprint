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
  const x = size * (3 / 2 * q);
  const y = size * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
  return { x, y };
};

const HexCluster: React.FC<HexClusterProps> = ({ id, cx, cy, size, innerCellSize, title }) => {
  return (
    <g>
      {/* Render the large container hexagon */}
      <Hexagon id={`${id}-cluster`} cx={cx} cy={cy} size={size} title={title} />

      {/* Render the inner cells */}
      {INNER_CELL_SLOT_OFFSETS.map((offset, index) => {
        const { x, y } = axialToPixel(offset.q, offset.r, innerCellSize * 1.15);
        const cellId = `${id}-c${index + 1}`;
        
        return (
          <Hexagon
            key={cellId}
            id={cellId}
            cx={cx + x}
            cy={cy + y}
            size={innerCellSize}
            title={`C${index + 1}`} // Example title
          />
        );
      })}
    </g>
  );
};

export default HexCluster;
