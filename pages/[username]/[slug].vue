<template>
  <DocToolbar />
  <hr />
  <DocForm v-if="isDraft() && isInline()" />
  <DocContainer v-if="isPreview() || isPublished()" />
  <hr />
  <DocToolbar />
  <!-- <pre>{{ docStore.doc }}</pre> -->
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
const docStore = useDocStore();

const username: string | string[] = useRoute().params.username;

const slug: string | string[] = useRoute().params.slug;

await docStore.getUserDocBySlug(username, slug);

docStore.doc.view = "inline";

const isPublished = () => {
  return docStore.doc.status == "publish";
};

const isDraft = () => {
  return docStore.doc.status == "draft";
};

const isPreview = () => {
  return docStore.view == "preview";
};

const isInline = () => {
  return docStore.view == "inline";
};
</script>
