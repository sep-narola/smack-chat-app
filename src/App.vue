<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useStore, mapActions } from "vuex";

export default defineComponent({
  name: "App",
  setup() {
    return { ...mapActions("app_store", ["handleAuthStateChanged"]) };
  },
  mounted() {
    this.handleAuthStateChanged();
  },
});
</script>
