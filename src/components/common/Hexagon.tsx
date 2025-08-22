import React from 'react';
import { HC_STATE_KEY, HoneycombStateMeta } from '../../types/catalog';
import { getHoneycombStateMeta } from '../../services/honeycombCatalog';

interface HexagonProps {
  id: string;
  cx: number;
  cy: number;
  size: number;
  title?: string;
  stateKey?: HC_STATE_KEY;
  styleOverrides?: Partial<HoneycombStateMeta>;
  titleFontSize?: number;
}

const Hexagon: React.FC<HexagonProps> = ({ cx, cy, size, title, stateKey, styleOverrides, titleFontSize }) => {
  // Resolve visual style from catalog when provided
  const stateMeta = stateKey ? getHoneycombStateMeta(stateKey) : undefined;
  const backgroundColor = styleOverrides?.backgroundColor ?? stateMeta?.backgroundColor ?? 'white';
  const textColor = styleOverrides?.textColor ?? stateMeta?.textColor ?? 'black';
  const borderColor = styleOverrides?.borderColor ?? stateMeta?.borderColor ?? 'black';
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
      <polygon points={points} fill={backgroundColor} stroke={borderColor} strokeWidth="2" />
          {title && (
            <text
              x={cx}
              y={cy - hexHeight / 3}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={textColor}
              fontSize={titleFontSize ?? size / 6}
              style={{ pointerEvents: 'none' }}
            >
              {title}
            </text>
          )}
    </g>
  );
};

export default Hexagon;
