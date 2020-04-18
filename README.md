[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![CircleCI](https://circleci.com/gh/davidballester/grapher/tree/master.svg?style=svg)](https://circleci.com/gh/davidballester/grapher/tree/master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e682ebfd-e62e-4a58-a194-edac472f7f12/deploy-status)](https://app.netlify.com/sites/wizardly-minsky-4657d5/deploys)
[![Dependencies](https://david-dm.org/davidballester/grapher.svg)](https://david-dm.org/davidballester/grapher.svg)

# [Grapher](https://grapher.tech/)

Grapher is a graph editor. It's that simple!

[![grapher](assets/grapher-readme.png)](https://grapher.tech/)

Visit it now at:

[https://grapher.tech/](https://grapher.tech/)

## Setup

Setting up grapher locally is really simple.

Install dependencies:

```Bash
npm install
```

And run it

```Bash
npm start
```

## Deployment

There's an npm script to deploy to Netlify:

```
npm run deploy
```

It requires an env variable, `NETLIFY_SITE_ID` set to the ID of the Netlify site to deploy to.

## Storage

Graphs are stored in your [browser's local storage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage). Because of that, it can be considered volatile, so be careful!

You can download a JSON version of your graph that you can then use to import the graph again into grapher. Use that feature as backup method.

## Firebase

You can log in with your Google account and store your graphs in the cloud to have them available everywhere!

---

<small>This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).</small>

<small>UI components by [Material-UI](https://material-ui.com/).</small>

<small>Grammar by [Ohm](https://ohmlang.github.io/).</small>

<small>Forms by [Formik](https://jaredpalmer.com/formik/).</small>

<small>Canvas by [react-force-graph](https://github.com/vasturiano/react-force-graph).</small>
