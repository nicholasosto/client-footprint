interface CellPosition {
  q: number;
  r: number;
  s: number;
}

// Pre-defined slot positions for up to 10 inner cells using axial coordinates
// relative to the parent cluster's center (0,0,0).
export const INNER_CELL_SLOT_OFFSETS: CellPosition[] = [
  { q: 0, r: 0, s: 0 },    // C1 (Center)
  { q: -1, r: 0, s: 1 },   // C2
  { q: 1, r: -1, s: 0 },   // C3
  { q: 1, r: 0, s: -1 },   // C4
  { q: 0, r: 1, s: -1 },   // C5
  { q: -1, r: 1, s: 0 },   // C6
  { q: 0, r: -1, s: 1 },   // C7
  // Add more positions if needed for C8, C9, C10
  { q: -2, r: 0, s: 2 },   // C8
  { q: 2, r: 0, s: -2 },   // C9
  { q: 0, r: 2, s: -2 },   // C10
];
