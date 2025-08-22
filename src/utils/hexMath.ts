import { HexCoordinate } from '../types/domain';

/**
 * Mathematical utilities for hexagonal coordinate system and rendering
 */
export class HexMath {
  static readonly HEX_SIZE = 30; // Radius of hexagon
  static readonly HEX_SPACING = 65; // Distance between hex centers

  /**
   * Convert axial coordinates to pixel coordinates
   */
  static axialToPixel(hex: HexCoordinate): { x: number; y: number } {
    const x = this.HEX_SPACING * (3/2 * hex.q);
    const y = this.HEX_SPACING * (Math.sqrt(3)/2 * hex.q + Math.sqrt(3) * hex.r);
    return { x, y };
  }

  /**
   * Generate hexagon path for SVG rendering
   */
  static generateHexPath(center: { x: number; y: number }, size: number): string {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = center.x + size * Math.cos(angle);
      const y = center.y + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')} Z`;
  }

  /**
   * Create spiral pattern of hexagons around a center point
   */
  static generateHexSpiral(center: HexCoordinate, radius: number): HexCoordinate[] {
    if (radius === 0) return [center];
    
    const results: HexCoordinate[] = [center];
    
    for (let ring = 1; ring <= radius; ring++) {
      let hex = { q: center.q - ring, r: center.r + ring, s: center.s };
      
      for (let direction = 0; direction < 6; direction++) {
        for (let step = 0; step < ring; step++) {
          results.push({ ...hex });
          hex = this.hexNeighbor(hex, direction);
        }
      }
    }
    
    return results;
  }

  /**
   * Get neighboring hexagon in specified direction
   */
  private static hexNeighbor(hex: HexCoordinate, direction: number): HexCoordinate {
    const directions = [
      { q: 1, r: 0, s: -1 }, { q: 1, r: -1, s: 0 }, { q: 0, r: -1, s: 1 },
      { q: -1, r: 0, s: 1 }, { q: -1, r: 1, s: 0 }, { q: 0, r: 1, s: -1 }
    ];
    const dir = directions[direction];
    return {
      q: hex.q + dir.q,
      r: hex.r + dir.r,
      s: hex.s + dir.s
    };
  }

  /**
   * Calculate distance between two hexagons
   */
  static hexDistance(a: HexCoordinate, b: HexCoordinate): number {
    return (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;
  }

  /**
   * Validate hexagonal coordinate (q + r + s = 0)
   */
  static isValidHexCoordinate(hex: HexCoordinate): boolean {
    return hex.q + hex.r + hex.s === 0;
  }

  /**
   * Convert pixel coordinates back to axial coordinates (for mouse interactions)
   */
  static pixelToAxial(point: { x: number; y: number }): HexCoordinate {
    const q = (2/3 * point.x) / this.HEX_SPACING;
    const r = (-1/3 * point.x + Math.sqrt(3)/3 * point.y) / this.HEX_SPACING;
    return this.hexRound({ q, r, s: -q - r });
  }

  /**
   * Round fractional hex coordinates to nearest hex
   */
  private static hexRound(hex: HexCoordinate): HexCoordinate {
    let q = Math.round(hex.q);
    let r = Math.round(hex.r);
    let s = Math.round(hex.s);

    const qDiff = Math.abs(q - hex.q);
    const rDiff = Math.abs(r - hex.r);
    const sDiff = Math.abs(s - hex.s);

    if (qDiff > rDiff && qDiff > sDiff) {
      q = -r - s;
    } else if (rDiff > sDiff) {
      r = -q - s;
    } else {
      s = -q - r;
    }

    return { q, r, s };
  }
}
