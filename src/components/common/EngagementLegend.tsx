import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { VISUAL_CONSTANTS } from '../../utils/constants';
import { HexMath } from '../../utils/hexMath';

type LegendItem = {
  label: string;
  color: string;
};

const legendItems: LegendItem[] = [
  { label: 'Not engaged with client', color: VISUAL_CONSTANTS.COLORS.NOT_ENGAGED },
  { label: 'Currently engaged with client', color: VISUAL_CONSTANTS.COLORS.CURRENTLY_ENGAGED },
  { label: 'Actively pursuing opportunities', color: VISUAL_CONSTANTS.COLORS.ACTIVELY_PURSUING }
];

const HexIcon: React.FC<{ fill: string }> = ({ fill }) => {
  const center = { x: 16, y: 16 };
  const size = 10; // small icon
  const d = HexMath.generateHexPath(center, size);
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" aria-hidden>
      <path d={d} fill={fill} stroke="#333" strokeWidth={1.5} />
    </svg>
  );
};

export const EngagementLegend: React.FC = () => {
  return (
    <Box sx={{ py: 1 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="center">
        {legendItems.map(item => (
          <Stack key={item.label} direction="row" spacing={1} alignItems="center">
            <HexIcon fill={item.color} />
            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default EngagementLegend;
