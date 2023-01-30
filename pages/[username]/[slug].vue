<template>
  <DocContainer :doc="doc" />
  <!-- <pre>{{ doc }}</pre> -->
</template>

<script setup lang="ts">
const username: string | string[] = useRoute().params.username;
const slug: string | string[] = useRoute().params.slug;

const { data: doc } = await useFetch("/api/doc/" + username + "/" + slug);
</script>
