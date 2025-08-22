Demo configs for the Honeycomb visualization

Files included:

- `honeycomb-state-catalog.json` / `honeycomb-state-catalog.yaml`:
  A small example catalog mapping the three HC_STATE_KEY values (ENGAGED, NOT_ENGAGED, ACTIVE_PERSUAL) to visual metadata (backgroundColor, textColor, borderColor, label).

- `sample-cluster-states.json`:
  Shows a sample mapping of cluster IDs (like `r0-h0`) to a `HC_STATE_KEY`. Use this to quickly apply different states to clusters in the Canvas demo.

How to use

- Programmatic: import the JSON/YAML and map cluster IDs to state keys, then pass the matching `stateKey` prop into `HexCluster` or `Hexagon`.

  Example (pseudo):

  const catalog = require('./demo-configs/honeycomb-state-catalog.json');
  const clusterStates = require('./demo-configs/sample-cluster-states.json');

  <HexCluster ... stateKey={clusterStates[cluster.id]} />

- Manual: open `demo-configs/sample-cluster-states.json` and edit values then refresh the Canvas preview.

Notes

- Colors here are approximations taken from the project example imagery; feel free to tweak the hex values to match your brand or design system.
