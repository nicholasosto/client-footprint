import React from 'react';
import { Cell, EngagementState } from '../../types/domain';
import { HexMath } from '../../utils/hexMath';
import { VISUAL_CONSTANTS, getCellStateColor } from '../../utils/constants';

interface HexCellProps {
  cell: Cell;
  isHovered?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const HexCellComponent: React.FC<HexCellProps> = ({
  cell,
  isHovered = false,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  const pixelPosition = HexMath.axialToPixel(cell.position);
  const hexPath = HexMath.generateHexPath(pixelPosition, HexMath.HEX_SIZE);

  const getStateColor = (state: EngagementState): string => {
    switch (state) {
      case EngagementState.NOT_ENGAGED: 
        return VISUAL_CONSTANTS.COLORS.NOT_ENGAGED;
      case EngagementState.CURRENTLY_ENGAGED: 
        return VISUAL_CONSTANTS.COLORS.CURRENTLY_ENGAGED;
      case EngagementState.ACTIVELY_PURSUING: 
        return VISUAL_CONSTANTS.COLORS.ACTIVELY_PURSUING;
      default: 
        return VISUAL_CONSTANTS.COLORS.NOT_ENGAGED;
    }
  };

  const getBorderColor = (): string => {
    return isHovered 
      ? VISUAL_CONSTANTS.COLORS.HOVER_BORDER 
      : cell.visualProperties.borderColor;
  };

  const getBorderWidth = (): number => {
    return isHovered 
      ? VISUAL_CONSTANTS.HOVER_BORDER_THICKNESS 
      : cell.visualProperties.borderThickness;
  };

  const getOpacity = (): number => {
    return isHovered 
      ? VISUAL_CONSTANTS.HOVER_OPACITY 
      : cell.visualProperties.opacity;
  };

  if (!cell.isActive) return null;

  return (
    <g
      className="hex-cell"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
      filter={isHovered ? 'url(#hexHover)' : 'url(#hexShadow)'}
    >
      <path
        d={hexPath}
        fill={
          // Priority: explicit visualProperties.backgroundColor -> cell.cellState catalog color -> engagement state color
          cell.visualProperties.backgroundColor || getCellStateColor(cell.cellState) || getStateColor(cell.state)
        }
        stroke={getBorderColor()}
        strokeWidth={getBorderWidth()}
        opacity={getOpacity()}
        className="hex-path"
      />
      <text
        x={pixelPosition.x}
        y={pixelPosition.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={VISUAL_CONSTANTS.CELL_TEXT_FONT_SIZE}
        fill={VISUAL_CONSTANTS.COLORS.TEXT}
        className="hex-text"
        pointerEvents="none"
      >
        {cell.displayName}
      </text>
    </g>
  );
};

export const HexCell = React.memo(HexCellComponent);
export default HexCell;
