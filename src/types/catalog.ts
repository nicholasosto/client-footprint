// Catalog system for pharmaceutical engagement data
// Provides static reference data with metadata interfaces

export interface CatalogMetadata {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  lastUpdated?: string;
  version?: string;
}

export interface ServiceAreaCatalogEntry extends CatalogMetadata {
  id: string; // SA_SMALL_MOLECULE_RESEARCH
  name: string; // "Small Molecule Research"
  category: string; // "Laboratory Systems"
  description: string;
  icon?: string; // Icon identifier
  colorHex?: string; // #FF6B6B
  priority: number; // 1-5, 1 = highest
  isActive: boolean;
}

export interface ServiceTypeCatalogEntry extends CatalogMetadata {
  id: string; // ST_ELN
  name: string; // "Electronic Lab Notebook"
  abbreviation: string; // "ELN"
  category: string; // "Data Management"
  description: string;
  typicalDurationMonths?: number;
  complexityLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  isActive: boolean;
}

export interface EngagementStatusCatalogEntry extends CatalogMetadata {
  id: string; // NOT_ENGAGED
  name: string; // "Not Engaged"
  description: string;
  colorHex: string; // #E5E5E5
  priority: number; // 0-5, higher = more engaged
  nextActions?: string; // Recommended next steps
  isActive: boolean;
}

// Honeycomb visual state keys for large cluster hexagons
export type HC_STATE_KEY = 'ENGAGED' | 'NOT_ENGAGED' | 'ACTIVE_PERSUAL';

// Visual metadata for a honeycomb state
export interface HoneycombStateMeta {
  key: HC_STATE_KEY;
  label: string; // display label e.g., 'Engaged'
  backgroundColor: string; // fill color for the big hex
  textColor: string; // color for any title/text inside the big hex
  borderColor?: string; // stroke color for the hex border
  isActive?: boolean;
}

// Catalog type for honeycomb visual states (indexed by HC_STATE_KEY)
export type HoneycombStateCatalog = Record<HC_STATE_KEY, HoneycombStateMeta>;

// Template mapping data structures
export interface TemplateMapping {
  clientId: string;
  honeycombId: string; // H1-H10
  cellId: string; // C1-C10
  serviceAreaId: string; // References ServiceAreaCatalogEntry.id
  serviceTypeId: string; // References ServiceTypeCatalogEntry.id
  displayLabel: string;
  isActive: boolean;
  ownerTeam?: string;
  priority?: number;
  notes?: string;
  mapVersion: string;
  lastUpdated: string;
}

// Dynamic engagement data
export interface EngagementRecord {
  clientId: string;
  serviceAreaId: string; // References ServiceAreaCatalogEntry.id
  serviceTypeId: string; // References ServiceTypeCatalogEntry.id
  engagementStatusId: string; // References EngagementStatusCatalogEntry.id
  startDate?: string;
  expectedEndDate?: string;
  ownerName?: string;
  ownerEmail?: string;
  budgetUsd?: number;
  progressPercent?: number;
  lastContactDate?: string;
  nextMilestone?: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
  additionalNotes?: string;
  lastUpdated: string;
}

// Catalog container interface
export interface PharmaCatalog {
  serviceAreas: Map<string, ServiceAreaCatalogEntry>;
  serviceTypes: Map<string, ServiceTypeCatalogEntry>;
  engagementStatuses: Map<string, EngagementStatusCatalogEntry>;
  version: string;
  lastUpdated: string;
}

// CSV parsing result types
export interface CsvParseResult<T> {
  data: T[];
  errors: string[];
  rowCount: number;
  validRowCount: number;
}

export interface TemplateMapCsvRow {
  Client_ID: string;
  Honeycomb_ID: string;
  Cell_ID: string;
  Service_Area_ID: string;
  Service_Type_ID: string;
  Display_Label: string;
  Is_Active: string;
  Owner_Team?: string;
  Priority?: string;
  Notes?: string;
  Map_Version: string;
  Last_Updated: string;
}

export interface EngagementDataCsvRow {
  Client_ID: string;
  Service_Area_ID: string;
  Service_Type_ID: string;
  Engagement_Status_ID: string;
  Start_Date?: string;
  Expected_End_Date?: string;
  Owner_Name?: string;
  Owner_Email?: string;
  Budget_USD?: string;
  Progress_Percent?: string;
  Last_Contact_Date?: string;
  Next_Milestone?: string;
  Risk_Level?: string;
  Additional_Notes?: string;
  Last_Updated: string;
}
