<template>
  <DocToolbar :doc="docStore.doc" />
  <DocForm v-if="docStore.doc.view == 'inline'" :doc="docStore.doc" />
  <DocContainer v-if="docStore.doc.view == 'preview'" :doc="docStore.doc" />
  <!-- <pre>{{ languages }}</pre> -->
  <!-- <pre>{{ docStore.doc }}</pre> -->
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
definePageMeta({ middleware: "auth" });
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
</script>
