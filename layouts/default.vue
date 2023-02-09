<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <ul class="flex gap-4">
          <li v-for="element in navElements">
            <NuxtLink :to="element.route">{{ element.name }}</NuxtLink>
          </li>
        </ul>
        <ul v-if="authenticated()" class="flex gap-4">
          <li>
            <NuxtLink to="/docs/create/">New</NuxtLink>
          </li>

          <li>
            <NuxtLink @click="signOut" to="/signout">Sign Out</NuxtLink>
          </li>
        </ul>
        <ul v-else>
          <li v-if="status == 'unauthenticated'" @click="signIn">Sign In</li>
        </ul>
      </nav>
    </header>
  </div>

  <div class="container mx-auto p-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
const docStore = useDocStore();

const {
  status,
  data,
  lastRefreshedAt,
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  signOut,
} = useSession();

const authenticated = () => {
  return status.value === "authenticated";
};

const navElements = [{ route: "/", name: "Home" }];
</script>

<style scoped>
.router-link-exact-active {
  color: red;
}
</style>
