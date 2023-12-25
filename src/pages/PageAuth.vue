<template>
  <q-page class="auth-page flex q-pa-md">
    <q-card class="auth-card">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import LoginRegister from "../components/LoginRegister.vue";

export default defineComponent({
  components: {
    "login-register": LoginRegister,
  },
  setup() {
    return {
      tab: ref("login"),
    };
  },
});
</script>

<style lang="scss">
.auth-page {
  justify-content: center;
  // background: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  .auth-card {
    width: 50%;
  }
}

/* Media Queries */

/* Smartphones (portrait and landscape) ----------- */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .auth-card {
    width: 100% !important;
  }
}

/* Smartphones (landscape) ----------- */
@media only screen and (min-width: 321px) {
  .auth-card {
    width: 100% !important;
  }
}

/* Smartphones (portrait) ----------- */
@media only screen and (max-width: 320px) {
  .auth-card {
    width: 100% !important;
  }
}

/* iPads (landscape) ----------- */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .auth-card {
    width: 40% !important;
  }
}

/* iPads (portrait) ----------- */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  .auth-card {
    width: 50% !important;
  }
}

/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .auth-card {
    width: 40% !important;
  }
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  .auth-card {
    width: 35% !important;
  }
}
</style>
