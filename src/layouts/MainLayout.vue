<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          @click="$router.go(-1)"
          icon="arrow_back"
          flat
          dense
          round
        />
        <q-toolbar-title class="absolute-center"> {{ title }} </q-toolbar-title>
        <q-btn
          v-if="!userDetails?.userId"
          to="/auth"
          class="absolute-right"
          icon="account_circle"
          label="Login"
          no-caps
          flat
        />
        <q-btn
          v-else
          class="absolute-right"
          icon="account_circle"
          no-caps
          flat
          @click="logoutUser"
        >
          Logout <br />
          {{ userDetails?.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState, useStore } from "vuex";
import mixinOtheruserDetails from "../mixins/mixin-other-user-details.js";

export default {
  mixins: [mixinOtheruserDetails],
  computed: {
    ...mapState("app_store", ["userDetails"]),
    title() {
      // console.log(this.$route);
      let currentPath = this.$route.fullPath;
      // if (currentPath == "/") return "Smackchat";
      if (currentPath.includes("/chat")) return this.otherUserDetails?.name;
      else if (currentPath == "/auth") return "Login";
      return "Smackchat";
    },
  },
  methods: {
    ...mapActions("app_store", ["logoutUser"]),
  },
};
</script>

<style lang="scss">
.q-toolbar .q-btn {
  line-height: 1.2;
}
</style>
