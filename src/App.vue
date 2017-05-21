<template>
  <div id="app">
    <header>
      <h1>Jakub Svoboda</h1>
    </header>
    <hr>
    <nav>
      <ul>
        <li class="navButton"><router-link :to="'/'">Home</router-link></li>
        <li class="navButton"><router-link :to="'/works'">Works</router-link></li>
        <li class="navButton"><router-link :to="'/ask'">Ask me</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

html, body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Monaco', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header h1{
  font-size: 50px;
  font-family: 'Roboto';
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.navButton{
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
}
.navButton a{
  text-decoration: none
}
a {
  color: #42b983;
}
</style>
