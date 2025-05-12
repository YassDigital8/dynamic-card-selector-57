
import React from 'react';

interface TextComponentProps {
  content: string;
  alignment?: 'left' | 'center' | 'right';
}

const TextComponent: React.FC<TextComponentProps> = ({
  content,
  alignment = 'left'
}) => {
  const textAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  return (
    <div className={`prose max-w-none ${textAlign[alignment]}`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default TextComponent;
