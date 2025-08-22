// Core domain types for pharmaceutical visualization system

export interface HexCoordinate {
  q: number; // Axial coordinate
  r: number; // Axial coordinate
  s: number; // Derived coordinate (q + r + s = 0)
}

export enum ServiceAreaType {
  ELN = 'ELN',
  BI = 'BI', 
  SDMS = 'SDMS',
  CDS = 'CDS',
  LIMS = 'LIMS',
  ODM = 'ODM',
  CM = 'CM',
  STRATEGIC_CONSULTING = 'STRATEGIC_CONSULTING',
  DIGITAL_TRANSFORMATION = 'DIGITAL_TRANSFORMATION',
  REGULATORY_AFFAIRS = 'REGULATORY_AFFAIRS',
  QUALITY_ASSURANCE = 'QUALITY_ASSURANCE'
}

export enum EngagementState {
  NOT_ENGAGED = 'NOT_ENGAGED',
  CURRENTLY_ENGAGED = 'CURRENTLY_ENGAGED',
  ACTIVELY_PURSUING = 'ACTIVELY_PURSUING'
}

// Cell-level visual state keys (used for inner cells separate from engagement states)
export type CellStateKey = 'CLIENT_AREA' | 'NON_CLIENT_AREA' | 'ENGAGED_CLIENT_AREA';

export interface CellVisualProperties {
  borderColor: string;
  backgroundColor: string;
  borderThickness: number;
  opacity: number;
}

export interface Cell {
  id: string;
  type: ServiceAreaType;
  position: HexCoordinate;
  displayName: string;
  isActive: boolean;
  state: EngagementState;
  // Optional visual state for the inner cell (catalog-driven)
  cellState?: CellStateKey;
  visualProperties: CellVisualProperties;
}

export interface HoneycombCluster {
  id: string;
  centerPosition: HexCoordinate;
  cells: Cell[];
  label?: string;
}

export interface MasterTemplate {
  id: string;
  version: string;
  honeycombClusters: HoneycombCluster[];
  metadata: {
    createdDate: string;
    description: string;
  };
}

export interface MapFile {
  id: string;
  clientId: string;
  version: string;
  configuration: {
    activeCells: string[];
    cellDisplayNames: Record<string, string>;
    clusterVisibility: Record<string, boolean>;
  };
  createdDate: string;
  createdBy: string;
}

export interface FootprintTemplate {
  id: string;
  clientId: string;
  masterTemplate: MasterTemplate;
  mapFile: MapFile;
  generatedCells: Cell[];
  metadata: {
    generatedDate: string;
    version: string;
  };
}

export interface ClientEngagementPage {
  clientId: string;
  clientName: string;
  footprintTemplate: FootprintTemplate;
  lastUpdated: string;
}

export interface EngagementData {
  cellId: string;
  state: EngagementState;
  visualProperties?: CellVisualProperties;
  lastUpdated: string;
}

// Master-blank template (visual blueprint) types
// This models clusters H1..H10 with inner cell slots C1..C10 as seen in the diagram.

export type ClusterId = `H${number}`; // e.g., "H1".."H10"
export type CellSlotId = `C${number}`; // e.g., "C1".."C10"

export interface MasterBlankTemplateV1 {
  version: '1.0.0' | string;
  description?: string;
  clusters: MasterBlankCluster[];
}

export interface MasterBlankCluster {
  id: ClusterId;
  label?: string; // optional display label (e.g., H1)
  centerPosition: HexCoordinate; // axial coordinate of the large hex center
  // Ten inner cell slots arranged in a honeycomb pattern inside the big hex
  cellSlots: MasterBlankCellSlot[]; // typically 10 entries: C1..C10
}

export interface MasterBlankCellSlot {
  id: CellSlotId; // e.g., C1..C10
  index: number; // 1..10 for ordering
  // Relative axial offset from the cluster center (q,r). s is implied as -q-r
  axialOffset: { q: number; r: number };
  // Optional absolute position if precomputed (q+r+s=0)
  position?: HexCoordinate;
  // Optional semantic hints (e.g., service area type to be mapped later)
  serviceAreaHint?: ServiceAreaType;
}
