<template>
  <div class="cardForm">
    <h2>Inscription</h2>
    <div class="formLoginSignup">
      <p>
        Vous avez déja un compte ?<router-link to="/login">
          Connectez-vous</router-link>
      </p>
      <form>
        <div class="form-floating mb-3">
          <input v-model="userSignin.username" type="email" class="form-control" id="floatingUsername"
            placeholder="Bernard" required />
          <label for="floatingUsername">Nom d'utilisateur</label>
          <div class="msg-err-username msg-err"></div>
        </div>
        <div class="form-floating mb-3">
          <input v-model="userSignin.email" type="email" class="form-control" id="floatingInput"
            placeholder="name@example.com" required />
          <label for="floatingInput">Adresse email</label>
          <div class="msg-err-email msg-err"></div>
        </div>
        <div class="form-floating">
          <input v-model="userSignin.password" type="password" class="form-control" id="floatingPassword"
            placeholder="Password" required />
          <label for="floatingPassword">Mot de passe</label>
          <div class="msg-err-password msg-err"></div>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="signUp">
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
import { signUp } from "@/utils/api"

export default {
  name: "SignIn",
  data() {
    return {
      userSignin: {
        email: null,
        password: null,
        username: null,
      },
    };
  },
  methods: {
    async signUp() {
      //eslint-disable-next-line
      let emailRegex = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,4}$/;
      //eslint-disable-next-line
      let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      //eslint-disable-next-line
      let usernameRegex = /^[a-zA-Z1-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s-]{3,60}$/;
      document.querySelector(".msg-err-username").innerHTML = "";
      document.querySelector(".msg-err-email").innerHTML = "";
      document.querySelector(".msg-err-password").innerHTML = "";

      if (this.userSignin.email === null || this.userSignin.password === null || this.userSignin.username === null) {
        alert("veuillez remplir le formulaire");
      } if (!this.userSignin.username.match(usernameRegex)) {
        document.querySelector(".msg-err-username").innerHTML = "Veuillez choisir un nom d'utilisateur valide !";
      } if (!this.userSignin.email.match(emailRegex)){
        document.querySelector(".msg-err-email").innerHTML = "Veuillez choisir un email valide !";
      } if (!this.userSignin.password.match(passwordRegex)) {
        document.querySelector(".msg-err-password")
          .innerHTML = "Veuillez choisir un mot de passe valide ! Il doit contenir au moins 8 caractères dont une majuscule, une minuscule et un chiffre";
      } else {
        const response = await signUp(this.userSignin)
        try {
          console.log(response);
          router.push({ name: "login" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">



@import "@/../public/variable.scss";

.cardForm {
  background-color: white;
  width: 50%;
  margin: 50px auto auto auto;
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

.msg-err {
  color: red;
}
</style>
