interface CellPosition {
  q: number;
  r: number;
  s: number;
}

// Pre-defined slot positions for up to 10 inner cells using axial coordinates
// relative to the parent cluster's center (0,0,0).
// This layout follows a 2, 3, 2, 1, 2 row-based pattern.
export const INNER_CELL_SLOT_OFFSETS: CellPosition[] = [
  /* Row 1 (2 cells) */
  { q: -2, r: 0.3, s: -2 }, // C1
   { q: 0, r: -0.7, s: 0 },  // C2
   /* Row 2 (3 cells) */
  { q: -3, r: 1.3, s: 1 },  // C3
  { q: -1, r: 0.3, s: -1 }, // C4
  { q: 1, r: -0.7, s: -2 }, // C5
  /* Row 3 (2 cells) */
  { q: -2, r: 1.3, s: 0 },  // C6
  { q: 0, r: 0.3, s: -1 }, // C7
  /* Row 4 (1 cell) */
  { q: -1, r: 1.3, s: -1 }, // C8
  /* Row 5 (2 cells) */
  { q: -2, r: 2.3, s: 0 },  // C9
  { q: 0, r: 1.3, s: -1 }, // C10

];
