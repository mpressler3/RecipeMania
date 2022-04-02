<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <img src="/dish.png">
      </div>
      
      <div class="title">
        <h1>Woofer Food Reviews</h1>
      </div>

      <div class="nav-bar">
        <router-link to="/">
          <div class="nav-item">
            <h3>Foods</h3>
          </div>
        </router-link>
        <router-link to="/">
          <div class="nav-item">
            <h3>Reviewers</h3>
          </div>
        </router-link>
        <router-link to="/admin">
          <div class="nav-item">
            <h3>Admin</h3>
          </div>
        </router-link>
      </div>
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
  flex-direction: row;
  padding: 10px 100px 0px 50px;
  background-color: #ffe65b;
  color: #300d0d;
}
.logo {
  width: 10%;
}
.logo img{
  width: 4em;
  height: auto;
  padding: 25px 0px 0px 0px;
}

.title {
  margin-top: 5px;
  width: 40%;
}

.title h1 {
  font-size: 30px;
}

.nav-bar {
  display: flex;
  width: 50%;
  justify-content: right;
  padding: 10px 130px 0px 100px;
}

.nav-item {
  flex-direction: row;
  color: #300d0d;
  padding: 0px 10px;
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