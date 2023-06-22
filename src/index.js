const defaultJsxAttributes = ["aria-label", "label"];

const format = (value) =>
  value
    .trim()
    .replace(/ +(?= )/g, "")
    .replace(/\n/g, "");

const test = (value) => value.length > 0 && !/^[^A-Za-z]+$/.test(value);

const print = (path, value) => console.log(`[${path}]: ${value}`);

const createPath = (filepath, line) => `${filepath}:${line}`;

export default () => {
  return {
    visitor: {
      JSXText(path, state) {
        const value = format(path.node.value || "");
        if (!test(value)) {
          return;
        }
        print(createPath(state.filename, path.node.loc.start.line), value);
      },
      JSXAttribute(path, state) {
        const jsxAttributes = state.opts.jsxAttributes || defaultJsxAttributes;
        if (!jsxAttributes.includes(path.node.name.name)) {
          return;
        }
        const value = format(path.node.value.value || "");
        if (!test(value)) {
          return;
        }

        print(createPath(state.filename, path.node.loc.start.line), value);
      },
    },
  };
};
