<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center" v-if="!otherUserDetails?.online">
      {{ otherUserDetails?.name }} is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, index) in messages"
        :key="index"
        :name="
          message.from == 'me' ? userDetails?.name : otherUserDetails?.name
        "
        :text="[message.text]"
        :sent="message.from == 'me'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width" @submit="sendMessage" @reset="onReset">
          <q-input
            bg-color="white"
            outlined
            rounded
            v-model="chat.newMessage"
            placeholder="Message"
            dense
            autofocus
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                icon="send"
                color="white"
                type="submit"
                @click="sendMessage"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import { mapState, mapActions } from "vuex";
import mixinOtheruserDetails from "../mixins/mixin-other-user-details.js";

export default defineComponent({
  mixins: [mixinOtheruserDetails],
  setup() {
    const route = useRoute();
    const chat = reactive({
      newMessage: "",
      // messages: [
      //   {
      //     text: "Hey Jim, How are you?",
      //     from: "me",
      //   },
      //   {
      //     text: "Good thanks, Danny! How are you?",
      //     from: "them",
      //   },
      //   {
      //     text: "Pretty good!",
      //     from: "me",
      //   },
      // ],
    });

    const sendMessage = () => {
      console.log("sendMessage() Called!");
      if (chat.newMessage || chat.newMessage?.trim()) {
        chat.messages.push({
          text: chat.newMessage,
          from: "me",
        });
      }
      onReset();
    };

    const onReset = () => {
      console.log("onReset() Called!");
      chat.newMessage = "";
    };

    return {
      route,
      chat,
      sendMessage,
      onReset,
      ...mapActions("app_store", [
        "firebaseGetMessages",
        "firebaseStopGettingMessages",
      ]),
    };
  },
  computed: {
    ...mapState("app_store", ["messages", "userDetails"]),
    // otherUserDetails() {
    //   return this.$store.state.app_store.users[this.route.params.otherUserId];
    // },
  },
  mounted() {
    this.firebaseGetMessages(this.route.params.otherUserId);
  },
  unmounted() {
    this.firebaseStopGettingMessages();
  },
});
</script>
