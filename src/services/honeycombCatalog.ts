import { HoneycombStateCatalog, HC_STATE_KEY, HoneycombStateMeta } from '../types/catalog';

// Default honeycomb visual styles. Colors approximated from development-context/full-page-example.PNG
export const DEFAULT_HONEYCOMB_STATE_CATALOG: HoneycombStateCatalog = {
  CLIENT_AREA: {
    key: 'CLIENT_AREA',
    label: 'Client Area',
    backgroundColor: '#82e6ffff', // deep green
    textColor: '#000000ff',
    borderColor: '#1f07fdff',
    isActive: true,
  },
  NON_CLIENT_AREA: {
    key: 'NON_CLIENT_AREA',
    label: 'Non Client Area',
    backgroundColor: '#E0E0E0', // light gray
    textColor: '#000000',
    borderColor: '#9E9E9E',
    isActive: true,
  },
  ENGAGED_CLIENT_AREA: {
    key: 'ENGAGED_CLIENT_AREA',
    label: 'Engaged Client Area',
    backgroundColor: '#0277BD', // blue
    textColor: '#FFFFFF',
    borderColor: '#01579B',
    isActive: true,
  },
};

// Support legacy keys that used to be present in older config files.
// Legacy set: ENGAGED, NOT_ENGAGED, ACTIVE_PERSUAL
const LEGACY_TO_CURRENT: Record<string, HC_STATE_KEY> = {
  ENGAGED: 'CLIENT_AREA',
  NOT_ENGAGED: 'NON_CLIENT_AREA',
  ACTIVE_PERSUAL: 'ENGAGED_CLIENT_AREA',
};

export const getHoneycombStateMeta = (key?: string): HoneycombStateMeta | undefined => {
  if (!key) return undefined;
  const normalizedKey = (key as string).toString();
  // if it's already a current key, return directly
  if ((DEFAULT_HONEYCOMB_STATE_CATALOG as any)[normalizedKey]) {
    return (DEFAULT_HONEYCOMB_STATE_CATALOG as any)[normalizedKey];
  }
  // try legacy mapping
  const mapped = LEGACY_TO_CURRENT[normalizedKey];
  if (mapped && (DEFAULT_HONEYCOMB_STATE_CATALOG as any)[mapped]) {
    return (DEFAULT_HONEYCOMB_STATE_CATALOG as any)[mapped];
  }
  return undefined;
};

export default DEFAULT_HONEYCOMB_STATE_CATALOG;
