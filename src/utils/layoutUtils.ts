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

  let lastY = hexHeight / 2 + 20; // Initial top padding

  layout.forEach((hexCount, rowIndex) => {
    const totalContentWidth = (hexCount * hexWidth) + (Math.max(0, hexCount - 1) * gap);
    const startX = (canvasWidth - totalContentWidth) / 2;
    
    const y = lastY;

    for (let i = 0; i < hexCount; i++) {
      const cx = startX + i * (hexWidth + gap) + hexSize;
      positions.push({
        id: `r${rowIndex}-h${i}`,
        cx: cx,
        cy: y,
      });
    }

    lastY = y + hexHeight * 0.866 + rowGap;
  });

  return positions;
};
