import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import HexCluster from '../components/common/HexCluster';
import { generateHexagonLayout } from '../utils/layoutUtils';
// Load demo cluster state mapping (created in demo-configs/sample-cluster-states.json)
import clusterStatesRaw from '../../demo-configs/sample-cluster-states.json';
const clusterStates: Record<string, string> = clusterStatesRaw as any;
import clusterTitleMapRaw from '../../demo-configs/cluster-title-map.json';
type ClusterTitleEntry = { label: string; defaultState?: string };
const clusterTitleMap: Record<string, ClusterTitleEntry> = clusterTitleMapRaw as any;

const CanvasPage: React.FC = () => {
  const canvasWidth = 2000;
  const canvasHeight = 1200;
  const clusterSize = 250;
  const innerCellSize = 58; // increased 20% from 40 -> 48
  const innerCellSpacing = 1.0; // Increase >1 to spread inner cells apart, <1 to tighten
  // Global inner-group offset: tweak this to move all inner-cell patterns inside their clusters
  const innerGroupOffset = { x: 88, y: 32 };

  const layoutConfig = {
    hexSize: clusterSize,
    gap: 250,
    rowGap: -160,
  canvasWidth: canvasWidth,
  canvasHeight: canvasHeight,
    layout: [2, 3, 2, 3], // Defines the number of hexagons in each row
  };

  const clusterPositions = generateHexagonLayout(layoutConfig);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Hexagon Clusters
      </Typography>
      <Box
        sx={{
          width: canvasWidth,
          height: canvasHeight,
          backgroundColor: 'aqua',
          border: '1px solid black',
          position: 'relative',
        }}
      >
        <svg width={canvasWidth} height={canvasHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
          {clusterPositions.map((cluster, index) => {
            const titleEntry = clusterTitleMap[cluster.id];
            const title = titleEntry?.label ?? `Cluster ${index + 1}`;
            const defaultState = (titleEntry?.defaultState as import('../types/catalog').HC_STATE_KEY) ?? (clusterStates[cluster.id] as import('../types/catalog').HC_STATE_KEY) ?? 'NOT_ENGAGED';
            return (
              <HexCluster
                key={cluster.id}
                id={cluster.id}
                cx={cluster.cx}
                cy={cluster.cy}
                size={clusterSize}
                innerCellSize={innerCellSize}
                innerCellSpacing={innerCellSpacing}
                innerGroupOffset={innerGroupOffset}
                title={title}
                titleFontSize={30}
                // forward demo state (falls back to NOT_ENGAGED)
                stateKey={defaultState}
              />
            );
          })}
        </svg>
      </Box>
    </Container>
  );
};

export default CanvasPage;
