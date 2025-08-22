import React from 'react';

const AstrixContainer: React.FC = () => {
  const points = "100,10 150,40 150,90 100,120 50,90 50,40";
  return (
    <svg width="200" height="130">
      <polygon points={points} style={{ fill: 'lightblue', stroke: 'purple', strokeWidth: 2 }} />
    </svg>
  );
};

export default AstrixContainer;
