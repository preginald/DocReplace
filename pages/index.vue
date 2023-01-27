<template>
  <div>
    <h1>Welcome to DocReplace</h1>
    <pre>{{ doc }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data: doc } = await useFetch("/api/doc");
</script>

<style scoped></style>
