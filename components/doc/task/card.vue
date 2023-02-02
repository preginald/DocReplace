<template>
  <div>
    <p class="mb-5">
      {{ task.intro }}
    </p>
    <div class="py-3">
      <span class="badge-input">
        <span>Input</span>
        <span v-if="task.language.name"> / {{ task.language.name }}</span>
      </span>
      <div class="input-container">
        <pre class="p-3">
<span v-if="task.language.name">{{ task.language.prompt }}</span> {{ replacePlaceholders(doc.inputs, task.input) }}</pre>
      </div>
    </div>
    <div v-if="task.output" class="py-3">
      <span class="badge-output">Output</span>
      <div class="output-container">
        <pre
          class="p-3"
        ><span v-if="task.language.name">{{ task.language.prompt }}</span> {{ task.output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { doc, task } = defineProps(["doc", "task"]);
const replacePlaceholders = (inputs: any, string: string) => {
  inputs.forEach((input) => {
    const regex = new RegExp(`<vv>${input.name}</vv>`, "g");
    string = string.replace(regex, input.value);
  });
  return string;
};
</script>
