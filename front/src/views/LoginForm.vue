<template>
  <div class="cardForm">
    <h2>Connexion</h2>
    <div class="formLoginSignup">
      <p>
        Vous n'avez pas de compte ?<router-link to="/signin">
          Inscrivez-vous</router-link>
      </p>
      <form>
        <div class="form-floating mb-3">
          <input v-model="userLogin.email" type="email" class="form-control" id="floatingInput"
            placeholder="name@example.com" required />
          <label for="floatingInput">Adresse email</label>
          <div class="msg-err-email msg-err"></div>
        </div>
        <div class="form-floating">
          <input v-model="userLogin.password" type="password" class="form-control" id="floatingPassword"
            placeholder="Password" required />
          <label for="floatingPassword">Mot de passe</label>
          <div class="msg-err-password msg-err"></div>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="login">
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";
import router from "../router/index.js";
import { login } from "@/utils/api"

export default {
  name: "LoginForm",
  store,
  data() {
    return {
      userLogin: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async login() {
      //eslint-disable-next-line
      let emailRegex = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,4}$/;
      //eslint-disable-next-line
      let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      document.querySelector(".msg-err-email").innerHTML = "";
      document.querySelector(".msg-err-password").innerHTML = "";

      if (this.userLogin.email === null || this.userLogin.password === null) {
        alert("veuillez remplir le formulaire");
      } if (!this.userLogin.email.match(emailRegex)) {
        document.querySelector(".msg-err-email").innerHTML = "Veuillez choisir un email valide !";
      } if (!this.userLogin.password.match(passwordRegex)) {
        document.querySelector(".msg-err-password").innerHTML = "Veuillez choisir un mot de passe valide !";
      } else {
        const response = await login(this.userLogin.email, this.userLogin.password)
        try {
          console.log(response);
          const user = {
            userId: response.data.userId,
            email: this.userLogin.email,
            token: response.data.token,
            isAdmin: response.data.isAdmin,
            username: response.data.username,
          };
          this.$store.commit("setUser", user);
          router.push({ name: "home" });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">



@import "@/../public/variable.scss";
.cardForm {
  background-color: white;
  width: 50%;
  margin: auto;
  margin-top: 50px;
  border-radius: 20px;
  padding: 10px 0 20px 0;
  box-shadow: 1px 1px 10px rgb(212 212 212);
  @include tablet {
    width: 70%;
    margin: auto;
    margin-top: 25px;
  }
  @include mobile {
  width: 90%;
  margin-top: 25px;
  }
}

.form-floating {
  width: 80%;
  margin: auto;
}

.btn-primary {
  background-color: $color-tertiary;
  margin-top: 20px;
  &:hover {
    background-color: $color-primary;
  }
  &:focus {
    background-color: $color-tertiary;
  }
  &-top {
    margin: 20px 0;
  }
}

.msg-err{
  color: red;
}

</style>
