import React, { useRef, useMemo, useState } from 'react';
import { FootprintTemplate, EngagementData } from '../../types/domain';
import { HexCell } from './HexCell';
import './HoneycombVisualization.css';
import { HexMath } from '../../utils/hexMath';
import { VISUAL_CONSTANTS } from '../../utils/constants';

interface HoneycombVisualizationProps {
  footprintTemplate: FootprintTemplate;
  engagementData: EngagementData[];
  onCellClick?: (cellId: string) => void;
  onCellHover?: (cellId: string | null) => void;
}

export const HoneycombVisualization: React.FC<HoneycombVisualizationProps> = ({
  footprintTemplate,
  engagementData,
  onCellClick,
  onCellHover
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

  // Calculate viewBox based on cell positions and cluster outer hexes
  const viewBox = useMemo(() => {
    if (enrichedCells.length === 0) {
      return `0 0 1000 800`; // Default fallback
    }

    // Calculate bounds for inner cells
    const cellPositions = enrichedCells.map(cell => {
      const x = HexMath.HEX_SPACING * (3/2 * cell.position.q);
      const y = HexMath.HEX_SPACING * (Math.sqrt(3)/2 * cell.position.q + Math.sqrt(3) * cell.position.r);
      return { x, y };
    });

    // Include outer cluster hexes in bounds
    const clusterBigSize = HexMath.HEX_SIZE * HexMath.CLUSTER_SCALE;
    const clusterCenters = footprintTemplate.masterTemplate.honeycombClusters.map(c =>
      HexMath.axialToPixel(c.centerPosition)
    );

    const xs = [
      ...cellPositions.map(p => p.x),
      ...clusterCenters.map(c => c.x - clusterBigSize),
      ...clusterCenters.map(c => c.x + clusterBigSize)
    ];
    const ys = [
      ...cellPositions.map(p => p.y),
      ...clusterCenters.map(c => c.y - clusterBigSize),
      ...clusterCenters.map(c => c.y + clusterBigSize)
    ];

    const pad = Math.max(40, HexMath.HEX_SIZE * 1.5);
    const minX = Math.min(...xs) - pad;
    const maxX = Math.max(...xs) + pad;
    const minY = Math.min(...ys) - pad;
    const maxY = Math.max(...ys) + pad;

    const viewWidth = maxX - minX;
    const viewHeight = maxY - minY;

    return `${minX} ${minY} ${viewWidth} ${viewHeight}`;
  }, [enrichedCells, footprintTemplate]);

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
        style={{ width: '100%', height: '100%' }}
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
        
        {/* Render outer cluster hexes with labels */}
        {footprintTemplate.masterTemplate.honeycombClusters.map(cluster => {
          const center = HexMath.axialToPixel(cluster.centerPosition);
          const bigSize = HexMath.HEX_SIZE * HexMath.CLUSTER_SCALE; // Use scale factor
          const d = HexMath.generateHexPath(center, bigSize);
          return (
            <g key={`cluster-${cluster.id}`}>
              <path d={d} fill="#f8f9fa" stroke="#adb5bd" strokeWidth={3} opacity={0.7} />
              {cluster.label && (
                <text
                  x={center.x}
                  y={center.y - bigSize + 30} // Position label at top of cluster
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={VISUAL_CONSTANTS.CLUSTER_LABEL_FONT_SIZE}
                  fontWeight="bold"
                  fill="#495057"
                >
                  {cluster.label}
                </text>
              )}
            </g>
          );
        })}
        
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
