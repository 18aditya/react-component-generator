## 🚀 Component Generator CLI

A simple CLI tool to generate React components & hooks **with optional props**, supporting **TypeScript** and **JavaScript**.

---

### 📦 Features

* ✅ Generate **Page components** and/or **Hooks**
* ✅ Supports **TypeScript (.ts/.tsx)** and **JavaScript (.js/.jsx)**
* ✅ Auto-creates default templates if missing
* ✅ Fully customizable template files
* ✅ Interactive CLI prompts
* ✅ `--help` command for quick usage info

---

### 🛠 Usage

```bash
# Basic usage
node component-generator.js

# Using a custom template folder
node component-generator.js --template my-templates

# Show help
node component-generator.js --help
```

---

### 👨‍💻 What It Does

* **Step 1:** Prompts you to choose between TypeScript or JavaScript (if no template folder exists yet).
* **Step 2:** Asks for the **base name** of your component (e.g., `userProfile`).
* **Step 3:** Lets you pick what to generate:

  * Page only
  * Hook only
  * Both Page + Hook
* **Step 4:** Optionally include **props** in your component/hook.

It will then:

* ✅ Create a folder named `UserProfile/` (PascalCase)
* ✅ Generate:

  * **Page component** (e.g., `userProfile.tsx` + `index.ts`)
  * **Hook** (e.g., `userProfile.hook.ts`)
* ✅ Use templates from the specified folder (or default ones)

---

### 📁 Template System

When you run the CLI **for the first time**, it creates a default template folder (if not already present).

Example structure:

```
template/
├── Hook.ts
├── HookWithProps.ts
├── Page.tsx
├── PageWithProps.tsx
```

**Or, for JS:**

```
template/
├── Hook.js
├── HookWithProps.js
├── Page.jsx
├── PageWithProps.jsx
```

---

#### 🔑 Available Placeholders:

| Placeholder          | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `__COMPONENT_NAME__` | Replaced with the PascalCase name of the component/page.    |
| `__HOOK_NAME__`      | Replaced with the final hook name (e.g., `useUserProfile`). |

---

### ✨ Example

If you run:

```bash
node component-generator.js
```

and answer:

* Base name: `userProfile`
* Generate: `Both`
* With props: `Yes`

You'll get:

```
UserProfile/
├── userProfile.tsx
├── userProfile.hook.ts
├── index.ts
```

🚀 **With props support** based on your templates!

---

### 🆘 Help

To see help info at any time:

```bash
node component-generator.js --help
```

---

### 💡 Custom Templates

You can customize your own templates in the `template/` folder (or whatever folder you specify with `--template`). The CLI **auto-loads and replaces placeholders** based on your file naming:

| Template Filename       | Purpose                          |
| ----------------------- | -------------------------------- |
| `Page.tsx` / `Page.jsx` | Page component **without props** |
| `PageWithProps.tsx`     | Page component **with props**    |
| `Hook.ts` / `Hook.js`   | Hook **without props**           |
| `HookWithProps.ts`      | Hook **with props**              |

---
