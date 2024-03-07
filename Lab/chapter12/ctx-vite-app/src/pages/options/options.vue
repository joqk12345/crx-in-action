<script
  lang="ts"
  setup
>
</script>

<template>
  <div id="wrapper">
    <header>
      <h1>内容转语音</h1>
      <span>v1.0.0</span>
    </header>
    <nav>
      <div class="inner">
        <ul>
          <li><router-link to="/settings">设置</router-link></li>
          <li><router-link to="/information">账号信息</router-link></li>
          <li><router-link to="/price">价格</router-link></li>
          <li><router-link to="/about">关于</router-link></li>
        </ul>
      </div>
    </nav>
    <article>
      <div class="inner">
        <router-view></router-view>
      </div>
    </article>
  </div>
</template>

<style lang="stylus">
#wrapper
  width: 960px
  margin: 0 auto
  border: 0px solid

header
  // background: #5EDFD6

header h1
  font-family: 'Droid Sans'
  font-weight: 400
  font-size: 2em
  letter-spacing: -0.05em
  color: #114BA3
  padding: 0 0 5px 10px

header span
  padding: 0 0 5px 10px
  font-size: 0.7em
  color: gray

nav
  width: 250px
  float: left
  box-sizing: border-box
  font-size: 1.4em
  font-weight: 500

nav li
  list-style-type: none
  margin: 5px

nav li a
  text-decoration: none
  color: inherit

nav li a:focus
  color: #114BA3

article
  box-sizing: border-box
  width: 600px
  float: left
  // background: #ffed53
  padding: 5px 10px

article .inner
  margin: 5px
  padding: 5px
  // border: 2px solid red
  font-weight: 450

</style>
