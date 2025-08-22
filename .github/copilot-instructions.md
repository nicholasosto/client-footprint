<!-- TypeScript Pharmaceutical Visualization System Instructions -->

# Project: Pharmaceutical Operations Visualization System

## Overview
This is a production-ready TypeScript React application for visualizing pharmaceutical client engagement footprints using interactive honeycomb structures. The system displays exactly 10 staggered honeycomb clusters (H1-H10), each containing up to 10 inner cells (C1-C10) representing specific service engagements. Built with modern tooling and a comprehensive catalog-based data architecture.

## Architecture
- **Build System**: Vite 5 (migrated from CRA for performance and reliability)
- **Frontend**: React 18 with TypeScript in strict mode
- **UI Framework**: Material UI (MUI) with Emotion styling and responsive design
- **State Management**: Redux Toolkit with typed slices
- **Visualization**: Custom SVG honeycomb rendering with axial coordinate mathematics
- **Data Layer**: CSV-driven catalog system with validation and type safety
- **Routing**: React Router v6 with client-side navigation

## Key Architectural Patterns
- **Catalog-Based Data Model**: Static catalogs (service areas, types, statuses) + Client mappings + Dynamic engagement data
- **Ten-Cluster Layout**: Fixed 10 honeycomb structure (H1-H10) in staggered 3-4-3 arrangement
- **Inner Cell Positioning**: Up to 10 cells per cluster using fixed axial slot offsets (C1-C10)
- **CSV Configuration**: Template mappings and engagement data loaded from structured CSV files
- **Responsive Grid Layout**: Left summary table + right honeycomb visualization

## Data Model Architecture
### Catalog System (`src/types/catalog.ts`, `src/services/catalogService.ts`)
- **Service Areas**: Pharmaceutical domains (Small Molecule Research, Clinical Trials, etc.)
- **Service Types**: Specific technologies (ELN, LIMS, BI, CTMS, etc.) with complexity metadata
- **Engagement Statuses**: Progression states (Not Engaged → Discovery → Pursuing → Engaged → Complete)
- **Template Mappings**: Client-specific honeycomb position → service assignments
- **Engagement Records**: Live data with owners, budgets, timelines, progress tracking

### CSV Data Structure
```
service-area-catalog.csv     → ServiceAreaCatalogEntry[]
service-type-catalog.csv     → ServiceTypeCatalogEntry[]  
engagement-status-catalog.csv → EngagementStatusCatalogEntry[]
{client}-template-map.csv    → TemplateMapping[] (H1-H10, C1-C10 positions)
{client}-engagement-data.csv → EngagementRecord[] (live status, budgets, owners)
```

## Core Components
- **`HoneycombVisualization`**: SVG rendering engine with cluster labels and cell positioning
- **`HexCell`**: Memoized individual cell component with engagement state coloring  
- **`EngagementSummaryTable`**: Left-side MUI table with status chips and owner information
- **`EngagementLegend`**: Global footer legend showing engagement state colors
- **`CatalogService`**: CSV parsing, validation, and catalog management
- **`TemplateService`**: Template generation from catalog + mapping + engagement data
- **`HexMath`**: Axial coordinate system utilities for hexagonal positioning

## Development Guidelines
- **TypeScript**: Strict mode with comprehensive interface definitions for all data structures
- **Performance**: React.memo for components, useMemo for expensive calculations, Map-based lookups
- **Validation**: CSV data validation against catalog schemas with error reporting
- **Responsive Design**: MUI Grid system with xs/md/lg breakpoints, no horizontal scrolling
- **Extensibility**: New service areas/types added via CSV catalogs, not code changes
- **Testing**: Focus on HexMath utilities, CSV parsing, and catalog validation logic

## File Structure & Key Modules
```
src/
├── components/
│   ├── HoneycombVisualization/
│   │   ├── HoneycombVisualization.tsx    # Main SVG rendering with clusters
│   │   ├── HexCell.tsx                   # Individual cell component (memoized)
│   │   └── HoneycombVisualization.css    # Legacy styles (being migrated to MUI)
│   └── common/
│       ├── EngagementSummaryTable.tsx    # Left-side table with MUI components
│       ├── EngagementLegend.tsx          # Global footer legend
│       ├── ClientNavigationBar.tsx       # Legacy navigation (replaced by MUI AppBar)
│       └── Header.tsx                    # Legacy header (replaced by MUI AppBar)
├── pages/
│   ├── ClientFootprintPage.tsx           # Main client view with Grid layout
│   └── AdminPanel.tsx                    # Admin interface for catalog management
├── services/
│   ├── catalogService.ts                 # CSV parsing and catalog management
│   └── templateService.ts                # Template generation and cell state updates
├── store/
│   ├── index.ts                          # Redux store configuration
│   └── slices/
│       ├── templateSlice.ts              # Template and client state management
│       └── engagementSlice.ts            # Dynamic engagement data state
├── types/
│   ├── catalog.ts                        # Catalog system interfaces (NEW)
│   └── domain.ts                         # Core domain types and legacy interfaces
└── utils/
    ├── constants.ts                      # 10-cluster config, visual constants, slot offsets
    └── hexMath.ts                        # Axial coordinate mathematics
```

## Progress Tracking
### ✅ Completed (Production Ready)
- [x] **Modern Build System**: Migrated from CRA to Vite, resolved ajv dependency conflicts
- [x] **UI Framework**: Integrated Material UI with responsive design and theming
- [x] **Ten-Cluster Layout**: Fixed 10 honeycomb structure (H1-H10) with staggered positioning
- [x] **Inner Cell System**: Up to 10 cells per cluster using axial slot offsets (C1-C10)
- [x] **Catalog Architecture**: Comprehensive CSV-driven data model with validation
- [x] **Summary Table**: Left-side engagement table with status chips and owner data
- [x] **Legend System**: Global footer with engagement state color coding
- [x] **Cluster Labels**: H1-H10 labels rendered on large hexagons
- [x] **Responsive Layout**: MUI Grid with proper breakpoints, no forced scrolling
- [x] **Build Pipeline**: Clean TypeScript compilation and Vite bundling

### 🚧 In Progress / Next Phase
- [ ] **CSV Upload Interface**: Admin panel for testing catalog and mapping data
- [ ] **Dynamic Table Data**: Connect summary table to catalog-driven engagement records
- [ ] **Hover/Click Interactions**: Sync between table rows and honeycomb cells
- [ ] **Tooltip System**: MUI Popper with engagement details on hex hover
- [ ] **WebSocket Integration**: Real-time engagement data updates
- [ ] **Testing Suite**: Vitest setup with HexMath and catalog validation tests

### 📋 Current Implementation Details
- **Container Width**: `maxWidth="xl"` for wider layout without squishing
- **Grid Proportions**: 4/8 on lg screens, 5/7 on md for balanced table/visualization split
- **Engagement States**: NOT_ENGAGED, DISCOVERY, ACTIVELY_PURSUING, PROPOSAL_SUBMITTED, CURRENTLY_ENGAGED, PROJECT_COMPLETE, ON_HOLD, CANCELLED
- **Service Areas**: 10 pharmaceutical domains with priority, category, and color metadata
- **Service Types**: 15 technology types with complexity levels and duration estimates
- **Cluster Positioning**: Staggered 3-4-3 arrangement with axial spacing of 6 units

## Development Commands
```bash
# Development server (Vite)
npm run dev              # Starts dev server on http://localhost:5174

# Build and deployment
npm run build           # Production build with Vite
npm run preview         # Preview production build locally

# Code quality
npm run lint            # ESLint checking (when configured)
npm run type-check      # TypeScript compilation check
```

## Key Implementation Patterns

### Catalog System Usage
```typescript
// Load and validate CSV data
const catalog = CatalogService.buildCatalogFromCsv(serviceAreasCsv, serviceTypesCsv, statusesCsv);
const mappings = CatalogService.parseTemplateMapping(templateMapCsv);
const engagements = CatalogService.parseEngagementData(engagementDataCsv);

// Validate data integrity
const mappingErrors = CatalogService.validateTemplateMapping(mappings, catalog);
const engagementErrors = CatalogService.validateEngagementData(engagements, catalog);
```

### Honeycomb Positioning
```typescript
// Ten clusters in staggered 3-4-3 arrangement
const clusterPositions = [
  { id: 'H1', centerPosition: { q: -6, r: -6, s: 12 } },  // Top row
  { id: 'H2', centerPosition: { q: 0, r: -6, s: 6 } },
  { id: 'H3', centerPosition: { q: 6, r: -6, s: 0 } },
  // ... H4-H7 middle rows, H8-H10 bottom row
];

// Inner cells use fixed slot offsets (C1-C10)
const cellPosition = {
  q: cluster.centerPosition.q + CLUSTER_SLOT_OFFSETS[slotIndex].q,
  r: cluster.centerPosition.r + CLUSTER_SLOT_OFFSETS[slotIndex].r,
  s: -(q + r)  // Axial coordinate constraint
};
```

### Performance Optimizations
```typescript
// Memoized components for expensive renders
const HexCell = React.memo(({ cell, isHovered, onClick }) => { /* ... */ });

// Indexed lookups for O(1) engagement data access
const engagementMap = useMemo(() => {
  const map = new Map();
  engagementData.forEach(e => map.set(e.cellId, e));
  return map;
}, [engagementData]);
```

## Best Practices
- **CSV Structure**: Always include header row with exact column names as defined in catalog types
- **Validation First**: Run catalog validation before attempting to render visualization
- **Responsive Design**: Use MUI Grid system with xs/md/lg breakpoints for all layouts
- **Color Consistency**: Reference VISUAL_CONSTANTS and catalog colorHex values for theming
- **Memory Management**: Use React.memo and useMemo for components with frequent re-renders
- **Error Boundaries**: Wrap catalog operations in try-catch with user-friendly error messages

## Troubleshooting
- **Build Errors**: Ensure all CSV data follows exact schema; check TypeScript strict mode compliance
- **Layout Issues**: Verify Container maxWidth and Grid proportions; test on different screen sizes
- **Performance**: Check for unnecessary re-renders using React DevTools Profiler
- **Data Validation**: Use CatalogService validation methods to identify data quality issues
- **Coordinate System**: Validate axial coordinates satisfy q + r + s = 0 constraint
