<template>
  <div class="grid grid-cols-2">
    <div class="mt-3 mr-6">
      <div class="relative z-0 w-full mb-6 group">
        <input
          v-model="doc.title"
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
          v-model="doc.slug"
          type="text"
          id="docSlug"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          for="docSlug"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Slug</label
        >
      </div>
      <h3 v-if="doc.inputs">Inputs</h3>
      <div
        v-for="input in doc.inputs"
        id="doc.inputs"
        class="flex card-container"
      >
        <div class="relative z-0 w-full my-6 group">
          <input
            v-model="input.label"
            type="text"
            id="input.label"
            placeholder=""
            :class="validInputStyle"
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
            :class="validInputStyle"
          />
          <label
            for="input.value"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Default value</label
          >
        </div>
      </div>
      <button @click="addInput" class="btn-default-lg mt-3">
        Add an input
      </button>

      <div v-for="step in doc.steps" class="card-container mt-3">
        <div class="relative z-0 w-full my-6 group">
          <input
            :id="step.id"
            @focus="setInputId"
            v-model="step.title"
            type="text"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            for="title"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Step {{ step.order }} title</label
          >
          <div v-for="task in step.tasks" class="card-container mt-3">
            <label
              for="language"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Select an option</label
            >
            <select
              v-model="task.language.id"
              @change="setLanguage(task)"
              id="language"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a language</option>
              <option v-for="language in languages" :value="language.id">
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
                :doc="doc"
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
                :doc="doc"
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
                :doc="doc"
                :input="input"
                :getCursorPos="getCursorPos"
              />
              <label
                for="task.output"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >Task output</label
              >
            </div>
          </div>
          <button @click="addTask(step)" class="btn-default-lg mt-2">
            Add Task
          </button>
        </div>
      </div>
      <button @click="addStep" class="btn-default-lg mt-3">Add a step</button>
      <br />
      <input v-model="doc.author" type="text" id="author" hidden />
      <button @click="submitForm()" class="btn-default-lg">Save</button>
    </div>
    <DocContainer :doc="doc" />
  </div>
  <!-- <pre>{{ languages }}</pre> -->
  <pre>{{ doc }}</pre>
</template>

<script setup lang="ts">
let inputId = ref("");
let inputObject = ref({});
let inputType = ref("");
let input = {
  label: "",
  name: "",
  value: "",
};
const { data: languages } = await useFetch("/api/language/");

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
});

const addInput = (): void => {
  doc.value.inputs.push({
    label: "",
    name: "",
    value: "",
    class: validInputStyle,
  });
};

const addStep = () => {
  const order = doc.value.steps.length + 1;
  const id = generateRandomString();
  doc.value.steps.push({
    id: id,
    order: order,
    title: "",
    tasks: [],
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

const updateSlug = () => {
  doc.value.slug = doc.value.title.toLowerCase().split(" ").join("-");
};

async function submitForm() {
  const formData = {
    title: doc.value.title,
    slug: doc.value.slug,
    author: doc.value.author,
    steps: doc.value.steps,
    inputs: doc.value.inputs,
  };

  await $fetch("/api/doc/create", {
    method: "POST",
    body: formData,
  }).then(async () => {
    // redirect to document read
  });
}

const validInputStyle =
  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

const invalidInputStyle =
  "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

async function setLanguage(task) {
  const id = task.language.id;

  const language = languages.value.find((language) => language.id === id);
  task.language.name = language.name;
  task.language.prompt = language.prompt;
}

function checkDuplicate() {
  const names = new Set();
  const duplicates = new Set();
  doc.value.inputs.forEach((input) => {
    if (names.has(input.name)) {
      duplicates.add(input.name);
    } else {
      names.add(input.name);
    }
  });

  doc.value.inputs.forEach((input) => {
    if (duplicates.has(input.name)) {
      input.duplicate = true;
      input.class = invalidInputStyle;
    } else {
      input.duplicate = false;
      input.class = validInputStyle;
    }
  });
}

const findRowById = (rows: { id: number }[], id: number) => {
  return rows.find((row) => row.id === id);
};
</script>
