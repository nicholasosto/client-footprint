import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const ClientNavigationBar: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  
  const clients = [
    { id: 'regeneron', name: 'Regeneron' },
    { id: 'pfizer', name: 'Pfizer' },
    { id: 'novartis', name: 'Novartis' },
    { id: 'roche', name: 'Roche' },
    { id: 'gsk', name: 'GSK' }
  ];

  return (
    <nav className="client-nav">
      <ul className="client-nav-list">
        {clients.map(client => (
          <li key={client.id}>
            <Link 
              to={`/client/${client.id}`}
              className={`client-nav-item ${clientId === client.id ? 'active' : ''}`}
            >
              {client.name}
            </Link>
          </li>
        ))}
        <li>
          <Link 
            to="/admin"
            className="client-nav-item"
          >
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};
