<template>
  <button type="button" class="btn btn-primary btn-primary-top" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
    aria-label="Creer un post">
    Creer un post
  </button>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-close">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form action="" method="get" id="formArticle" class="form-floating mb-3">
            <div class="mb-3">
              <input v-model="title" type="email" class="form-control" id="exampleFormControlInput1" placeholder="Titre"
                aria-label="Titre" />
            </div>
            <div class="mb-3">
              <textarea v-model="description" class="form-control" id="exampleFormControlTextarea1" rows="3"
                placeholder="Description" aria-label="Description"></textarea>
            </div>
            <div class="mb-3">
              <input class="form-control" type="file" name="inputFile" id="formFile" aria-label="Photo"
                @change="onFileChange" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-primary-center" @click.prevent="postArticle">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postArticle } from "@/utils/api"

export default {
  name: "AddArticle",
  data() {
    return {
      title: null,
      description: null,
      imageUrl: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async postArticle() {
      let dateNow = new Date();

      let dateLocal = dateNow.toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      const data = new FormData();
      if (this.imageUrl !== null) {
        data.append("inputFile", this.imageUrl);
      }
      data.append("description", this.description);
      data.append("title", this.title);
      data.append("userId", this.user.userId);
      data.append("username", this.user.username);
      data.append("date", dateLocal);

      if (this.title === null && this.description === null) {
        alert("veuillez remplir le formulaire");
      } else {
        const response = await postArticle(data);
        try {
          console.log(response);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    },
    onFileChange(e) {
      this.imageUrl = e.target.files[0];
    },
  },
};
</script>

<style scoped lang="scss">

@import "@/../public/variable.scss";
.modal-footer {
  display: flex;
  justify-content: center;
}

.modal-close {
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background-color: $color-tertiary;
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
</style>
