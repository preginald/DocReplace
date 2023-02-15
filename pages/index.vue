<template>
  <div>
    <h1>Welcome to DocReplace</h1>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~~/stores/UserStore";
const userStore = useUserStore();

// let user = ref({
//   id: "",
//   email: "",
//   name: "",
//   image: "",
// });

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

if (status.value == "authenticated") {
  useRouter().push({ path: "/" + userStore.user.name });
}
</script>

<style scoped></style>
