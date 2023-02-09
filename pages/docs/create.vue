<template>
  <DocToolbar />
  <DocForm v-if="docStore.view == 'inline'" :doc="docStore.doc" />
  <DocContainer v-if="docStore.view == 'preview'" :doc="docStore.doc" />
  <DocToolbar />
  <!-- <pre>{{ languages }}</pre> -->
  <!-- <pre>{{ docStore.doc }}</pre> -->
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
definePageMeta({ middleware: "auth" });
const docStore = useDocStore();

docStore.clearDoc();

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
</script>
