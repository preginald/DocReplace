import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      user: {
        id: "",
        name: "",
        email: "",
        image: "",
      },
    };
  },
  actions: {
    async createUser(data: {}) {
      const user = await $fetch("/api/user/create", {
        method: "POST",
        body: data.user,
      });
      this.user.id = user._id;
      this.user.name = user.name;
      this.user.email = user.email;
      this.user.image = user.image;
    },
  },

  // getters
});
