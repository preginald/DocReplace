import { defineStore } from "pinia";
import { editDoc } from "~~/server/database/repositories/docRepository";

export const useDocStore = defineStore("DocStore", {
  state: () => {
    return {
      doc: ref({
        title: "Document title new",
        slug: "document-title",
        author: "7c96e0b5-9dd9-11ed-b676-0242ac110011",
        inputs: [],
        steps: [
          {
            id: "laksjdflkasdjf",
            order: 1,
            title: "This is the first step",
            tasks: [
              {
                id: "t1",
                order: 1,
                language: {},
                intro: "First we'll take a backup",
                input: "cp original backup",
                output: "copied",
                focus: null,
              },
            ],
          },
        ],
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
        title: "Document title new",
        slug: "document-title",
        author: "7c96e0b5-9dd9-11ed-b676-0242ac110011",
        inputs: [],
        steps: [
          {
            id: "laksjdflkasdjf",
            order: 1,
            title: "This is the first step",
            tasks: [
              {
                id: "t1",
                order: 1,
                language: {},
                intro: "First we'll take a backup",
                input: "cp original backup",
                output: "copied",
                focus: null,
              },
            ],
          },
        ],
        valid: false,
        view: "inline",
        status: "new",
      };
    },
    // toggleForm(state: boolean) {
    //   this.form = state;
    // },
  },

  // getters
});
