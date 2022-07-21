<template>
  <nav>
    <h1><img id="logoHeader" src="../../public/Images/icon-left-font-monochrome-white.png" alt="logo-groupomania" /></h1>
    <div class="link">
      <div id="linkLeft">
        <div class="linkLeft">
          <router-link to="/" v-if="this.user.token !== null">Accueil</router-link>
        </div>
        <div class="linkRight">
          <router-link to="/login" v-if="this.user.token === null">Connexion</router-link>
        </div>
      </div>
      <div id="linkRight">
        <div class="linkRight">
          <router-link to="/login" v-if="this.user.token !== null" @click.prevent="disconnect">Deconnexion
          </router-link>
        </div>
        <div class=" linkRight">
          <router-link to="/signin" v-if="this.user.token === null">Inscription</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "../router/index.js";

export default {
  name: "NavBar",
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    disconnect() {
      const user = {
        userId: null,
        email: null,
        token: null,
        isAdmin: null
      }
      this.$store.commit("setUser", user);
      router.push({ name: 'login'})
    }
  }
}

</script>

<style scoped lang="scss">


@import "@/../public/variable.scss";

nav {
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $color-tertiary;
  @include mobile {
    flex-direction: column;
    height: 80px;
    width: 100%;
    padding: 0px 20px;
    justify-content: center;
  }
  #logoHeader {
    height: 40px;
    width: 233px;
    position: absolute;
    left: 50%;
    margin-left: -115px;
    top: 2%;
    @include mobile {
      height: 30px;
      width: 175px;
      position: static;
      margin-left: 0px;
    }
  }

  a {
    font-size: 20px;
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: $color-secondary;
    }
        &:hover {
          color: $color-primary;
        }
  }
}

#linkRight{
  display:flex;
  justify-content: end;
}

#linkRight,
#linkLeft {
  display: flex;
}

.link{
  display: flex;
  justify-content: space-between;
  width: 100%;
}

</style>