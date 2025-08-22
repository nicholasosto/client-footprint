import { 
  MasterTemplate, 
  MapFile, 
  FootprintTemplate, 
  Cell, 
  EngagementState,
  
} from '../types/domain';
import { HexMath } from '../utils/hexMath';
import { DEFAULT_MASTER_TEMPLATE_CONFIG, VISUAL_CONSTANTS, CLUSTER_SLOT_OFFSETS } from '../utils/constants';
import { ServiceTypeCatalogEntry } from '../types/catalog';

// Simple UUID generator
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

/**
 * Service for processing templates and generating footprint visualizations
 */
export class TemplateService {
  
  private static serviceTypeCatalog: Map<string, ServiceTypeCatalogEntry> = new Map();
  
  /**
   * Load service type catalog data (call this before generating templates)
   */
  static async loadServiceTypeCatalog(): Promise<void> {
    try {
      // In a real app, this would fetch from API or load from files
      // For now, we'll create a mock catalog based on the CSV structure
      const mockCatalog = new Map<string, ServiceTypeCatalogEntry>();
      
      // Add service types based on the CSV data
      mockCatalog.set('ST_ELN', {
        id: 'ST_ELN',
        name: 'Electronic Lab Notebook',
        abbreviation: 'ELN',
        category: 'Data Management',
        description: 'Digital laboratory data capture and management',
        typicalDurationMonths: 6,
        complexityLevel: 'MEDIUM',
        isActive: true
      });
      
      mockCatalog.set('ST_LIMS', {
        id: 'ST_LIMS',
        name: 'Laboratory Information Management System',
        abbreviation: 'LIMS',
        category: 'Data Management',
        description: 'Sample and workflow management for labs',
        typicalDurationMonths: 12,
        complexityLevel: 'HIGH',
        isActive: true
      });
      
      mockCatalog.set('ST_BI', {
        id: 'ST_BI',
        name: 'Business Intelligence',
        abbreviation: 'BI',
        category: 'Analytics',
        description: 'Data analytics and reporting solutions',
        typicalDurationMonths: 9,
        complexityLevel: 'MEDIUM',
        isActive: true
      });
      
      mockCatalog.set('ST_SDMS', {
        id: 'ST_SDMS',
        name: 'Scientific Data Management System',
        abbreviation: 'SDMS',
        category: 'Data Management',
        description: 'Scientific data storage and integration',
        typicalDurationMonths: 18,
        complexityLevel: 'HIGH',
        isActive: true
      });
      
      mockCatalog.set('ST_CDS', {
        id: 'ST_CDS',
        name: 'Clinical Data Systems',
        abbreviation: 'CDS',
        category: 'Clinical',
        description: 'Clinical trial data management platforms',
        typicalDurationMonths: 15,
        complexityLevel: 'HIGH',
        isActive: true
      });
      
      mockCatalog.set('ST_EDC', {
        id: 'ST_EDC',
        name: 'Electronic Data Capture',
        abbreviation: 'EDC',
        category: 'Clinical',
        description: 'Clinical trial data collection systems',
        typicalDurationMonths: 12,
        complexityLevel: 'HIGH',
        isActive: true
      });
      
      mockCatalog.set('ST_CTMS', {
        id: 'ST_CTMS',
        name: 'Clinical Trial Management System',
        abbreviation: 'CTMS',
        category: 'Clinical',
        description: 'Clinical study management and tracking',
        typicalDurationMonths: 15,
        complexityLevel: 'HIGH',
        isActive: true
      });
      
      mockCatalog.set('ST_QMS', {
        id: 'ST_QMS',
        name: 'Quality Management System',
        abbreviation: 'QMS',
        category: 'Quality',
        description: 'Quality processes and compliance tracking',
        typicalDurationMonths: 12,
        complexityLevel: 'MEDIUM',
        isActive: true
      });
      
      mockCatalog.set('ST_MES', {
        id: 'ST_MES',
        name: 'Manufacturing Execution System',
        abbreviation: 'MES',
        category: 'Operations',
        description: 'Production workflow and batch management',
        typicalDurationMonths: 18,
        complexityLevel: 'HIGH',
        isActive: true
      });
      
      mockCatalog.set('ST_ERP', {
        id: 'ST_ERP',
        name: 'Enterprise Resource Planning',
        abbreviation: 'ERP',
        category: 'Operations',
        description: 'Integrated business process management',
        typicalDurationMonths: 24,
        complexityLevel: 'HIGH',
        isActive: true
      });
      
      mockCatalog.set('ST_REGULATORY_SUBMISSION', {
        id: 'ST_REGULATORY_SUBMISSION',
        name: 'Regulatory Submission Platform',
        abbreviation: 'RSP',
        category: 'Compliance',
        description: 'Electronic regulatory submission systems',
        typicalDurationMonths: 9,
        complexityLevel: 'MEDIUM',
        isActive: true
      });
      
      mockCatalog.set('ST_PHARMACOVIGILANCE', {
        id: 'ST_PHARMACOVIGILANCE',
        name: 'Pharmacovigilance System',
        abbreviation: 'PV',
        category: 'Safety',
        description: 'Adverse event tracking and reporting',
        typicalDurationMonths: 12,
        complexityLevel: 'MEDIUM',
        isActive: true
      });
      
      mockCatalog.set('ST_CM', {
        id: 'ST_CM',
        name: 'Content Management',
        abbreviation: 'CM',
        category: 'Content',
        description: 'Document and content management systems',
        typicalDurationMonths: 6,
        complexityLevel: 'LOW',
        isActive: true
      });
      
      this.serviceTypeCatalog = mockCatalog;
    } catch (error) {
      console.error('Error loading service type catalog:', error);
    }
  }
  
  /**
   * Get abbreviation for a service type ID
   */
  static getServiceTypeAbbreviation(serviceTypeId: string): string {
    const serviceType = this.serviceTypeCatalog.get(serviceTypeId);
    return serviceType?.abbreviation || serviceTypeId;
  }
  
  /**
   * Load template for client (main entry point)
   */
  static async loadTemplate(clientId: string): Promise<FootprintTemplate> {
    try {
      // Ensure service type catalog is loaded
      await this.loadServiceTypeCatalog();
      
      const masterBlank = await this.fetchMasterTemplate();
      const mapFile = await this.fetchMapFile(clientId);
      
      return this.generateFootprintTemplate(masterBlank, mapFile);
    } catch (error) {
      console.error('Error loading template:', error);
      // Return default template on error
      return this.createDefaultTemplate(clientId);
    }
  }
  
  /**
   * Create default template for testing purposes
   */
  static createDefaultTemplate(clientId: string): FootprintTemplate {
    const masterTemplate = this.createDefaultMasterTemplate();
    const mapFile = this.createDefaultMapFile(clientId);
    
    return this.generateFootprintTemplate(masterTemplate, mapFile);
  }
  
  /**
   * Fetch master template from API or storage
   */
  private static async fetchMasterTemplate(): Promise<MasterTemplate> {
    // For now, return default template
    // In production, this would fetch from API
    return this.createDefaultMasterTemplate();
  }

  /**
   * Fetch client-specific map file from API or storage
   */
  private static async fetchMapFile(clientId: string): Promise<MapFile> {
    // For now, return default map file
    // In production, this would fetch from API
    return this.createDefaultMapFile(clientId);
  }
  
  /**
   * Generate footprint template by combining master template with client-specific map file
   */
  static generateFootprintTemplate(
    masterBlank: MasterTemplate,
    mapFile: MapFile
  ): FootprintTemplate {
    const generatedCells: Cell[] = [];

    // Process each honeycomb cluster
    masterBlank.honeycombClusters.forEach(cluster => {
      // Check if cluster is visible according to map file
      const clusterVisible = mapFile.configuration.clusterVisibility[cluster.id] !== false;
      
      if (clusterVisible) {
        cluster.cells.forEach(templateCell => {
          // Check if cell is active according to map file
          const isActive = mapFile.configuration.activeCells.indexOf(templateCell.id) !== -1;
          
          if (isActive) {
            // Try to get service type abbreviation from cell ID or use display name
            let displayName = mapFile.configuration.cellDisplayNames[templateCell.id] 
              || templateCell.displayName;
            
            // Check if the cell ID contains a service type pattern and use abbreviation
            const serviceTypeMatch = templateCell.id.match(/(ST_[A-Z_]+)/);
            if (serviceTypeMatch) {
              const serviceTypeId = serviceTypeMatch[1];
              const abbreviation = this.getServiceTypeAbbreviation(serviceTypeId);
              if (abbreviation !== serviceTypeId) {
                displayName = abbreviation;
              }
            }

            generatedCells.push({
              ...templateCell,
              displayName,
              isActive: true,
              state: EngagementState.NOT_ENGAGED,
              visualProperties: {
                borderColor: VISUAL_CONSTANTS.COLORS.BORDER,
                backgroundColor: VISUAL_CONSTANTS.COLORS.NOT_ENGAGED,
                borderThickness: VISUAL_CONSTANTS.BORDER_THICKNESS,
                opacity: VISUAL_CONSTANTS.DEFAULT_OPACITY
              }
            });
          }
        });
      }
    });

    return {
      id: `${mapFile.clientId}-${mapFile.version}`,
      clientId: mapFile.clientId,
      masterTemplate: masterBlank,
      mapFile,
      generatedCells,
      metadata: {
        generatedDate: new Date().toISOString(),
        version: mapFile.version
      }
    };
  }

  /**
   * Create default master template based on configuration
   */
  private static createDefaultMasterTemplate(): MasterTemplate {
    // Mapping of service areas to their primary service types
    const serviceAreaToTypeMap = new Map([
      ['ELN', 'ST_ELN'],
      ['LIMS', 'ST_LIMS'], 
      ['SDMS', 'ST_SDMS'],
      ['CDS', 'ST_CDS'],
      ['BI', 'ST_BI'],
      ['ODM', 'ST_ODM'],
      ['CM', 'ST_CM'],
      ['STRATEGIC_CONSULTING', 'ST_REGULATORY_SUBMISSION'],
      ['DIGITAL_TRANSFORMATION', 'ST_ERP'],
      ['REGULATORY_AFFAIRS', 'ST_REGULATORY_SUBMISSION']
    ]);
    
    const clusters = DEFAULT_MASTER_TEMPLATE_CONFIG.clusters.map(clusterConfig => {
      const cells: Cell[] = [];
      
      // Generate inner positions from fixed slot offsets (C1..C10)
      const slotPositions = CLUSTER_SLOT_OFFSETS.map(slot => {
        const q = clusterConfig.centerPosition.q + slot.q;
        const r = clusterConfig.centerPosition.r + slot.r;
        return { q, r, s: -q - r };
      });
      
      clusterConfig.serviceAreas.forEach((serviceArea, index) => {
        const position = slotPositions[index] || clusterConfig.centerPosition;
        const serviceTypeId = serviceAreaToTypeMap.get(serviceArea) || 'ST_ELN';
        const abbreviation = this.getServiceTypeAbbreviation(serviceTypeId);
        
        cells.push({
          id: `${clusterConfig.id}-${serviceTypeId}`,
          type: serviceArea,
          position,
          displayName: abbreviation,
          isActive: true,
          state: EngagementState.NOT_ENGAGED,
          visualProperties: {
            borderColor: VISUAL_CONSTANTS.COLORS.BORDER,
            backgroundColor: VISUAL_CONSTANTS.COLORS.NOT_ENGAGED,
            borderThickness: VISUAL_CONSTANTS.BORDER_THICKNESS,
            opacity: VISUAL_CONSTANTS.DEFAULT_OPACITY
          }
        });
      });

      return {
        id: clusterConfig.id,
        centerPosition: clusterConfig.centerPosition,
        cells,
        label: clusterConfig.label
      };
    });

    return {
      id: DEFAULT_MASTER_TEMPLATE_CONFIG.version,
      version: DEFAULT_MASTER_TEMPLATE_CONFIG.version,
      honeycombClusters: clusters,
      metadata: {
        createdDate: new Date().toISOString(),
        description: DEFAULT_MASTER_TEMPLATE_CONFIG.description
      }
    };
  }

  private static createDefaultMapFile(clientId: string): MapFile {
    // Enable all generated cells by default and make all clusters visible
    const activeCells: string[] = [];
    const cellDisplayNames: Record<string, string> = {};
    const clusterVisibility: Record<string, boolean> = {};

    // Create service area to service type mapping
    const serviceAreaToTypeMap = new Map([
      ['ELN', 'ST_ELN'],
      ['LIMS', 'ST_LIMS'], 
      ['SDMS', 'ST_SDMS'],
      ['CDS', 'ST_CDS'],
      ['BI', 'ST_BI'],
      ['ODM', 'ST_ODM'],
      ['CM', 'ST_CM'],
      ['STRATEGIC_CONSULTING', 'ST_REGULATORY_SUBMISSION'],
      ['DIGITAL_TRANSFORMATION', 'ST_ERP'],
      ['REGULATORY_AFFAIRS', 'ST_REGULATORY_SUBMISSION']
    ]);

    // Leverage DEFAULT_MASTER_TEMPLATE_CONFIG to predict ids used in createDefaultMasterTemplate
    const masterCfg = DEFAULT_MASTER_TEMPLATE_CONFIG;
    masterCfg.clusters.forEach(c => {
      clusterVisibility[c.id] = true;
      c.serviceAreas.forEach(sa => {
        const serviceTypeId = serviceAreaToTypeMap.get(sa) || 'ST_ELN';
        const id = `${c.id}-${serviceTypeId}`;
        const abbreviation = this.getServiceTypeAbbreviation(serviceTypeId);
        activeCells.push(id);
        cellDisplayNames[id] = abbreviation;
      });
    });

    return {
      id: generateUUID(),
      clientId,
      version: '1.0.0',
      configuration: {
        activeCells,
        cellDisplayNames,
        clusterVisibility
      },
      createdDate: new Date().toISOString(),
      createdBy: 'system'
    };
  }

  /**
   * Update cell engagement state in template
   */
  static updateCellState(
    template: FootprintTemplate,
    cellId: string,
    newState: EngagementState
  ): FootprintTemplate {
    const updatedCells = template.generatedCells.map(cell => {
      if (cell.id === cellId) {
        return {
          ...cell,
          state: newState,
          visualProperties: {
            ...cell.visualProperties,
            backgroundColor: this.getStateColor(newState)
          }
        };
      }
      return cell;
    });

    return {
      ...template,
      generatedCells: updatedCells
    };
  }

  /**
   * Get background color for engagement state
   */
  private static getStateColor(state: EngagementState): string {
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
  }
}
