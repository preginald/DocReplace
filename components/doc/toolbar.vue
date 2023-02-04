<template>
  <div class="doc-container">
    <div class="flex justify-between">
      <div>
        <button
          @click="changeView(view)"
          v-for="view in viewTypes"
          :class="viewClass(view)"
        >
          {{ view }}
        </button>
      </div>
      <div>
        <button @click="submitForm('draft')" class="btn-default-md">
          Save draft
        </button>
        <button @click="submitForm('publish')" class="btn-default-md">
          Save & Publish
        </button>
      </div>
    </div>
  </div>
  <!-- <div v-else>
    <button class="btn-default-md">Edit</button>
  </div> -->
</template>

<script setup lang="ts">
const { doc } = defineProps(["doc"]);

const viewTypes = ["inline", "preview"];
const viewClass = (view) => {
  return view == doc.view ? "btn-green-md" : "btn-gray-md";
};

const changeView = (view) => {
  doc.view = view;
};

async function submitForm(status: string) {
  const { data } = useSession();
  const username = data.value.user.name;
  const user = await $fetch("/api/user/id/" + username);

  const formData = {
    userId: user.id,
    title: doc.title,
    slug: doc.slug,
    author: doc.author,
    status: status,
    steps: doc.steps,
    inputs: doc.inputs,
  };

  if (doc.status == "new") {
    console.log(`This is a new doc. Create a new doc with ${status} status.`);
    await $fetch("/api/doc/create", {
      method: "POST",
      body: formData,
    }).then(async (doc) => {
      useRouter().push({ path: "/" + username + "/" + doc.slug });
    });
  }

  if (doc.status == "draft") {
    console.log(
      `This is an existing doc. Update this doc id ${doc.id} with ${status} status.`
    );
    formData.id = doc.id;

    await $fetch("/api/doc/update/" + doc.id, {
      method: "PUT",
      body: formData,
    }).then(async (doc) => {
      useRouter().push({ path: "/" + username + "/" + doc.slug });
    });
  }
}
</script>

<style scoped></style>
