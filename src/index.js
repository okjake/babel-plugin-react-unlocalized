const defaultJsxAttributes = ["aria-label", "label"];

function format(value) {
  return value
    .trim()
    .replace(/ +(?= )/g, "")
    .replace(/\n/g, "");
}

function test(value) {
  return value.length > 0 && !/^[^A-Za-z]+$/.test(value);
}

function print(path, value) {
  console.log(`[${path}]: ${value}`);
}

function createPath(filepath, line) {
  return `${filepath}:${line}`;
}

module.exports = function detectUnlocalized() {
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
