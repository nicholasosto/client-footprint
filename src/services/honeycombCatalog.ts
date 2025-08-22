import { HoneycombStateCatalog } from '../types/catalog';

// Default honeycomb visual styles. Colors approximated from development-context/full-page-example.PNG
export const DEFAULT_HONEYCOMB_STATE_CATALOG: HoneycombStateCatalog = {
  ENGAGED: {
    key: 'ENGAGED',
    label: 'Engaged',
    backgroundColor: '#2E7D32', // deep green
    textColor: '#FFFFFF',
    borderColor: '#1B5E20',
    isActive: true,
  },
  NOT_ENGAGED: {
    key: 'NOT_ENGAGED',
    label: 'Not Engaged',
    backgroundColor: '#E0E0E0', // light gray
    textColor: '#000000',
    borderColor: '#9E9E9E',
    isActive: true,
  },
  ACTIVE_PERSUAL: {
    key: 'ACTIVE_PERSUAL',
    label: 'Actively Pursuing',
    backgroundColor: '#0277BD', // blue
    textColor: '#FFFFFF',
    borderColor: '#01579B',
    isActive: true,
  },
};

export const getHoneycombStateMeta = (key: keyof HoneycombStateCatalog) => {
  return DEFAULT_HONEYCOMB_STATE_CATALOG[key];
};

export default DEFAULT_HONEYCOMB_STATE_CATALOG;
