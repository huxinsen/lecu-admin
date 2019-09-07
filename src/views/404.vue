<template>
  <div class="not-found">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: '抱歉，找不到你想要的页面...',
    }
  },
}
</script>

<style>
.not-found {
  margin-top: 100px;
  margin-left: 50px;
}
</style>


