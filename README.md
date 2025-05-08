# 🚀 Component Generator CLI

This is a simple Node.js CLI tool to scaffold **React components and hooks** with customizable templates.

## ✨ Features

- Generate **Page** components, **Hooks**, or **both**.
- Supports **TypeScript** and **JavaScript**.
- Prompts for:
  - Component name
  - What to generate (Page, Hook, or Both)
  - Whether to generate with props
- Customizable templates.
- Automatically sets up default templates if none are found.

## 📂 Project Structure

By default, the CLI:

- Locates the **template folder** inside:
  
  ```
  <project-root>/src/components/template
  ```

- Creates generated files **in your current working directory** (where you run the command).

Example:

```
my-app/
├── src/
│   └── components/
│       └── template/      ← 📁 Templates live here
├── pages/
├── some-folder/           ← 🛠️ You run the CLI here; generated files appear here
```

---

## ⚙️ Usage

```bash
node component-generator.js
```

You will be prompted to:

- Enter the base name (e.g., `userProfile`)
- Select what to generate (Page, Hook, Both)
- Confirm if you want props

### 🖥️ Command-line options

```bash
node component-generator.js --template your-template-folder
```

| Option       | Description                                              |
|--------------|----------------------------------------------------------|
| `--template` | Specify a custom template folder (default: `template`)   |

### 🆘 Help

```bash
node component-generator.js --help
```

---

## ⚡ Example

```bash
node component-generator.js
```

**Prompts:**

- Base name: `userProfile`
- What to generate: `Both Page + Hook`
- Generate with props: `Yes`

**Creates:**

```
UserProfile/
├── index.tsx
├── userProfile.tsx
└── userProfile.hook.tsx
```

---

## 🛠️ Template System

- The generator **looks for templates inside your components folder**.
- Default template folder: 

```
<project-root>/src/components/template/
```

- Supported template files:
  - `Page.tsx`
  - `PageWithProps.tsx`
  - `Hook.ts`
  - `HookWithProps.ts`
  - (Or `.js/.jsx` for JavaScript)

If no templates are found, it **auto-creates default templates** so you can customize them.

---

## 📝 Configuration

Add a `component-generator.config.json` file in the **root of your project** (next to `package.json`):

```json
{
  "templatePath": "my-custom-templates",
  "defaultLanguage": "ts"
}
```

- `templatePath`: Custom template folder (relative to `/src/components` by default).
- `defaultLanguage`: `"ts"` or `"js"`.

---

## 🗂️ How It Works

1. **Finds the project root** (searches up until it finds `package.json`).
2. **Locates the components folder** (`src/components`).
3. **Uses your configured template folder** (or `template` by default).
4. **Scaffolds files in your current working directory.**

---

## ❗ Notes

- Templates are located relative to your **components folder**.
- Generated files always go into **the current directory where you run the command** (this lets you scaffold inside any folder you want).
- If the `src` or `components` folders are missing, it will warn you.

---
