
export const templates = {
    pageNoProps: (name) => `
  import React from 'react';
  
  const ${name}: React.FC = () => {
    return <></>;
  };
  
  export default ${name};
  `,
  
    pageWithProps: (name) => `
  import React from 'react';
  
  interface ${name}Props {
    title?: string;
    onClick?: () => void;
  }
  
  const ${name}: React.FC<${name}Props> = ({ title, onClick }) => {
    return <></>;
  };
  
  export default ${name};
  `,
  
    hookNoProps: (name) => `
  import { useState } from 'react';
  
  export const ${name} = () => {
    const [state, setState] = useState(null);
    return { state, setState };
  };
  `,
  
    hookWithProps: (name) => `
  import { useState } from 'react';
  
  interface ${name}Props {
    initialValue?: unknown;
  }
  
  export const ${name} = ({ initialValue }: ${name}Props) => {
    const [state, setState] = useState(initialValue);
    return { state, setState };
  };
  `,
  };