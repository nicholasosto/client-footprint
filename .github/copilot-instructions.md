<!-- TypeScript Pharmaceutical Visualization System Instructions -->

# Project: Pharmaceutical Operations Visualization System

## Overview
This is a TypeScript-based React application for visualizing pharmaceutical client engagement footprints using interactive honeycomb structures. The system displays service areas (ELN, BI, SDMS, CDS, LIMS, ODM, CM) in hexagonal grids with real-time engagement state updates.

## Architecture
- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Visualization**: D3.js + SVG for honeycomb rendering
- **Real-time**: WebSocket connections
- **Styling**: Styled Components
- **Testing**: Jest + React Testing Library

## Key Concepts
- **Honeycomb Structure**: Hexagonal grid layout with nested cells
- **Two-Tier Data Model**: Static templates + Dynamic data = Live visualization
- **Service Areas**: ELN, BI, SDMS, CDS, LIMS, ODM, CM plus consulting categories
- **Engagement States**: Not engaged, Currently engaged, Actively pursuing (color-coded)

## Development Guidelines
- Use strict TypeScript with comprehensive type definitions
- Implement hexagonal coordinate system for positioning
- Follow Redux Toolkit patterns for state management
- Use React.memo, useMemo, useCallback for performance
- Write unit tests for all utility functions
- Prefer functional programming patterns

## Core Components
- `HoneycombVisualization`: Main visualization engine
- `HexCell`: Individual hexagonal cell component
- `TemplateService`: Business logic for template processing
- `WebSocketService`: Real-time data integration
- `HexMath`: Mathematical utilities for hexagonal positioning

## Progress Tracking
- [x] Verify copilot-instructions.md file creation
- [x] Clarify Project Requirements 
- [x] Scaffold the Project
- [x] Customize the Project
- [ ] Install Required Extensions
- [x] Compile the Project (with dependency issues noted)
- [ ] Create and Run Task
- [ ] Launch the Project
- [x] Ensure Documentation is Complete

## Current Status
The TypeScript pharmaceutical visualization system has been successfully scaffolded with:

### ✅ Completed Components
- Complete project structure with React + TypeScript + Redux
- Core domain types and interfaces for pharmaceutical data
- Hexagonal coordinate system mathematics
- Redux state management with template and engagement slices
- React components for honeycomb visualization
- SVG-based hexagonal cell rendering
- Client navigation and routing structure
- Template processing service implementing MasterBlank + MapFile pattern

### ⚠️ Known Issues
- Dependency conflicts with ajv package affecting build/start
- Some TypeScript strict mode warnings to address
- WebSocket integration not yet implemented
- Real-time data updates pending

### 🎯 Architecture Highlights
- Two-tier data model: Static templates + Dynamic engagement data
- Axial coordinate system for hexagonal positioning
- Service areas: ELN, BI, SDMS, CDS, LIMS, ODM, CM
- Engagement states: Not engaged, Currently engaged, Actively pursuing
- Scalable component architecture with clear separation of concerns
