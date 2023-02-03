<template>
  <div>
    <h1>Welcome to DocReplace</h1>
    <pre>{{ doc }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data: doc } = await useFetch("/api/doc");

let user = ref({
  id: "",
  email: "",
  username: "",
  image: "",
});

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

const processUser = async (data) => {
  await $fetch("/api/user/upsert/", {
    method: "POST",
    body: data,
  }).then(async (response) => {
    user.value.id = response.id;
    user.value.email = response.email;
    user.value.username = response.username;
    user.value.image = response.image;
    useRouter().push({ path: "/" + user.value.username });
  });
};

if (status.value == "authenticated") {
  processUser(data.value);
}
</script>

<style scoped></style>
