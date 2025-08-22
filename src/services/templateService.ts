import { 
  MasterTemplate, 
  MapFile, 
  FootprintTemplate, 
  Cell, 
  EngagementState,
  
} from '../types/domain';
import { HexMath } from '../utils/hexMath';
import { DEFAULT_MASTER_TEMPLATE_CONFIG, VISUAL_CONSTANTS } from '../utils/constants';

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
            const displayName = mapFile.configuration.cellDisplayNames[templateCell.id] 
              || templateCell.displayName;

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
   * Load template for specific client
   */
  static async loadTemplate(clientId: string): Promise<FootprintTemplate> {
    try {
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
   * Create default master template based on configuration
   */
  private static createDefaultMasterTemplate(): MasterTemplate {
    const clusters = DEFAULT_MASTER_TEMPLATE_CONFIG.clusters.map(clusterConfig => {
      const cells: Cell[] = [];
      
      // Generate hexagonal positions for service areas in spiral pattern
      const positions = HexMath.generateHexSpiral(clusterConfig.centerPosition, 1);
      
      clusterConfig.serviceAreas.forEach((serviceArea, index) => {
        const position = positions[index] || clusterConfig.centerPosition;
        
        cells.push({
          id: `${clusterConfig.id}-${serviceArea.toLowerCase()}`,
          type: serviceArea,
          position,
          displayName: serviceArea,
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
      id: generateUUID(),
      version: DEFAULT_MASTER_TEMPLATE_CONFIG.version,
      honeycombClusters: clusters,
      metadata: {
        createdDate: new Date().toISOString(),
        description: DEFAULT_MASTER_TEMPLATE_CONFIG.description
      }
    };
  }

  /**
   * Create default map file for client
   */
  private static createDefaultMapFile(clientId: string): MapFile {
    // Enable all core systems by default
    const activeCells = [
      'core-systems-eln',
      'core-systems-lims',
      'core-systems-sdms',
      'core-systems-cds',
      'core-systems-bi',
      'core-systems-odm',
      'core-systems-cm',
      'consulting-services-strategic_consulting',
      'consulting-services-digital_transformation'
    ];

    const cellDisplayNames: Record<string, string> = {
      'core-systems-eln': 'ELN',
      'core-systems-lims': 'LIMS',
      'core-systems-sdms': 'SDMS',
      'core-systems-cds': 'CDS',
      'core-systems-bi': 'BI',
      'core-systems-odm': 'ODM',
      'core-systems-cm': 'CM',
      'consulting-services-strategic_consulting': 'Strategy',
      'consulting-services-digital_transformation': 'Digital'
    };

    const clusterVisibility: Record<string, boolean> = {
      'core-systems': true,
      'consulting-services': true
    };

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
      generatedCells: updatedCells,
      metadata: {
        ...template.metadata,
        generatedDate: new Date().toISOString()
      }
    };
  }

  /**
   * Get color for engagement state
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
