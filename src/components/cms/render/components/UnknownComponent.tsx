
import React from 'react';

interface UnknownComponentProps {
  type: string;
  props: Record<string, any>;
}

const UnknownComponent: React.FC<UnknownComponentProps> = ({ type, props }) => {
  return (
    <div className="p-4 border border-amber-300 bg-amber-50 rounded-md">
      <h3 className="text-amber-800 font-medium mb-2">Unknown Component: {type}</h3>
      <pre className="text-xs overflow-auto bg-white p-2 border border-amber-200 rounded">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};

export default UnknownComponent;
