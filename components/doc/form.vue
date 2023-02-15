<template>
  <div class="doc-container mt-3">
    <div class="relative z-0 w-full mb-6 group">
      <input
        v-model="docStore.doc.title"
        @input="updateSlug"
        type="text"
        id="docTitle"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        for="docTitle"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Title</label
      >
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input
        v-model="docStore.doc.slug"
        type="text"
        id="docSlug"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        readonly
      />
      <label
        for="docSlug"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Slug</label
      >
    </div>
    <span class="badge-task">Inputs</span>
    <div class="task-container pt-1">
      <div
        v-if="docStore.doc.inputs"
        v-for="input in docStore.doc.inputs"
        id="doc.inputs"
        class="mt-3"
      >
        <span class="badge-task">Input: {{ input.name }}</span>
        <div class="flex task-container">
          <div class="relative z-0 w-full my-6 group">
            <input
              @input="fillNameValue(input)"
              v-model="input.label"
              type="text"
              id="input.label"
              placeholder=""
              :class="docStore.validInputStyle"
            />
            <label
              for="input.label"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Label</label
            >
          </div>

          <div class="relative z-0 w-full my-6 group">
            <input
              @input="checkDuplicate()"
              v-model="input.name"
              type="text"
              id="input.name"
              placeholder=""
              :class="input.class"
            />
            <label
              for="input.name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Name</label
            >
            <span v-if="input.duplicate" class="input-invalid"
              >Duplicate name</span
            >
          </div>
          <div class="relative z-0 w-full my-6 group">
            <input
              v-model="input.value"
              type="text"
              id="input.value"
              placeholder=""
              :class="docStore.validInputStyle"
            />
            <label
              for="input.value"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Default value</label
            >
          </div>
        </div>
      </div>
      <button @click="addInput" class="btn-default-lg mt-3">
        Add an input
      </button>
    </div>

    <div
      v-for="(step, stepIndex) in docStore.doc.steps"
      :key="stepIndex"
      class="mt-3"
    >
      <span class="badge-step">
        <span>Step {{ step.order }}</span>
      </span>
      <div class="step-container">
        <div class="relative z-0 w-full my-6 group">
          <input
            :id="step.id"
            v-model="step.title"
            type="text"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            for="title"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Step {{ step.order }} title</label
          >
          <div
            v-for="(task, taskIndex) in step.tasks"
            :key="taskIndex"
            class="mt-3"
          >
            <span class="badge-task">
              <span>Task {{ task.order }}</span>
            </span>
            <div class="task-container">
              <label
                for="language"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Select an option</label
              >
              <select
                v-model="task.language._id"
                @change="setLanguage(task)"
                id="language"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a language</option>
                <option v-for="language in languages" :value="language._id">
                  {{ language.name }}
                </option>
              </select>
              <div class="relative z-0 w-full my-6 group">
                <input
                  @focus="setInputId(task, 'intro', $event)"
                  v-model="task.intro"
                  type="text"
                  :id="'intro-' + task.id"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <DocButtonsInput
                  v-if="task.focus === 'intro'"
                  :doc="docStore.doc"
                  :input="input"
                  :getCursorPos="getCursorPos"
                />
                <label
                  for="task.intro"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >Task intro</label
                >
              </div>
              <div class="relative z-0 w-full my-6 group">
                <input
                  @focus="setInputId(task, 'input', $event)"
                  v-model="task.input"
                  type="text"
                  :id="'input-' + task.id"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <DocButtonsInput
                  v-if="task.focus === 'input'"
                  :doc="docStore.doc"
                  :input="input"
                  :getCursorPos="getCursorPos"
                />
                <label
                  for="task.input"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >Task input</label
                >
              </div>
              <div class="relative z-0 w-full my-6 group">
                <input
                  @focus="setInputId(task, 'output', $event)"
                  v-model="task.output"
                  type="text"
                  :id="'output-' + task.id"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <DocButtonsInput
                  v-if="task.focus === 'output'"
                  :doc="docStore.doc"
                  :input="input"
                  :getCursorPos="getCursorPos"
                />
                <label
                  for="task.output"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >Task output</label
                >
              </div>
              <DocTaskCard :doc="docStore.doc" :task="task" />
              <button
                @click="docStore.deleteTask(stepIndex, taskIndex)"
                class="btn-default-md"
              >
                Remove Task {{ task.order }}
              </button>
            </div>
            <button @click="addTask(step)" class="btn-default-lg mt-2">
              Add Task
            </button>
          </div>
        </div>
        <button @click="docStore.deleteStep(stepIndex)" class="btn-default-md">
          Remove Step {{ step.order }}
        </button>
      </div>
    </div>
    <button @click="addStep" class="btn-default-lg mt-3">Add a step</button>
    <br />
    <!-- <input v-model="docStore.doc.author" type="text" id="author" hidden /> -->
  </div>
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
const docStore = useDocStore();

// const { doc } = defineProps(["doc"]);
const { data: languages } = await useFetch("/api/language/");

let inputId = ref("");
let inputObject = ref({});
let inputType = ref("");
let input = {
  label: "",
  name: "",
  value: "",
};

const updateSlug = () => {
  docStore.doc.slug = docStore.doc.title.toLowerCase().split(" ").join("-");
};

const fillNameValue = (input: {
  label: string;
  name?: string;
  value?: string;
}) => {
  input.name = input.label.toLowerCase().split(" ").join("_");
  input.value = input.label.toLowerCase().split(" ").join("-");
};

const addInput = (): void => {
  docStore.doc.inputs.push({
    label: "",
    name: "",
    value: "",
    class: validInputStyle,
  });
};

const addStep = () => {
  const order = docStore.doc.steps.length + 1;
  const id = generateRandomString();
  docStore.doc.steps.push({
    id: id,
    order: order,
    title: "",
    tasks: [
      {
        id: id,
        order: order,
        language: {},
        intro: "",
        input: "",
        output: "",
        focus: null,
      },
    ],
  });
};

const addTask = (step) => {
  const order = step.tasks.length + 1;
  const id = generateRandomString();
  step.tasks.push({
    id: id,
    order: order,
    language: {},
    intro: "",
    input: "",
    output: "",
    focus: null,
  });
};

function setInputId(x, type, e) {
  inputObject.value = x;
  x.focus = type;
  inputType.value = type;
  // console.log(inputObject);

  const target = e.target;
  if (target.tagName === "INPUT") {
    // console.log(`The id of the input field is: ${target.id}`);
    inputId.value = target.id;
  }
}

const setLanguage = async (task: any) => {
  const id = task.language._id;

  const language = languages.value.find((language: any) => language._id === id);
  task.language.name = language.name;
  task.language.prompt = language.prompt;
};

function getCursorPos(name) {
  const id = inputId.value;
  const input = document.getElementById(id);
  const cursorPos = input.selectionStart;
  const text = "<vv>" + name + "</vv>";
  insertText(id, cursorPos, text);
}

function insertText(id, cursor, text) {
  const input = document.getElementById(id);
  if (!input) return;

  const type = inputType.value;
  const currentValue = input.value;

  input.value =
    currentValue.slice(0, cursor) + text + currentValue.slice(cursor);
  // input.setSelectionRange(cursor + text.length, cursor + text.length);
  inputObject.value[type] = input.value;
}

function generateRandomString() {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 8; i > 0; --i) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
}

docStore.checkDuplicate();
</script>

<style scoped></style>
