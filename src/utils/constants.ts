import { ServiceAreaType, EngagementState } from '../types/domain';

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
  HEX_SIZE: 30,
  HEX_SPACING: 65,
  BORDER_THICKNESS: 2,
  HOVER_BORDER_THICKNESS: 3,
  DEFAULT_OPACITY: 1,
  HOVER_OPACITY: 0.8,
  ANIMATION_DURATION: 200,
  
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
export const DEFAULT_MASTER_TEMPLATE_CONFIG = {
  version: '1.0.0',
  description: 'Default pharmaceutical services honeycomb template',
  clusters: [
    {
      id: 'core-systems',
      label: 'Core Systems',
      centerPosition: { q: 0, r: 0, s: 0 },
      serviceAreas: [
        ServiceAreaType.ELN,
        ServiceAreaType.LIMS,
        ServiceAreaType.SDMS,
        ServiceAreaType.CDS,
        ServiceAreaType.BI,
        ServiceAreaType.ODM,
        ServiceAreaType.CM
      ]
    },
    {
      id: 'consulting-services',
      label: 'Consulting Services',
      centerPosition: { q: 3, r: -2, s: -1 },
      serviceAreas: [
        ServiceAreaType.STRATEGIC_CONSULTING,
        ServiceAreaType.DIGITAL_TRANSFORMATION,
        ServiceAreaType.REGULATORY_AFFAIRS,
        ServiceAreaType.QUALITY_ASSURANCE
      ]
    }
  ]
} as const;
