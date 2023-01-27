<template>
  <div>
    <label for="title">Title:</label>
    <input v-model="form.title" type="text" id="title" />
    <br />
    <input v-model="form.author" type="text" id="author" hidden />
    <button @click="submitForm()">Create</button>
  </div>
</template>

<script setup lang="ts">
const form = { title: "", author: "7c96e0b5-9dd9-11ed-b676-0242ac110011" };
async function submitForm() {
  const formData = {
    title: form.title,
    author: form.author,
  };
  await $fetch("/api/doc/create", {
    method: "POST",
    body: formData,
  }).then(async () => {
    // await muscleStore.readMuscles();
    // await muscleGroupStore.readMuscleGroups();
    // muscleStore.muscle = {};
  });
}
</script>

<style scoped></style>
