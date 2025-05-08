export default function stringUtils() {
  function toPascalCase(str) {
    return str.replace(/(^\w|[^\w]\w)/g, (match) =>
      match.replace(/[^\w]/, "").toUpperCase()
    );
  }

  function toCamelCase(str) {
    const pascal = toPascalCase(str);
    return pascal ? pascal.charAt(0).toLowerCase() + pascal.slice(1) : '';
  }

  function getFinalHookName(baseName) {
    const pascal = toPascalCase(baseName);
    return `use${pascal}`;
  }

  return {
    toPascalCase,
    toCamelCase,
    getFinalHookName,
  };
}
