<template>
  <div>
    <NuxtLink v-for="doc in docs" :to="'/preginald/' + doc.slug">
      <div x class="card-container">
        {{ doc.title }}
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const username: string | string[] = useRoute().params.username;
try {
  const { data: docs } = await useFetch("/api/doc/" + username);
} catch (error) {
  error;
}
</script>
k
