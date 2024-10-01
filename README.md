# Plateaux aux conjurés

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

Create a file called `.env.development.local` with the following contents:
```text
VITE_FIREBASE_APPCHECK_DEBUG_TOKEN=<ask me for it>
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Lint

```sh
npm run type-check
```

### Deploy functions

```sh
cd functions && npm run deploy
```