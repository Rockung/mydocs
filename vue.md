# Learning Vue

## Preparation

### Install vue-cli

You can go to [npmjs.org](www.npmjs.org) to search package @vue-cli,  and install as a global tool.

```bash
npm install @vue-cli -g
```

### Create a project

Use the command line tool to generate a starting project,  you'll be asked some questions.

```bash
vue create learning-vue
```

### Run the project

To run the project, as usual, go to the project directory and install required packages, and then run.

```bash
cd learning-vue
npm install
npm run serve
```

## First application

### Define the root component

`src/App.vue`

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    message: String,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### Mount the root component

`src/main.js`

```javascript
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

new Vue({
  render: h => {
    return h(App, {
      props: {
        message: 'Welcome to Vue',
      }
    })
  },
}).$mount('#app')
```

### Factor into a component

`src/components/Welcome.vue`

```vue
<template>
  <div>
  {{message}}
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: { // define the properties
    message: String,
  }
}
</script>

<style scoped>
</style>
```

### Use the component

`src/App.vue`

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Welcome message="Welcome to Vue" />
  </div>
</template>

<script>
import Welcome from './components/Welcome'

export default {
  name: 'App',
  components: {
    Welcome,
  }
}
</script>

<style>
...
</style>
```

## Application configuration 

### Configure aliases

vue-cli has configured the alias for @ which refers to src/.

`vue.config.js`

```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
      }
    }
  }
}
```

Use a alias to import a component.

```javascript
import Welcome from 'component/Welcome'
```

### Configure style of editor

`.editorconfig`

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

### Structure of the application



## Tools

### Plugins for vscode



### Browser DevTools

vue-devtools

