export const customTemplates = {
    pageWithProps: (name) => `
      import React from 'react';
  
      interface ${name}Props {
        customProp: string;
      }
  
      const ${name}: React.FC<${name}Props> = ({ customProp }) => {
        return <div>{customProp}</div>;
      };
  
      export default ${name};
    `,
    // Users can optionally override other templates:
    // pageNoProps, hookNoProps, hookWithProps...
  };
  