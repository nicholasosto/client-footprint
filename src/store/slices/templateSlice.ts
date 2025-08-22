import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FootprintTemplate, CellVisualProperties } from '../../types/domain';

interface TemplateState {
  templates: Record<string, FootprintTemplate>;
  currentClientId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TemplateState = {
  templates: {},
  currentClientId: null,
  loading: false,
  error: null
};

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<FootprintTemplate>) => {
      state.templates[action.payload.clientId] = action.payload;
      state.error = null;
    },
    
    setCurrentClient: (state, action: PayloadAction<string>) => {
      state.currentClientId = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    updateCellProperties: (state, action: PayloadAction<{
      clientId: string;
      cellId: string;
      properties: Partial<CellVisualProperties>;
    }>) => {
      const template = state.templates[action.payload.clientId];
      if (template) {
        const cell = template.generatedCells.find(c => c.id === action.payload.cellId);
        if (cell) {
          cell.visualProperties = { 
            ...cell.visualProperties, 
            ...action.payload.properties 
          };
        }
      }
    },
    
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setTemplate,
  setCurrentClient,
  setLoading,
  setError,
  updateCellProperties,
  clearError
} = templateSlice.actions;

export default templateSlice.reducer;
