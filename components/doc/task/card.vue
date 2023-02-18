<template>
  <div>
    <p class="mb-5">
      {{ task.intro }}
    </p>
    <div @click="copy(task)" class="py-3">
      <span class="badge-input">
        <span>Input</span>
        <span v-if="task.language.name"> / {{ task.language.name }}</span>
      </span>
      <div class="input-container">
        <pre class="p-3">
<span v-if="task.language.name">{{ task.language.prompt }}</span> {{ replacePlaceholders(docStore.doc.inputs, task.input) }}</pre>
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
import { useDocStore } from "@/stores/DocStore";
const docStore = useDocStore();
const { task } = defineProps(["task"]);
const replacePlaceholders = (inputs: any, string: string) => {
  inputs.forEach((input) => {
    const regex = new RegExp(`<vv>${input.name}</vv>`, "g");
    string = string.replace(regex, input.value);
  });
  return string;
};

const copy = (task) => {
  const copyText = replacePlaceholders(docStore.doc.inputs, task.input);
  // Create a new textarea element
  const textarea = document.createElement("textarea");

  // Set the value of the textarea to the text to copy
  textarea.value = copyText;

  // Add the textarea to the document
  document.body.appendChild(textarea);

  // Select the contents of the textarea
  textarea.select();

  // Copy the contents to the clipboard
  document.execCommand("copy");

  // Remove the textarea from the document
  document.body.removeChild(textarea);
  console.log(copyText);
};
</script>
