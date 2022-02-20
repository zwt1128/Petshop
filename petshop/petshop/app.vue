<template>
  <main>
    <NuxtPage />
  </main>
</template>
<script setup>
const { user } = useCount()
import { ref, watchEffect } from 'vue'
let { data } = await useFetch('http://localhost:8888/api/user/getUser', { server: false, credentials:'include' })
watchEffect(() => {
  if (data.value) {
    user.value = data.value
  }
})

</script>
<style>
@import "~/styles/main.css";
</style>
