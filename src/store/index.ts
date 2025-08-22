import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './slices/templateSlice';
import engagementReducer from './slices/engagementSlice';

export const store = configureStore({
  reducer: {
    templates: templateReducer,
    engagement: engagementReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
