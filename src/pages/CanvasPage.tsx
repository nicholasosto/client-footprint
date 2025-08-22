import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import HexCluster from '../components/common/HexCluster';
import { generateHexagonLayout } from '../utils/layoutUtils';

const CanvasPage: React.FC = () => {
  const canvasWidth = 2000;
  const canvasHeight = 1200;
  const clusterSize = 250;
  const innerCellSize = 40;

  const layoutConfig = {
    hexSize: clusterSize,
    gap: 250,
    rowGap: -160,
    canvasWidth: canvasWidth,
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
          {clusterPositions.map((cluster, index) => (
            <HexCluster
              key={cluster.id}
              id={cluster.id}
              cx={cluster.cx}
              cy={cluster.cy}
              size={clusterSize}
              innerCellSize={innerCellSize}
              title={`Cluster ${index + 1}`}
            />
          ))}
        </svg>
      </Box>
    </Container>
  );
};

export default CanvasPage;
