<template>
  <DocToolbar :doc="doc" />
  <DocForm v-if="doc.view == 'inline'" :doc="doc" />
  <DocContainer v-if="doc.view == 'preview'" :doc="doc" />
  <!-- <pre>{{ languages }}</pre> -->
  <!-- <pre>{{ doc }}</pre> -->
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });

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

const doc = ref({
  title: ref("Document title"),
  slug: ref("document-title"),
  author: ref("7c96e0b5-9dd9-11ed-b676-0242ac110011"),
  inputs: ref([]),
  steps: ref([
    {
      id: "laksjdflkasdjf",
      order: ref(1),
      title: ref("This is the first step"),
      tasks: ref([
        {
          id: "t1",
          order: ref(1),
          language: ref({}),
          intro: ref("First we'll take a backup"),
          input: ref("cp original backup"),
          output: ref("copied"),
          focus: ref(null),
        },
      ]),
    },
  ]),
  valid: false,
  view: "inline",
  status: "new",
});
</script>
