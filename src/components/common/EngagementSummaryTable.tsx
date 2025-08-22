import React from 'react';
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { EngagementState, ServiceAreaType } from '../../types/domain';
import { ENGAGEMENT_STATE_CONFIG, SERVICE_AREA_CONFIG } from '../../utils/constants';

type Row = {
  area: ServiceAreaType;
  status: EngagementState;
  owner?: string;
};

const PLACEHOLDER_ROWS: Row[] = [
  { area: ServiceAreaType.ELN, status: EngagementState.CURRENTLY_ENGAGED, owner: 'Core Lab' },
  { area: ServiceAreaType.LIMS, status: EngagementState.ACTIVELY_PURSUING, owner: 'Ops' },
  { area: ServiceAreaType.SDMS, status: EngagementState.NOT_ENGAGED, owner: 'R&D' },
  { area: ServiceAreaType.CDS, status: EngagementState.CURRENTLY_ENGAGED, owner: 'Clinical' },
  { area: ServiceAreaType.BI, status: EngagementState.ACTIVELY_PURSUING, owner: 'Analytics' },
  { area: ServiceAreaType.ODM, status: EngagementState.NOT_ENGAGED, owner: 'IT' },
  { area: ServiceAreaType.CM, status: EngagementState.CURRENTLY_ENGAGED, owner: 'QA' },
];

export interface EngagementSummaryTableProps {
  rows?: Row[];
  title?: string;
}

export const EngagementSummaryTable: React.FC<EngagementSummaryTableProps> = ({
  rows = PLACEHOLDER_ROWS,
  title = 'Engagement Summary',
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <TableContainer component={Paper} elevation={1}>
        <Table size="small" aria-label="engagement summary table">
          <TableHead>
            <TableRow>
              <TableCell>Service Area</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const areaMeta = SERVICE_AREA_CONFIG[row.area];
              const stateMeta = ENGAGEMENT_STATE_CONFIG[row.status];
              return (
                <TableRow key={row.area} hover>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{areaMeta?.displayName ?? row.area}</TableCell>
                  <TableCell width={150}>
                    <Chip
                      label={stateMeta.displayName}
                      size="small"
                      variant="filled"
                      sx={{
                        bgcolor: stateMeta.color,
                        color: '#111',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{row.owner ?? '-'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EngagementSummaryTable;
