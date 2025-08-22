import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HoneycombVisualization } from '../components/HoneycombVisualization/HoneycombVisualization';
import { TemplateService } from '../services/templateService';
import { setTemplate, setCurrentClient, setLoading, setError } from '../store/slices/templateSlice';
import { RootState } from '../store';
import { FootprintTemplate, EngagementData } from '../types/domain';
import { Grid, Paper } from '@mui/material';
import { EngagementSummaryTable } from '../components/common/EngagementSummaryTable';

export const ClientFootprintPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const dispatch = useDispatch();
  
  const { templates, loading, error } = useSelector((state: RootState) => state.templates);
  const { data: engagementData } = useSelector((state: RootState) => state.engagement);
  
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  
  const currentTemplate = clientId ? templates[clientId] : null;
  const currentEngagementData = clientId ? (engagementData[clientId] || []) : [];

  useEffect(() => {
    if (clientId) {
      dispatch(setCurrentClient(clientId));
      loadClientTemplate(clientId);
    }
  }, [clientId, dispatch]);

  const loadClientTemplate = async (clientId: string) => {
    try {
      dispatch(setLoading(true));
      const template = await TemplateService.loadTemplate(clientId);
      dispatch(setTemplate(template));
    } catch (err) {
      dispatch(setError(`Failed to load template for client: ${clientId}`));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId);
    console.log('Cell clicked:', cellId);
  };

  const handleCellHover = (cellId: string | null) => {
    console.log('Cell hovered:', cellId);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Loading...</h2>
        </div>
        <div>Loading client footprint...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Error</h2>
        </div>
        <div style={{ color: '#e74c3c' }}>{error}</div>
        <button 
          className="btn btn-primary" 
          onClick={() => clientId && loadClientTemplate(clientId)}
          style={{ marginTop: '1rem' }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!currentTemplate) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">No Template Found</h2>
        </div>
        <div>No template available for client: {clientId}</div>
      </div>
    );
  }

  return (
    <div className="client-footprint-page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            {clientId ? clientId.charAt(0).toUpperCase() + clientId.slice(1) : ''} - Service Engagement Footprint
          </h2>
          <div style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
            Last updated: {new Date(currentTemplate.metadata.generatedDate).toLocaleString()}
          </div>
        </div>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={4}>
            <EngagementSummaryTable />
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Paper elevation={1} sx={{ p: 2, minHeight: 600, height: '100%' }}>
              <HoneycombVisualization
                footprintTemplate={currentTemplate}
                engagementData={currentEngagementData}
                onCellClick={handleCellClick}
                onCellHover={handleCellHover}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>

      {selectedCell && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cell Details</h3>
          </div>
          <div>
            <strong>Selected Cell:</strong> {selectedCell}
            <br />
            <strong>Service Area:</strong> {
              currentTemplate.generatedCells.find(c => c.id === selectedCell)?.displayName
            }
            <br />
            <strong>Current State:</strong> {
              currentTemplate.generatedCells.find(c => c.id === selectedCell)?.state
            }
          </div>
        </div>
      )}
    </div>
  );
};
