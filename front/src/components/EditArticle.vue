<template>
  <div class="cardForm">
    <div class="form-edit-article">
      <form>
        <div class="form-floating mb-3">
          <input v-model="title" type="title" name="title" class="form-control" id="floatingInput title"
            placeholder="name@example.com" required />
          <label for="floating-title">titre</label>
        </div>
        <div class="form-floating">
          <textarea v-model="desc" type="description" name="description" class="form-control form-textarea" id="floating-description"
            placeholder="" required />
          <label for="floating-description">Description</label>
        </div>
        <div class="form-floating">
          <img class="cardImg" v-if="imageUrl !== undefined" :src="imageUrl" />
          <input type="file" name="inputFile" id="fileImg" @change="onFileChange" />
          <label class="label" for="inputFile"></label>
        </div>
        <div class="btnSignIn">
          <button type="submit" class="btn btn-primary" @click.prevent="modifyArticle">
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { modifyArticle } from "../utils/api";
import { getOneArticle } from "../utils/api";
import router from "../router/index.js";

export default {
  name: "EditArticle",
  data() {
    return {
      imageUrl: null,
      title: null,
      desc: null,
    };
  },
  computed: {
    articleId() {
      return this.$route.params.articleId;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async modifyArticle() {
      const data = new FormData();
      if (this.imageUrl !== null) {
        data.append("inputFile", this.imageUrl);
      }

      data.append("title", this.title);
      data.append("description", this.desc);
      data.append("isAdmin", this.user.isAdmin);

      if (this.titleChange === null && this.descChange === null) {
        alert("veuillez remplir le formulaire");
      } else {
        const response = await modifyArticle(this.articleId, data);
        try {
          console.log(response);
          router.push({ name: "home" });
        } catch (error) {
          console.log(error);
        }
      }
    },
    onFileChange(e) {
      this.imageUrl = e.target.files[0];
    },
  },
  async mounted() {
      const response = await getOneArticle(this.articleId);
      try {
        this.title = response.data.title,
          this.desc = response.data.description
        if (response.data.imageUrl !== undefined) {
          this.imageUrl = response.data.imageUrl;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
</script>

<style scoped lang="scss">
@import "@/../public/variable.scss";

.addArticle {
  background-color: white;
  width: 50%;
  margin: 50px auto auto auto;
  border-radius: 20px;
  padding: 10px 0 20px 0;
  box-shadow: 1px 1px 10px rgb(212 212 212);
}

textarea {
  width: 50%;
  height: 100px;
  margin-top: 15px;
}

input {
  margin-top: 20px;
}

.form-floating {
  width: 80%;
  margin: auto;
}

.cardForm{
  background-color: white;
  width: 80%;
  margin: auto;
  border-radius: 20px;
  padding: 10px 0 20px 0;
  box-shadow: 1px 1px 10px rgb(212 212 212);
  margin-top: 50px;
}

.form-textarea{
  width: 100%;
  min-height: 150px;
}

.btn-primary {
  background-color: $color-primary;
  margin-top: 20px;

  &:hover {
    background-color: $color-tertiary;
  }

  &:focus {
    background-color: $color-primary;
  }

  &-top {
    margin: 20px 0;
  }
}
</style>
