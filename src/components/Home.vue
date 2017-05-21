<template>
  <div id="intro">
    <h1>Welcome to my CV</h1>
    <p>
      My name is Jakub and this is my introductory page. <br>
      Take a look at my work in the industry and <br>
      please ask any and all questions through the email form.
    </p>

  </div>
    
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

a {
    color: #42b983;
}
</style>
