import { ServiceAreaType, EngagementState, CellSlotId } from '../types/domain';

/**
 * Application constants and configuration
 */
export const APP_CONFIG = {
  DEFAULT_CLIENT_ID: 'regeneron',
  WEBSOCKET_URL: 'ws://localhost:3001',
  API_BASE_URL: 'http://localhost:3001/api',
  RECONNECT_INTERVAL: 5000,
  MAX_RECONNECT_ATTEMPTS: 10
} as const;

/**
 * Visual styling constants
 */
export const VISUAL_CONSTANTS = {
  HEX_SIZE: 30,       // Individual cell size (reasonable for inner cells)
  HEX_SPACING: 30,   // Large spacing between cluster centers for 10-cluster layout
  BORDER_THICKNESS: 2,
  HOVER_BORDER_THICKNESS: 3,
  DEFAULT_OPACITY: 1,
  HOVER_OPACITY: 0.8,
  ANIMATION_DURATION: 200,
  
  // Text size constants
  CLUSTER_LABEL_FONT_SIZE: 54,  // Size of H1, H2, H3... labels
  CELL_TEXT_FONT_SIZE: 52,      // Size of text inside individual cells
  
  COLORS: {
    BORDER: '#333',
    HOVER_BORDER: '#007ACC',
    TEXT: '#333',
    
    // Engagement state colors
    NOT_ENGAGED: '#E5E5E5',
    CURRENTLY_ENGAGED: '#4A90E2',
    ACTIVELY_PURSUING: '#F5A623',
    
    // Service area colors (optional categorical coloring)
    ELN: '#FF6B6B',
    BI: '#4ECDC4',
    SDMS: '#45B7D1',
    CDS: '#96CEB4',
    LIMS: '#FFEAA7',
    ODM: '#DDA0DD',
    CM: '#98D8C8'
  }
} as const;

/**
 * Service area display names and metadata
 */
export const SERVICE_AREA_CONFIG = {
  [ServiceAreaType.ELN]: {
    displayName: 'Electronic Lab Notebook',
    description: 'Digital laboratory data management and documentation',
    category: 'Laboratory Systems'
  },
  [ServiceAreaType.BI]: {
    displayName: 'Business Intelligence',
    description: 'Data analytics and reporting solutions',
    category: 'Analytics'
  },
  [ServiceAreaType.SDMS]: {
    displayName: 'Scientific Data Management',
    description: 'Scientific data storage and management systems',
    category: 'Data Management'
  },
  [ServiceAreaType.CDS]: {
    displayName: 'Clinical Data Systems',
    description: 'Clinical trial data management and analysis',
    category: 'Clinical Systems'
  },
  [ServiceAreaType.LIMS]: {
    displayName: 'Laboratory Information Management',
    description: 'Laboratory workflow and sample management',
    category: 'Laboratory Systems'
  },
  [ServiceAreaType.ODM]: {
    displayName: 'Operational Data Store',
    description: 'Operational data integration and management',
    category: 'Data Management'
  },
  [ServiceAreaType.CM]: {
    displayName: 'Content Management',
    description: 'Document and content management systems',
    category: 'Content Systems'
  },
  [ServiceAreaType.STRATEGIC_CONSULTING]: {
    displayName: 'Strategic Consulting',
    description: 'Business strategy and transformation consulting',
    category: 'Consulting'
  },
  [ServiceAreaType.DIGITAL_TRANSFORMATION]: {
    displayName: 'Digital Transformation',
    description: 'Digital modernization and technology adoption',
    category: 'Consulting'
  },
  [ServiceAreaType.REGULATORY_AFFAIRS]: {
    displayName: 'Regulatory Affairs',
    description: 'Regulatory compliance and submission management',
    category: 'Compliance'
  },
  [ServiceAreaType.QUALITY_ASSURANCE]: {
    displayName: 'Quality Assurance',
    description: 'Quality management and validation services',
    category: 'Quality'
  }
} as const;

/**
 * Engagement state configuration
 */
export const ENGAGEMENT_STATE_CONFIG = {
  [EngagementState.NOT_ENGAGED]: {
    displayName: 'Not Engaged',
    description: 'No current engagement or activity',
    color: VISUAL_CONSTANTS.COLORS.NOT_ENGAGED,
    priority: 0
  },
  [EngagementState.CURRENTLY_ENGAGED]: {
    displayName: 'Currently Engaged',
    description: 'Active engagement in progress',
    color: VISUAL_CONSTANTS.COLORS.CURRENTLY_ENGAGED,
    priority: 2
  },
  [EngagementState.ACTIVELY_PURSUING]: {
    displayName: 'Actively Pursuing',
    description: 'Pursuing engagement opportunities',
    color: VISUAL_CONSTANTS.COLORS.ACTIVELY_PURSUING,
    priority: 1
  }
} as const;

/**
 * Default master template configuration
 */
// Ten staggered clusters (H1..H10), arranged 3-4-3 with axial spacing of 6 and staggered by 3
const TEN_CLUSTER_SERVICE_AREAS: ServiceAreaType[] = [
  ServiceAreaType.ELN,
  ServiceAreaType.LIMS,
  ServiceAreaType.SDMS,
  ServiceAreaType.CDS,
  ServiceAreaType.BI,
  ServiceAreaType.ODM,
  ServiceAreaType.CM,
  ServiceAreaType.STRATEGIC_CONSULTING,
  ServiceAreaType.DIGITAL_TRANSFORMATION,
  ServiceAreaType.REGULATORY_AFFAIRS
];

export const DEFAULT_MASTER_TEMPLATE_CONFIG = {
  version: '1.0.0',
  description: 'Ten-cluster 2x5 honeycomb template (each cluster supports up to 10 inner cells)',
  clusters: [
    // Row 1: H1-H5 at same height (r = 0), spaced horizontally
    { id: 'H1',  label: 'H1',  centerPosition: { q: -24, r: 0, s: 24 }, serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    { id: 'H2',  label: 'H2',  centerPosition: { q: -12, r: 0, s: 12 }, serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    { id: 'H3',  label: 'H3',  centerPosition: { q: 0,   r: 0, s: 0 },  serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    { id: 'H4',  label: 'H4',  centerPosition: { q: 12,  r: 0, s: -12 }, serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    { id: 'H5',  label: 'H5',  centerPosition: { q: 24,  r: 0, s: -24 }, serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    // Row 2: H6-H10 at same height (r = 6), offset by half horizontally
    { id: 'H6',  label: 'H6',  centerPosition: { q: -18, r: 6, s: 12 }, serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    { id: 'H7',  label: 'H7',  centerPosition: { q: -6,  r: 6, s: 0 },  serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    { id: 'H8',  label: 'H8',  centerPosition: { q: 6,   r: 6, s: -12 }, serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    { id: 'H9',  label: 'H9',  centerPosition: { q: 18,  r: 6, s: -24 }, serviceAreas: TEN_CLUSTER_SERVICE_AREAS },
    { id: 'H10', label: 'H10', centerPosition: { q: 30,  r: 6, s: -36 }, serviceAreas: TEN_CLUSTER_SERVICE_AREAS }
  ]
} as const;

/**
 * Fixed inner slot offsets for cells inside a big cluster hex (10 positions)
 * Pointy-top axial coordinates relative to cluster center.
 * Optimized for larger cluster hexes (CLUSTER_SCALE = 6).
 */
export const CLUSTER_SLOT_OFFSETS: Array<{ id: CellSlotId; q: number; r: number }> = [
  { id: 'C1', q: 0, r: 0 },      // center
  { id: 'C2', q: 3, r: 0 },      // ring expanded east
  { id: 'C3', q: 2, r: -2 },     // ring north-east
  { id: 'C4', q: -1, r: -2 },    // ring north-west
  { id: 'C5', q: -3, r: 0 },     // ring expanded west
  { id: 'C6', q: -2, r: 2 },     // ring south-west
  { id: 'C7', q: 1, r: 2 },      // ring south-east
  // outer ring positions with good spacing
  { id: 'C8', q: 4, r: -3 },     // far east
  { id: 'C9', q: 0, r: -3 },     // far north
  { id: 'C10', q: -3, r: 3 }     // far south-west
];
