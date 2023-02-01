<template>
  <div>
    <button
      @click="getCursorPos(input.name)"
      v-for="input in doc.inputs"
      class="badge-default"
    >
      {{ input.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { doc, input, getCursorPos } = defineProps([
  "doc",
  "input",
  "getCursorPos",
]);
</script>
