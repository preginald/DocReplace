<template>
  <div>
    <pre>{{ username }}</pre>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const username: string | string[] = useRoute().params.username;
const { data } = await useFetch("/api/doc/" + username);
</script>
k
