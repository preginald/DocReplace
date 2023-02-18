<template>
  <div class="doc-container">
    <div>
      <div v-if="docStore.doc.status == 'publish'" class="flex justify-end">
        <button @click="submitForm('draft')" class="btn-default-md">
          Edit
        </button>
      </div>
      <div v-else class="flex justify-between">
        <div>
          <button
            @click="docStore.changeView(view)"
            v-for="view in viewTypes"
            :class="viewClass(view)"
          >
            {{ view }}
          </button>
        </div>
        <div>
          <button @click="deleteDoc()" class="btn-default-md">
            Delete Doc
          </button>
          <button @click="submitForm('draft')" class="btn-default-md">
            Save draft
          </button>
          <button @click="submitForm('publish')" class="btn-default-md">
            Save & Publish
          </button>
          <button @click="cancelEdit('publish')" class="btn-default-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocStore } from "@/stores/DocStore";
import { useUserStore } from "~~/stores/UserStore";

const docStore = useDocStore();
const userStore = useUserStore();

const viewTypes = ["inline", "preview"];
const viewClass = (view) => {
  return view == docStore.view ? "btn-green-md" : "btn-gray-md";
};

async function deleteDoc() {
  const id = docStore.doc._id;
  await $fetch("/api/doc/" + id, {
    method: "DELETE",
  });
  useRouter().push({
    path: "/" + docStore.doc.author.name,
  });
}

async function cancelEdit(status: string) {
  const formData = { status };
  await docStore.editDoc(formData);
}

async function submitForm(status: string) {
  const formData = {
    author: userStore.user.id,
    title: docStore.doc.title,
    slug: docStore.doc.slug,
    status: status,
    steps: docStore.doc.steps,
    inputs: docStore.doc.inputs,
  };

  if (docStore.doc.status == "new") {
    await $fetch("/api/doc/create", {
      method: "POST",
      body: formData,
    }).then(async (response) => {
      docStore.doc = response;
    });
  }

  if (docStore.doc.status == "draft") {
    await docStore.updateDoc(formData);
    await docStore.changeView("inline");
    useRouter().push({
      path: "/" + docStore.doc.author.name + "/" + docStore.doc.slug,
    });
  }

  if (docStore.doc.status == "publish") {
    await docStore.editDoc(formData);
    await docStore.changeView("inline");
    useRouter().push({
      path: "/" + docStore.doc.author.name + "/" + docStore.doc.slug,
    });
  }
}
</script>

<style scoped></style>
