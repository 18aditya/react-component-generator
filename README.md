# 🚀 react-component-generator

A simple **CLI tool** to quickly generate React **components and hooks** with optional props support.

👉 Perfect for **scaffolding** new pages or hooks in seconds—ideal for projects using **TypeScript, React, and a feature-based folder structure**.

---

## ✨ Features

* ✅ Generate **React components** (pages) and **custom hooks**
* ✅ Supports **props interfaces** (optional)
* ✅ Automatically creates:

  * `.tsx` file for the component
  * `.hook.ts` file for the hook
  * `index.ts` for clean exports
* ✅ **Custom templates** via `component-generator.config.js`
* ✅ Uses **interactive prompts** for a smooth developer experience

---

## 📦 Installation

```bash
npm install -g react-component-generator
```

Or use with `npx`:

```bash
npx react-component-generator
```

---

## 🛠 Usage

Run:

```bash
component-generator
```

You’ll be prompted to:

1️⃣ Enter the base name (e.g., `userProfile`)

2️⃣ Choose what to generate:

* Page only
* Hook only
* Both Page + Hook

3️⃣ Choose whether to generate **with props**.

---

## 📁 Output Example

### 1️⃣ You enter:

* **Base name:** `userProfile`
* **Generate:** `Both Page + Hook`
* **With props:** ✅ Yes

### 2️⃣ The CLI generates:

```
UserProfile/
├── index.ts
├── userProfile.hook.ts
└── userProfile.tsx
```

### 3️⃣ `userProfile.tsx` (Page with Props):

```tsx
import React from 'react';

interface UserProfileProps {
  title?: string;
  onClick?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ title, onClick }) => {
  return <></>;
};

export default UserProfile;
```

---

### 4️⃣ `userProfile.hook.ts` (Hook with Props):

```ts
import { useState } from 'react';

interface UseUserProfileProps {
  initialValue?: unknown;
}

export const useUserProfile = ({ initialValue }: UseUserProfileProps) => {
  const [state, setState] = useState(initialValue);
  return { state, setState };
};
```

---

## 🖌 Custom Templates

You can customize the templates by adding a `component-generator.config.js` file at your project root.

### Example:

```js
// component-generator.config.js

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
  // You can also override:
  // pageNoProps, hookNoProps, hookWithProps
};
```

---

## 💡 Why Use This?

* Save time creating repetitive boilerplate.
* Keep your codebase **consistent**.
* Supports **customization** out of the box.

---

## 🔗 License

MIT

---
