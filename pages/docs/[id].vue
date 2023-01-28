<template>
  <div>
    <!-- <h1>{{ doc.title }}</h1>
    <p>Author: {{ doc.author.username }}</p>
    <h2>Steps</h2>
    <ul>
      <li v-for="step in doc.steps" :key="step.id">
        {{ step.title }}
        <ul>
          <li v-for="task in step.tasks" :key="task.id">
            {{ task.intro }}
          </li>
        </ul>
      </li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
const docId: string | string[] = useRoute().params.id;
console.log(docId);
</script>
