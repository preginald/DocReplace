import { defineStore } from "pinia";

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
      validInputStyle:
        "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",

      invalidInputStyle:
        "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-white dark:border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
    };
  },
  actions: {
    async getUserDocBySlug(username: string, slug: string) {
      const { data: doc } = await useFetch(
        "/api/user/name/" + username + "/doc/" + slug
      );
      this.doc = doc;
    },
    async updateDoc(formData: {}) {
      this.doc = await $fetch("/api/doc/" + this.doc._id, {
        method: "PUT",
        body: formData,
      });
      this.checkDuplicate();
    },
    async editDoc(formData: {}) {
      this.doc = await $fetch("/api/doc/" + this.doc._id, {
        method: "PUT",
        body: formData,
      });
    },
    changeView(view: string) {
      this.view = view;
    },
    clearDoc() {
      this.doc = {
        title: "Testing one",
        slug: "testing-one",
        author: "",
        inputs: [],
        steps: [],
        valid: false,
        status: "new",
      };
      this.addStep(0);
    },
    generateRandomString() {
      const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (let i = 8; i > 0; --i) {
        result += characters[Math.floor(Math.random() * characters.length)];
      }
      return result;
    },
    addStep(stepIndex: number) {
      console.log(stepIndex);

      const id = this.generateRandomString();
      const newStep = {
        id: id,
        order: stepIndex + 1,
        title: "",
        tasks: [
          {
            id: id,
            order: 1,
            language: {},
            intro: "",
            input: "",
            output: "",
            focus: null,
          },
        ],
      };
      // Insert the new step at the specified index
      this.doc.steps.splice(stepIndex + 1, 0, newStep);

      // Update the order of the existing steps
      for (let i = stepIndex + 1; i < this.doc.steps.length; i++) {
        this.doc.steps[i].order = i + 1;
      }
    },
    deleteStep(stepIndex: number) {
      // Remove the step at the specified index
      const [deletedStep] = this.doc.steps.splice(stepIndex, 1);

      // Update the order of the remaining steps
      this.doc.steps.forEach((step, index) => {
        if (step.order > deletedStep.order) {
          step.order -= 1;
        }
      });
    },
    deleteTask(stepIndex: number, taskIndex: number) {
      const step = this.doc.steps[stepIndex];
      const tasks = step.tasks.filter((task, index) => index !== taskIndex);
      this.doc.steps[stepIndex].tasks = tasks;
    },
    checkDuplicate() {
      const names = new Set<string>();
      const duplicates = new Set<string>();

      (this.doc.inputs as any[]).forEach((input) => {
        if (names.has(input.name)) {
          duplicates.add(input.name);
        } else {
          names.add(input.name);
        }
      });

      (this.doc.inputs as any[]).forEach((input) => {
        if (duplicates.has(input.name)) {
          input.duplicate = true;
          input.class = this.invalidInputStyle;
        } else {
          input.duplicate = false;
          input.class = this.validInputStyle;
        }
      });
    },
    // toggleForm(state: boolean) {
    //   this.form = state;
    // },
  },

  // getters
});
