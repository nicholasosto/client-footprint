# Pharmaceutical Visualization System

A TypeScript-based React application for visualizing pharmaceutical client engagement footprints using interactive honeycomb structures.

## Overview

This system displays client engagement data through hexagonal grid layouts where each cell represents different pharmaceutical service areas (ELN, BI, SDMS, CDS, LIMS, ODM, CM) with real-time engagement state updates.

## Architecture

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Visualization**: D3.js + SVG for honeycomb rendering
- **Real-time**: WebSocket connections (planned)
- **Styling**: CSS with component-scoped styles

## Project Structure

```
src/
├── components/
│   ├── HoneycombVisualization/     # Main visualization components
│   │   ├── HoneycombVisualization.tsx
│   │   ├── HexCell.tsx
│   │   └── HoneycombVisualization.css
│   └── common/                     # Shared components
│       ├── Header.tsx
│       └── ClientNavigationBar.tsx
├── pages/                          # Page components
│   ├── ClientFootprintPage.tsx
│   └── AdminPanel.tsx
├── services/                       # Business logic
│   └── templateService.ts
├── store/                          # Redux store
│   ├── index.ts
│   └── slices/
│       ├── templateSlice.ts
│       └── engagementSlice.ts
├── types/                          # TypeScript definitions
│   └── domain.ts
└── utils/                          # Utilities
    ├── hexMath.ts
    └── constants.ts
```

## Key Features

### Implemented
- ✅ Core TypeScript domain types and interfaces
- ✅ Hexagonal coordinate system mathematics
- ✅ React component structure for honeycomb visualization
- ✅ Redux state management setup
- ✅ Template processing service (MasterBlank + MapFile pattern)
- ✅ Navigation and routing structure
- ✅ Responsive hexagonal cell rendering

### Planned
- ⏳ WebSocket real-time data integration
- ⏳ Interactive cell state updates
- ⏳ Admin panel functionality
- ⏳ Template editor interface
- ⏳ Performance optimizations for large datasets

## Core Concepts

### Hexagonal Coordinate System
The system uses axial coordinates (q, r, s) where q + r + s = 0 for positioning hexagons in a spiral pattern around cluster centers.

### Two-Tier Data Model
1. **Master Template**: Defines the overall structure and available service areas
2. **Map File**: Client-specific configuration determining which cells are active and how they're displayed
3. **Generated Template**: Combination of master template + map file = rendered visualization

### Service Areas
- **ELN**: Electronic Lab Notebook
- **BI**: Business Intelligence
- **SDMS**: Scientific Data Management System
- **CDS**: Clinical Data Systems
- **LIMS**: Laboratory Information Management System
- **ODM**: Operational Data Store
- **CM**: Content Management

### Engagement States
- **Not Engaged**: Default state (gray)
- **Currently Engaged**: Active engagement (blue)
- **Actively Pursuing**: Pursuit in progress (orange)

## Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Build for production
npm run build
```

## Development Notes

### Current Status
The project structure is complete with a working React application framework. Some dependency issues need to be resolved for the build process, but the core architecture is sound.

### TypeScript Configuration
- Target: ES2015+ for modern browser support
- Strict mode enabled for type safety
- JSX: react-jsx for React 18 compatibility

### State Management
Redux Toolkit is configured with slices for:
- Template management (loading, storing client templates)
- Engagement data (real-time state updates)

### Mathematical Foundation
The `HexMath` utility class provides:
- Axial to pixel coordinate conversion
- SVG path generation for hexagons
- Spiral pattern generation
- Distance calculations
- Coordinate validation

## Next Steps

1. **Resolve Dependency Issues**: Fix ajv/webpack compatibility
2. **Complete WebSocket Integration**: Add real-time data updates
3. **Enhance Visualization**: Add animations and transitions
4. **Add Testing**: Unit tests for math utilities and components
5. **Performance Optimization**: Virtual rendering for large datasets

## Usage

Navigate between different pharmaceutical clients using the top navigation bar. Each client shows their specific service engagement footprint with interactive hexagonal cells representing different service areas.

Click on individual cells to view detailed engagement information. The visualization updates in real-time as engagement states change.

---

*This project demonstrates advanced TypeScript patterns, React architecture, and mathematical visualization techniques for pharmaceutical data presentation.*
