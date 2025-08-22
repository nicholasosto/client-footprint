import React, { useRef, useMemo, useState } from 'react';
import { FootprintTemplate, EngagementData } from '../../types/domain';
import { HexCell } from './HexCell';
import './HoneycombVisualization.css';
import { HexMath } from '../../utils/hexMath';

interface HoneycombVisualizationProps {
  footprintTemplate: FootprintTemplate;
  engagementData: EngagementData[];
  onCellClick?: (cellId: string) => void;
  onCellHover?: (cellId: string | null) => void;
  width?: number;
  height?: number;
}

export const HoneycombVisualization: React.FC<HoneycombVisualizationProps> = ({
  footprintTemplate,
  engagementData,
  onCellClick,
  onCellHover,
  width = 800,
  height = 600
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Index engagement data for O(1) lookups
  const engagementMap = useMemo(() => {
    const m = new Map<string, EngagementData>();
    for (const e of engagementData) m.set(e.cellId, e);
    return m;
  }, [engagementData]);

  // Merge template data with dynamic engagement data
  const enrichedCells = useMemo(() => {
    return footprintTemplate.generatedCells.map(cell => {
      const dynamicData = engagementMap.get(cell.id);
      return {
        ...cell,
        state: dynamicData?.state || cell.state,
        visualProperties: dynamicData?.visualProperties || cell.visualProperties
      };
    });
  }, [footprintTemplate, engagementMap]);

  // Calculate viewBox based on cell positions
  const viewBox = useMemo(() => {
    if (enrichedCells.length === 0) {
      return `0 0 ${width} ${height}`;
    }

    // Calculate bounds of all hexagons
    const positions = enrichedCells.map(cell => {
      const x = HexMath.HEX_SPACING * (3/2 * cell.position.q);
      const y = HexMath.HEX_SPACING * (Math.sqrt(3)/2 * cell.position.q + Math.sqrt(3) * cell.position.r);
      return { x, y };
    });

    const minX = Math.min(...positions.map(p => p.x)) - 50;
    const maxX = Math.max(...positions.map(p => p.x)) + 50;
    const minY = Math.min(...positions.map(p => p.y)) - 50;
    const maxY = Math.max(...positions.map(p => p.y)) + 50;

    const viewWidth = maxX - minX;
    const viewHeight = maxY - minY;

    return `${minX} ${minY} ${viewWidth} ${viewHeight}`;
  }, [enrichedCells, width, height]);

  const handleCellClick = (cellId: string) => {
    onCellClick?.(cellId);
  };

  const handleCellHover = (cellId: string | null) => {
    setHoveredCell(cellId);
    onCellHover?.(cellId);
  };

  return (
    <div className="honeycomb-visualization-container">
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="honeycomb-visualization"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="hexShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
          <filter id="hexHover" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="3" stdDeviation="5" floodOpacity="0.4" />
          </filter>
        </defs>
        
        {enrichedCells.map(cell => (
          <HexCell
            key={cell.id}
            cell={cell}
            isHovered={hoveredCell === cell.id}
            onClick={() => handleCellClick(cell.id)}
            onMouseEnter={() => handleCellHover(cell.id)}
            onMouseLeave={() => handleCellHover(null)}
          />
        ))}
      </svg>
      
      {hoveredCell && (
        <div className="cell-tooltip">
          {enrichedCells.find(c => c.id === hoveredCell)?.displayName}
        </div>
      )}
    </div>
  );
};
