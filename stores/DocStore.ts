import { defineStore } from "pinia";
import { editDoc } from "~~/server/database/repositories/docRepository";

export const useDocStore = defineStore("DocStore", {
  state: () => {
    return {
      doc: ref({
        title: "",
        slug: "",
        author: "",
        inputs: [],
        steps: [],
        valid: false,
        status: "new",
      }),
      view: "inline",
    };
  },
  actions: {
    // async readExercises() {
    //   const { data } = await useFetch("/api/exercises");
    //   this.exercises = data;
    // },
    // async readSession(id: string) {
    //   const { data } = await useFetch("/api/sessions/" + id);
    //   this.session = data;
    // },
    async getUserDocBySlug(username: string, slug: string) {
      const { data: doc } = await useFetch(
        "/api/user/username/" + username + "/doc/" + slug
      );
      this.doc = doc;
    },
    async updateDoc(formData: {}) {
      this.doc = await $fetch("/api/doc/" + this.doc.id, {
        method: "PUT",
        body: formData,
      });
    },
    async editDoc(formData: {}) {
      await $fetch("/api/doc/" + this.doc.id, {
        method: "PATCH",
        body: formData,
      }).then(async (response) => {
        this.doc = response;
      });
    },
    changeView(view: string) {
      this.view = view;
    },
    clearDoc() {
      this.doc = {
        title: "",
        slug: "",
        author: "",
        inputs: [],
        steps: [],
        valid: false,
        status: "new",
      };
    },
    deleteStep(stepIndex: number) {
      this.doc.steps = this.doc.steps.filter(
        (step, index) => index !== stepIndex
      );
    },
    deleteTask(stepIndex: number, taskIndex: number) {
      const step = this.doc.steps[stepIndex];
      const tasks = step.tasks.filter((task, index) => index !== taskIndex);
      this.doc.steps[stepIndex].tasks = tasks;
    },
    // toggleForm(state: boolean) {
    //   this.form = state;
    // },
  },

  // getters
});
