import React from 'react';

export const AdminPanel: React.FC = () => {
  return (
    <div className="admin-panel">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Administration Panel</h2>
        </div>
        <div>
          <p>Admin panel for managing templates and configurations.</p>
          <p>Features coming soon:</p>
          <ul>
            <li>Master template editor</li>
            <li>Client map file management</li>
            <li>Engagement data configuration</li>
            <li>User management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
