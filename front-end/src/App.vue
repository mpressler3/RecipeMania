<template>
  <div id="app">
    <div class="header">
      <router-link to="/">
        <div class="logo">
          <img src="/dish.png">
        </div>
      </router-link>
      <h1>Recipe Mania</h1>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <a href="https://github.com/mpressler3/RecipeMania.git">GitHub</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #ffe65b;
  color: #300d0d;
}
.logo img{
  height: 2em;
  padding: 25px 20px 0px 0px;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

/*Content*/
.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #ffe65b;
  font-size: 18px;
}

.footer a {
  color: #000;
}
</style>
