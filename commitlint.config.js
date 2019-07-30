module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // prettier-ignore
    'scope-enum': [
      2,
      'always',
      [
        'import',
        'text',
        'list',
        'new',
        'nodes',
        'links',
        'graph',
      ],
    ]
  },
};
