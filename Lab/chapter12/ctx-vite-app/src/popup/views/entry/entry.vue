<template>
  <div class="M-entry">
    <router-view />
  </div>
</template>

<style scoped lang="stylus">
.M-entry
    display: flex
    flex-direction: column
    height: 100%
    .main-container
        position: relative
        flex: 1
</style>
