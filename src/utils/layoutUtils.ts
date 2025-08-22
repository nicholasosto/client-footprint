interface HexagonConfig {
  hexSize: number;
  gap: number;
  rowGap: number;
  canvasWidth: number;
  layout: number[];
}

interface HexagonPosition {
  id: string;
  cx: number;
  cy: number;
}

export const generateHexagonLayout = (config: HexagonConfig): HexagonPosition[] => {
  const { hexSize, gap, rowGap, canvasWidth, layout } = config;
  const hexWidth = 2 * hexSize;
  const hexHeight = Math.sqrt(3) * hexSize;
  const positions: HexagonPosition[] = [];
  // Compute the widest row width so we can center all rows relative to it
  const rowWidths = layout.map((hexCount) => (hexCount * hexWidth) + (Math.max(0, hexCount - 1) * gap));
  const widestRowWidth = Math.max(...rowWidths);

  const topPadding = Math.max(80, Math.round(hexHeight / 3)); // increase top padding to avoid header overlap
  let lastY = hexHeight / 2 + topPadding;

  layout.forEach((hexCount, rowIndex) => {
    const totalContentWidth = rowWidths[rowIndex];
    // center this row relative to the widest row
    const startX = ((canvasWidth - widestRowWidth) / 2) + ((widestRowWidth - totalContentWidth) / 2);

    const y = lastY;

    for (let i = 0; i < hexCount; i++) {
      const cx = startX + i * (hexWidth + gap) + hexSize;
      positions.push({
        id: `r${rowIndex}-h${i}`,
        cx: cx,
        cy: y,
      });
    }

    // vertical step between rows; 0.866 approximates sqrt(3)/2 spacing for hex grids
    lastY = y + hexHeight * 0.866 + rowGap;
  });

  return positions;
};
