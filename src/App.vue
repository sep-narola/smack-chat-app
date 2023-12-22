<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useStore, mapActions } from "vuex";

export default defineComponent({
  name: "App",
  setup() {
    // const store = useStore();
    // const handleOnAuthStateChanged = () => {
    //   store.dispatch("app_store/handleAuthStateChanged");
    // };
    return { ...mapActions("app_store", ["handleAuthStateChanged"]) };
  },
  mounted() {
    this.handleAuthStateChanged();
  },
});
</script>
