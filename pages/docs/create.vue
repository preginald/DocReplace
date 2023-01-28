<template>
  <div class="card-container mt-3">
    <div class="relative z-0 w-full mb-6 group">
      <input
        v-model="doc.title"
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

    <div v-for="step in doc.steps" class="card-container mt-3">
      <div class="relative z-0 w-full my-6 group">
        <input
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
          <div class="relative z-0 w-full my-6 group">
            <input
              v-model="task.intro"
              type="text"
              id="task.intro"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="task.intro"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Task intro</label
            >
          </div>
          <div class="relative z-0 w-full my-6 group">
            <input
              v-model="task.input"
              type="text"
              id="task.input"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label
              for="task.input"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Task input</label
            >
          </div>
          <div class="relative z-0 w-full my-6 group">
            <input
              v-model="task.output"
              type="text"
              id="task.output"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
  <pre>{{ doc }}</pre>
</template>

<script setup lang="ts">
const doc = ref({
  title: ref("Document title"),
  author: ref("7c96e0b5-9dd9-11ed-b676-0242ac110011"),
  steps: ref([
    {
      order: ref(1),
      title: ref("This is the first step"),
      tasks: ref([
        {
          order: ref(1),
          intro: ref("First we'll take a backup"),
          input: ref("cp original backup"),
          output: ref("copied"),
        },
      ]),
    },
  ]),
});

const addStep = () => {
  const order = doc.value.steps.length + 1;
  doc.value.steps.push({
    order: order,
    title: "",
    tasks: [],
  });
};

const addTask = (step) => {
  const order = step.tasks.length + 1;
  step.tasks.push({ order: order, intro: "", input: "", output: "" });
};

async function submitForm() {
  const formData = {
    title: doc.value.title,
    author: doc.value.author,
    steps: doc.value.steps,
  };

  await $fetch("/api/doc/create", {
    method: "POST",
    body: formData,
  }).then(async () => {
    // redirect to document read
  });
}
</script>
