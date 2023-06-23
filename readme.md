# babel-plugin-react-unlocalized

A [Babel](http://babeljs.io) plugin that shouts when you have unlocalized strings in your React codebase.

Compatible with any i18n library which uses function syntax eg `t('string')`. It won't work with JSX syntax libraries eg `<Trans>string</Trans>`.

## Setup

```
npm install --save-dev babel-plugin-react-unlocalized
```

or

```
yarn add --dev babel-plugin-react-unlocalized
```

Add the plugin to your config:

```json
{
  "plugins": [
    [
      "babel-plugin-react-unlocalized",
      {
        "jsxAttributes": [
          "label",
          "aria-label",
          "heading",
          "description",
          "body"
        ]
      }
    ]
  ]
}
```

Note: the plugin attempts to discover untranslated child strings. If your codebase has a convention of displaying strings passed via component attributes, add them to `jsxAttributes` array above.
