<template>
  <div>
    <NuxtLink v-for="doc in docs" :to="'/preginald/' + doc.slug">
      <div class="card-container">
        {{ doc.title }}
        {{ doc.status }}
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const username: string | string[] = useRoute().params.username;
const { data: docs } = await useFetch("/api/doc/user/" + username);
// try {
//   const data = await useFetch("/api/doc/" + username);
//   console.log(data);
// } catch (error) {
//   error;
// }
</script>
