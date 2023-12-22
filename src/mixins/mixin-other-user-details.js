export default {
  computed: {
    otherUserDetails() {
      return this.$store.state.app_store.users[this.$route.params.otherUserId];
    },
  },
};
