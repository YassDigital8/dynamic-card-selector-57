
import React from 'react';

interface SectionItem {
  title: string;
  description: string;
}

interface SectionComponentProps {
  title: string;
  columns: number;
  items: SectionItem[];
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  columns = 3,
  items = []
}) => {
  // Map columns number to grid columns class
  const columnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns as 1 | 2 | 3 | 4] || 'grid-cols-1 md:grid-cols-3';
  
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      
      <div className={`grid ${columnsClass} gap-6`}>
        {items.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionComponent;
