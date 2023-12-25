<template>
  <q-page ref="pageChat" class="page-chat flex column">
    <q-banner class="bg-grey-4 text-center fixed-top" v-if="!otherUserDetails?.online">
      {{ otherUserDetails?.name }} is offline
    </q-banner>
    <div
      :class="{ invisible: !chat.showMessages }"
      class="q-pa-md column col justify-end"
    >
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="
          message.from == 'me' ? userDetails?.name : otherUserDetails?.name
        "
        :text="[message.text]"
        :sent="message.from == 'me'"
        :bg-color="message.from == 'me' ? 'white' : 'light-green-2'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width" @submit="sendMessage" @reset="onReset">
          <q-input
            ref="newMessage"
            bg-color="white"
            outlined
            rounded
            v-model="chat.newMessage"
            @blur="scrollToBottom"
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
import { defineComponent, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore, mapState, mapActions } from "vuex";
import mixinOtheruserDetails from "../mixins/mixin-other-user-details.js";

export default defineComponent({
  mixins: [mixinOtheruserDetails],
  setup() {
    const store = useStore();
    const route = useRoute();
    const pageChat = ref(null);
    const chat = reactive({
      showMessages: true,
      newMessage: "",
    });

    return {
      route,
      chat,
      pageChat,
    };
  },
  computed: {
    ...mapState("app_store", ["messages", "userDetails"]),
  },
  methods: {
    ...mapActions("app_store", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessage",
    ]),

    sendMessage() {
      if (this.chat.newMessage || this.chat.newMessage?.trim()) {
        this.firebaseSendMessage({
          message: {
            text: this.chat.newMessage,
            from: "me",
          },
          otherUserId: this.route.params.otherUserId,
        });
      }
      this.onReset();
    },

    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
        this.chat.showMessages = true;
      });
    },

    onReset() {
      this.chat.newMessage = "";
      this.$refs.newMessage.focus();
    },
  },
  watch: {
    messages: {
      handler(val) {
        if (Object.keys(val).length) {
          this.scrollToBottom();
          this.chat.showMessages = true;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.firebaseGetMessages(this.route.params.otherUserId);
  },
  unmounted() {
    this.firebaseStopGettingMessages();
  },
});
</script>

<style lang="scss">
.page-chat {
  background: #e2dfd5;
  &:after {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.1;
    background-image: radial-gradient(
        circle at 100% 150%,
        #c0c0c0 24%,
        #fff 25%,
        #fff 28%,
        #c0c0c0 29%,
        #c0c0c0 36%,
        #fff 36%,
        #fff 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 0 150%,
        #c0c0c0 24%,
        #fff 25%,
        #fff 28%,
        #c0c0c0 29%,
        #c0c0c0 36%,
        #fff 36%,
        #fff 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 50% 100%,
        #fff 10%,
        #c0c0c0 11%,
        #c0c0c0 23%,
        #fff 24%,
        #fff 30%,
        #c0c0c0 31%,
        #c0c0c0 43%,
        #fff 44%,
        #fff 50%,
        #c0c0c0 51%,
        #c0c0c0 63%,
        #fff 64%,
        #fff 71%,
        transparent 71%,
        transparent
      ),
      radial-gradient(
        circle at 100% 50%,
        #fff 5%,
        #c0c0c0 6%,
        #c0c0c0 15%,
        #fff 16%,
        #fff 20%,
        #c0c0c0 21%,
        #c0c0c0 30%,
        #fff 31%,
        #fff 35%,
        #c0c0c0 36%,
        #c0c0c0 45%,
        #fff 46%,
        #fff 49%,
        transparent 50%,
        transparent
      ),
      radial-gradient(
        circle at 0 50%,
        #fff 5%,
        #c0c0c0 6%,
        #c0c0c0 15%,
        #fff 16%,
        #fff 20%,
        #c0c0c0 21%,
        #c0c0c0 30%,
        #fff 31%,
        #fff 35%,
        #c0c0c0 36%,
        #c0c0c0 45%,
        #fff 46%,
        #fff 49%,
        transparent 50%,
        transparent
      );
    background-size: 100px 50px;
  }
}

.q-banner {
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}
.q-message {
  z-index: 1;
}
</style>
