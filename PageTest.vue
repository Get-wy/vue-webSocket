<template>
  <div class="page-test">
    <p>测试页</p>
    <button
      @click="setInterval">
      发送
    </button>
    <!-- <button
      @click="noInterval">
      结束
    </button> -->
    <textarea 
      name="" 
      id="" 
      cols="30" 
      rows="10"
      v-model="text">
    </textarea>

  </div>
</template>


<script>
import PageTest from './PageTest.js'
export default PageTest
</script>

<style scoped>
@import url(./PageTest.css);
</style>
