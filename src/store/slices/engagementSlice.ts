import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EngagementData, EngagementState as EngagementStateEnum } from '../../types/domain';

interface EngagementStoreState {
  data: Record<string, EngagementData[]>; // keyed by clientId
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  lastUpdate: string | null;
}

const initialState: EngagementStoreState = {
  data: {},
  connectionStatus: 'disconnected',
  lastUpdate: null
};

const engagementSlice = createSlice({
  name: 'engagement',
  initialState,
  reducers: {
    updateEngagementData: (state, action: PayloadAction<{
      clientId: string;
      data: EngagementData[];
    }>) => {
      state.data[action.payload.clientId] = action.payload.data;
      state.lastUpdate = new Date().toISOString();
    },
    
    updateSingleCellEngagement: (state, action: PayloadAction<{
      clientId: string;
      cellId: string;
      newState: EngagementStateEnum;
    }>) => {
      const clientData = state.data[action.payload.clientId] || [];
      const existingIndex = clientData.findIndex(d => d.cellId === action.payload.cellId);
      
      const updatedData: EngagementData = {
        cellId: action.payload.cellId,
        state: action.payload.newState,
        lastUpdated: new Date().toISOString()
      };
      
      if (existingIndex >= 0) {
        clientData[existingIndex] = updatedData;
      } else {
        clientData.push(updatedData);
      }
      
      state.data[action.payload.clientId] = clientData;
      state.lastUpdate = new Date().toISOString();
    },
    
    setConnectionStatus: (state, action: PayloadAction<'connected' | 'disconnected' | 'connecting'>) => {
      state.connectionStatus = action.payload;
    },
    
    clearEngagementData: (state, action: PayloadAction<string>) => {
      delete state.data[action.payload];
    }
  }
});

export const {
  updateEngagementData,
  updateSingleCellEngagement,
  setConnectionStatus,
  clearEngagementData
} = engagementSlice.actions;

export default engagementSlice.reducer;
