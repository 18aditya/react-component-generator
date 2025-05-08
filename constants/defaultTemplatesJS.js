export const defaultTemplatesJS = {
  // Hook without props (JavaScript)
  'Hook.js': `
import { useState } from 'react';

export default function __HOOK_NAME__() {
  const [state, setState] = useState(null);
  return { state, setState };
}
  `,

  // Hook with props (JavaScript)
  'HookWithProps.js': `
import { useState } from 'react';

export default function __HOOK_NAME__(props) {
  const { initialValue = null } = props;
  const [state, setState] = useState(initialValue);
  return { state, setState };
}
  `,

  // Page without props (JavaScript)
  'Page.jsx': `
import React from 'react';

export default function __COMPONENT_NAME__() {
  return (<div>__COMPONENT_NAME__ Page</div>);
}
  `,

  // Page with props (JavaScript)
  'PageWithProps.jsx': `
import React from 'react';

export default function __COMPONENT_NAME__(props) {
  return (<div>{props.title}</div>);
}
  `,
};
