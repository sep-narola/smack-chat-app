// import { Vue } from "vue";
import { firebaseAuth, firebaseDB } from "../boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ref,
  child,
  get,
  set,
  onValue,
  onChildAdded,
  onChildChanged,
  update,
  push,
} from "firebase/database";

let messagesRef;

const state = {
  userDetails: {},
  users: {},
  messages: {},
};

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },

  addUser(state, payload) {
    state.users[payload.userId] = payload.userDetails;
    // Vue.set(state.users, payload.userId, payload.userDetails);
  },

  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails);
  },

  addMessage(state, payload) {
    state.messages[payload.messageId] = payload.messageDetails;
  },
  clearMessages(state) {
    state.messages = {};
  },
};

const actions = {
  // Register / Create New User
  registerUser({}, payload) {
    // console.log("payload => ", payload);
    try {
      createUserWithEmailAndPassword(
        firebaseAuth,
        payload.email,
        payload.password
      )
        .then((response) => {
          console.log("response =>", response);
          let userId = firebaseAuth.currentUser.uid;
          set(ref(firebaseDB, "users/" + userId), {
            name: payload.name,
            email: payload.email,
            online: true,
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      console.error(err);
    }
  },

  // Login
  loginUser({}, payload) {
    try {
      signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
        .then((response) => {
          console.log("response =>", response);
        })
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      console.error(err);
    }
  },

  logoutUser() {
    signOut(firebaseAuth)
      .then((response) => {
        console.log("signOut =>", response);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  handleAuthStateChanged({ commit, dispatch, state }) {
    console.log("handleAuthStateChanged");
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        let userId = firebaseAuth.currentUser.uid;
        onValue(
          ref(firebaseDB, "users/" + userId),
          async (snapshot) => {
            let userDetails = await snapshot.val();
            commit("setUserDetails", {
              name: await userDetails.name,
              email: await userDetails.email,
              userId: userId,
            });
          },
          {
            onlyOnce: true,
          }
        );
        dispatch("firebaseUpdateUser", {
          userId: userId,
          updates: { online: true },
        });
        dispatch("firebaseGetUsers");
        this.$router.push("/");
      } else {
        // User is logged out.
        dispatch("firebaseUpdateUser", {
          userId: state.userDetails.userId,
          updates: { online: false },
        });
        commit("setUserDetails", {});
        this.$router.push("/auth");
      }
    });
  },

  firebaseUpdateUser({}, payload) {
    console.log("payload =>", payload);
    if (payload.userId) {
      update(ref(firebaseDB, "users/" + payload.userId), payload.updates);
    }
    // update(ref(firebaseDB, "/users/" + payload.userId),);
  },

  firebaseGetUsers({ commit }) {
    const usersRef = ref(firebaseDB, "users");
    onChildAdded(usersRef, (snapshot) => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("addUser", {
        userId,
        userDetails,
      });
    });

    onChildChanged(usersRef, (snapshot) => {
      let userDetails = snapshot.val();
      let userId = snapshot.key;
      commit("updateUser", {
        userId,
        userDetails,
      });
    });
  },

  firebaseGetMessages({ commit, state }, otheruserId) {
    console.log("otheruserId =>", otheruserId);
    let userId = state.userDetails.userId;
    messagesRef = ref(firebaseDB, "chats/" + userId + "/" + otheruserId);
    onChildAdded(messagesRef, (snapshot) => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;
      commit("addMessage", {
        messageId,
        messageDetails,
      });
    });
  },

  firebaseStopGettingMessages({ commit }) {
    console.log("firebaseStopGettingMessages");
    // const unsubscribe = onChildAdded(messagesRef, (snapshot) => {});
    // unsubscribe();
    commit("clearMessages");
  },

  firebaseSendMessage({}, payload) {
    console.log("payload => ", payload);
    push(
      ref(
        firebaseDB,
        "chats/" + state.userDetails.userId + "/" + payload.otherUserId
      ),
      payload.message
    );

    payload.message.from = "them";
    push(
      ref(
        firebaseDB,
        "chats/" + payload.otherUserId + "/" + state.userDetails.userId
      ),
      payload.message
    );
  },
};

const getters = {
  users: (state) => {
    let filteredUsers = {};
    Object.keys(state.users).filter((key) => {
      if (key != state.userDetails.userId) {
        filteredUsers[key] = state.users[key];
      }
    });
    return filteredUsers;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
