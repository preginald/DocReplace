<template>
  <div class="doc-container mt-3">
    <div class="flex">
      <h1>{{ docStore.doc.title }}</h1>
    </div>
    <hr />
    <p>This doc has {{ docStore.doc.inputs.length }} inputs.</p>
    <div class="flex gap-6 mb-6">
      <div v-for="input in docStore.doc.inputs">
        <div class="card-container">
          <label
            :for="input.id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ input.label }}</label
          >
          <input
            v-model="input.value"
            type="text"
            :id="input.id"
            :placeholder="input.value"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </div>
    <div v-for="step in docStore.doc.steps">
      <h2>Step {{ step.order }}: {{ step.title }}</h2>
      <hr />
      <div v-for="task in step.tasks">
        <DocTaskCard :task="task" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
const docStore = useDocStore();

const username: string | string[] = useRoute().params.username;
const slug: string | string[] = useRoute().params.slug;

await docStore.getUserDocBySlug(username, slug);

const { status } = useSession();

const authenticated = () => {
  return status.value === "authenticated";
};
</script>

<style>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
