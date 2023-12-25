export default {
  computed: {
    otherUserDetails() {
      if (this.$store.state.app_store.users[this.$route.params.otherUserId]) {
        return this.$store.state.app_store.users[
          this.$route.params.otherUserId
        ];
      }
      return {};
    },
  },
};
