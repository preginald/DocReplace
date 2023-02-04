<template>
  <DocToolbar :doc="doc" />
  <DocForm v-if="isDraft() && isInline()" :doc="doc" />
  <DocContainer v-if="isPreview()" :doc="doc" />
  <!-- <pre>{{ doc }}</pre> -->
</template>

<script setup lang="ts">
const username: string | string[] = useRoute().params.username;
const slug: string | string[] = useRoute().params.slug;

const { data: doc } = await useFetch(
  "/api/user/username/" + username + "/doc/" + slug
);

doc.value.view = "inline";

const isDraft = () => {
  return doc.value.status == "draft";
};

const isPreview = () => {
  return doc.value.view == "preview";
};

const isInline = () => {
  return doc.value.view == "inline";
};
</script>
