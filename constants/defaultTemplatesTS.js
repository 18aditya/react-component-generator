export const defaultTemplatesTS = {
  // Hook without props (TypeScript)
  'Hook.ts': `
import { useState } from 'react';

export default function __HOOK_NAME__() {
  const [state, setState] = useState(null);
  return { state, setState };
}
  `,

  // Hook with props (TypeScript)
  'HookWithProps.ts': `
import { useState } from 'react';

interface __HOOK_NAME__Props {
  initialValue?: any;
}

export default function __HOOK_NAME__(props: __HOOK_NAME__Props) {
  const { initialValue = null } = props;
  const [state, setState] = useState(initialValue);
  return { state, setState };
}
  `,

  // Page without props (TypeScript)
  'Page.tsx': `
import React from 'react';

export default function __COMPONENT_NAME__() {
  return (<div>__COMPONENT_NAME__ Page</div>);
}
  `,

  // Page with props (TypeScript)
  'PageWithProps.tsx': `
import React from 'react';

interface __COMPONENT_NAME__Props {
  title: string;
}

export default function __COMPONENT_NAME__(props: __COMPONENT_NAME__Props) {
  return (<div>{props.title}</div>);
}
  `,
};
