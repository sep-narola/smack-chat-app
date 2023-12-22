<template>
  <q-form @submit.prevent="onSubmit">
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      outlined
      label="Name"
      v-model="state.form.name"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || state.validationMessage.required,
      ]"
    />
    <q-input
      class="q-mb-md"
      outlined
      type="email"
      label="Email"
      v-model="state.form.email"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || state.validationMessage.required,
      ]"
    />
    <q-input
      class="q-mb-md"
      outlined
      type="password"
      label="Password"
      v-model="state.form.password"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || state.validationMessage.required,
        (val) =>
          (val && val.length >= 8) ||
          'Password length should not be less than 8 characters!',
        (val) =>
          (val && val.length <= 20) ||
          'Password length should not be more than 20 characters!',
      ]"
    />
    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" :label="tab" />
    </div>
  </q-form>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, reactive, ref } from "vue";
import { mapActions, mapState, useStore } from "vuex";

export default defineComponent({
  // props: {
  //   tab: { required: true },
  // },
  props: ["tab"],
  setup(props) {
    const store = useStore();
    const $q = useQuasar();

    const state = reactive({
      form: { name: null, email: "danny@yopmail.com", password: "danny@yopmail.com" },
      validationMessage: { required: "This field is required!" },
    });

    const registerUser = (formData) =>
      store.dispatch("app_store/registerUser", formData);

    const loginUser = (formData) =>
      store.dispatch("app_store/loginUser", formData);

    const notify = (color, textColor, icon, message) => {
      if (type == "success") {
        $q.notify({
          color: color || "green-4",
          textColor: textColor || "white",
          icon: icon || "done",
          message: message || "Success!",
        });
      } else if (type == "error") {
        $q.notify({
          color: color || "red-5",
          textColor: textColor || "white",
          icon: icon || "warning",
          message: message || "Error!",
        });
      } else {
        $q.notify({
          color: color || "primary",
          textColor: textColor || "white",
          icon: icon,
          message: message,
        });
      }
    };

    const onSubmit = () => {
      if (props.tab == "login") {
        loginUser(state.form);
      } else {
        registerUser(state.form);
      }
    };

    return { state, onSubmit };
  },
});
</script>
