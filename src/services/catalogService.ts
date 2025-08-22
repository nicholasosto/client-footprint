import { 
  PharmaCatalog, 
  ServiceAreaCatalogEntry, 
  ServiceTypeCatalogEntry, 
  EngagementStatusCatalogEntry,
  TemplateMapping,
  EngagementRecord,
  CsvParseResult,
  TemplateMapCsvRow,
  EngagementDataCsvRow
} from '../types/catalog';

/**
 * CSV parsing and catalog management service
 */
export class CatalogService {
  
  /**
   * Parse CSV text into structured data
   */
  static parseCsv<T>(csvText: string): CsvParseResult<T> {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data: T[] = [];
    const errors: string[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines
      
      try {
        const values = line.split(',').map(v => v.trim());
        const row: any = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        
        data.push(row as T);
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Parse error'}`);
      }
    }
    
    return {
      data,
      errors,
      rowCount: lines.length - 1,
      validRowCount: data.length
    };
  }

  /**
   * Build pharmaceutical catalog from CSV data
   */
  static buildCatalogFromCsv(
    serviceAreasCsv: string,
    serviceTypesCsv: string,
    engagementStatusesCsv: string
  ): PharmaCatalog {
    const serviceAreasResult = this.parseCsv<any>(serviceAreasCsv);
    const serviceTypesResult = this.parseCsv<any>(serviceTypesCsv);
    const statusesResult = this.parseCsv<any>(engagementStatusesCsv);

    const serviceAreas = new Map<string, ServiceAreaCatalogEntry>();
    serviceAreasResult.data.forEach(row => {
      serviceAreas.set(row.SERVICE_AREA_ID, {
        id: row.SERVICE_AREA_ID,
        name: row.SERVICE_AREA_NAME,
        category: row.CATEGORY,
        description: row.DESCRIPTION,
        icon: row.ICON,
        colorHex: row.COLOR_HEX,
        priority: parseInt(row.PRIORITY) || 1,
        isActive: row.IS_ACTIVE?.toUpperCase() === 'TRUE'
      });
    });

    const serviceTypes = new Map<string, ServiceTypeCatalogEntry>();
    serviceTypesResult.data.forEach(row => {
      serviceTypes.set(row.SERVICE_TYPE_ID, {
        id: row.SERVICE_TYPE_ID,
        name: row.SERVICE_TYPE_NAME,
        abbreviation: row.ABBREVIATION,
        category: row.CATEGORY,
        description: row.DESCRIPTION,
        typicalDurationMonths: parseInt(row.TYPICAL_DURATION_MONTHS) || undefined,
        complexityLevel: row.COMPLEXITY_LEVEL as 'LOW' | 'MEDIUM' | 'HIGH',
        isActive: row.IS_ACTIVE?.toUpperCase() === 'TRUE'
      });
    });

    const engagementStatuses = new Map<string, EngagementStatusCatalogEntry>();
    statusesResult.data.forEach(row => {
      engagementStatuses.set(row.ENGAGEMENT_STATUS_ID, {
        id: row.ENGAGEMENT_STATUS_ID,
        name: row.STATUS_NAME,
        description: row.DESCRIPTION,
        colorHex: row.COLOR_HEX,
        priority: parseInt(row.PRIORITY) || 0,
        nextActions: row.NEXT_ACTIONS,
        isActive: row.IS_ACTIVE?.toUpperCase() === 'TRUE'
      });
    });

    return {
      serviceAreas,
      serviceTypes,
      engagementStatuses,
      version: '1.0.0',
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Parse template mapping CSV
   */
  static parseTemplateMapping(csvText: string): CsvParseResult<TemplateMapping> {
    const result = this.parseCsv<TemplateMapCsvRow>(csvText);
    
    const mappings: TemplateMapping[] = result.data.map(row => ({
      clientId: row.Client_ID,
      honeycombId: row.Honeycomb_ID,
      cellId: row.Cell_ID,
      serviceAreaId: row.Service_Area_ID,
      serviceTypeId: row.Service_Type_ID,
      displayLabel: row.Display_Label,
      isActive: row.Is_Active?.toUpperCase() === 'TRUE',
      ownerTeam: row.Owner_Team,
      priority: parseInt(row.Priority || '1'),
      notes: row.Notes,
      mapVersion: row.Map_Version,
      lastUpdated: row.Last_Updated
    }));

    return {
      data: mappings,
      errors: result.errors,
      rowCount: result.rowCount,
      validRowCount: mappings.length
    };
  }

  /**
   * Parse engagement data CSV
   */
  static parseEngagementData(csvText: string): CsvParseResult<EngagementRecord> {
    const result = this.parseCsv<EngagementDataCsvRow>(csvText);
    
    const records: EngagementRecord[] = result.data.map(row => ({
      clientId: row.Client_ID,
      serviceAreaId: row.Service_Area_ID,
      serviceTypeId: row.Service_Type_ID,
      engagementStatusId: row.Engagement_Status_ID,
      startDate: row.Start_Date,
      expectedEndDate: row.Expected_End_Date,
      ownerName: row.Owner_Name,
      ownerEmail: row.Owner_Email,
      budgetUsd: row.Budget_USD ? parseInt(row.Budget_USD) : undefined,
      progressPercent: row.Progress_Percent ? parseInt(row.Progress_Percent) : undefined,
      lastContactDate: row.Last_Contact_Date,
      nextMilestone: row.Next_Milestone,
      riskLevel: row.Risk_Level as 'LOW' | 'MEDIUM' | 'HIGH' | undefined,
      additionalNotes: row.Additional_Notes,
      lastUpdated: row.Last_Updated
    }));

    return {
      data: records,
      errors: result.errors,
      rowCount: result.rowCount,
      validRowCount: records.length
    };
  }

  /**
   * Validate template mapping against catalog
   */
  static validateTemplateMapping(
    mappings: TemplateMapping[], 
    catalog: PharmaCatalog
  ): string[] {
    const errors: string[] = [];
    
    mappings.forEach((mapping, index) => {
      if (!catalog.serviceAreas.has(mapping.serviceAreaId)) {
        errors.push(`Row ${index + 1}: Unknown service area ID: ${mapping.serviceAreaId}`);
      }
      
      if (!catalog.serviceTypes.has(mapping.serviceTypeId)) {
        errors.push(`Row ${index + 1}: Unknown service type ID: ${mapping.serviceTypeId}`);
      }
      
      if (!mapping.honeycombId.match(/^H([1-9]|10)$/)) {
        errors.push(`Row ${index + 1}: Invalid honeycomb ID: ${mapping.honeycombId} (must be H1-H10)`);
      }
      
      if (!mapping.cellId.match(/^C([1-9]|10)$/)) {
        errors.push(`Row ${index + 1}: Invalid cell ID: ${mapping.cellId} (must be C1-C10)`);
      }
    });
    
    return errors;
  }

  /**
   * Validate engagement data against catalog
   */
  static validateEngagementData(
    records: EngagementRecord[], 
    catalog: PharmaCatalog
  ): string[] {
    const errors: string[] = [];
    
    records.forEach((record, index) => {
      if (!catalog.serviceAreas.has(record.serviceAreaId)) {
        errors.push(`Row ${index + 1}: Unknown service area ID: ${record.serviceAreaId}`);
      }
      
      if (!catalog.serviceTypes.has(record.serviceTypeId)) {
        errors.push(`Row ${index + 1}: Unknown service type ID: ${record.serviceTypeId}`);
      }
      
      if (!catalog.engagementStatuses.has(record.engagementStatusId)) {
        errors.push(`Row ${index + 1}: Unknown engagement status ID: ${record.engagementStatusId}`);
      }
    });
    
    return errors;
  }

  /**
   * Create default pharmaceutical catalog
   */
  static createDefaultCatalog(): PharmaCatalog {
    // This would typically load from the CSV files we created
    // For now, return a minimal catalog
    return {
      serviceAreas: new Map(),
      serviceTypes: new Map(),
      engagementStatuses: new Map(),
      version: '1.0.0',
      lastUpdated: new Date().toISOString()
    };
  }
}
