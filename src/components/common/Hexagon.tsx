import React from 'react';

interface HexagonProps {
  id: string;
  cx: number;
  cy: number;
  size: number;
  title?: string;
}

const Hexagon: React.FC<HexagonProps> = ({ cx, cy, size, title }) => {
  const points = [
    [cx + size, cy],
    [cx + size / 2, cy + size * Math.sqrt(3) / 2],
    [cx - size / 2, cy + size * Math.sqrt(3) / 2],
    [cx - size, cy],
    [cx - size / 2, cy - size * Math.sqrt(3) / 2],
    [cx + size / 2, cy - size * Math.sqrt(3) / 2],
  ].map(p => p.join(',')).join(' ');

  const hexHeight = Math.sqrt(3) * size;

  return (
    <g>
      <polygon points={points} fill="white" stroke="black" strokeWidth="2" />
      {title && (
        <text
          x={cx}
          y={cy - hexHeight / 3}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize={size / 6}
          style={{ pointerEvents: 'none' }}
        >
          {title}
        </text>
      )}
    </g>
  );
};

export default Hexagon;
