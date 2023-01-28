<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <ul class="flex gap-4">
          <li v-for="element in navElements">
            <NuxtLink :to="element.route">{{ element.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
  </div>

  <div class="container mx-auto p-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
const navElements = [
  { route: "/", name: "Home" },
  { route: "/preginald", name: "My Docs" },
  { route: "/docs/create", name: "New" },
];
</script>

<style scoped>
.router-link-exact-active {
  color: red;
}
</style>
