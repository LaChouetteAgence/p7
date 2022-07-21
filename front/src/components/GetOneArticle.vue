<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <img v-if="imageUrl !== null" class="card-img-top" :src="imageUrl" :alt="title" />
        <img v-else class="card-img-top" src="@/../public/Images/No_image_available.jpg" alt="Pas d'image" />
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">{{ desc }}</p>
          <div class="card-btn-group">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary" aria-label="Supprimer" @click="deletePost"
                v-if="userId === this.user.userId || this.user.isAdmin === true">
                <i class="fa-solid fa-trash-can"></i>
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary" aria-label="Modifier" @click="modifyPost"
                v-if="userId === this.user.userId || this.user.isAdmin === true">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
            <div class="btn-like">
              <a @click="sendLike">
                <i v-if="onLike === false" class="fa-solid fa-thumbs-up iconLike"></i>
                <i v-else class="fa-solid fa-thumbs-up iconOnLike"></i>
              </a>
              <div class="countLike">
                {{ likes }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <small class="text-muted">{{ username }}</small>
          <small class="text-muted">{{ date }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
import { getOneArticle } from "@/utils/api.js";
import { deleteArticle } from "@/utils/api.js";
import { sendLike } from "@/utils/api.js";

export default {
  name: "CardArticle",
  data() {
    return {
      likes: 0,
      onLike: false,
      title: null,
      desc: null,
      username: null,
      date: null,
      imageUrl: null,
      userId: null,
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
    async deletePost() {
        var confirmPopUp = confirm(
          `Voulez-vous supprimer le post ${this.post.title} ?`
        );

        if (confirmPopUp) {
          const response = await deleteArticle(this.articleId, this.user.isAdmin)
          try {
            console.log(response);
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
        }
      },
    modifyPost() {
      router.push({
        name: "editarticle",
        params: { articleId: this.articleId },
      });
    },
    async sendLike() {
      const response = await sendLike(this.articleId, this.user.userId)
      try {
        this.likes = response.data.article.likes;
        const userInArray = response.data.article.usersLiked.includes(
          this.user.userId
        );
        if (userInArray) {
          this.onLike = true;
        } else {
          this.onLike = false;
        }
      }
      catch (error) {
        console.log(error)
      }
    },
  },
  async mounted() {
    const response = await getOneArticle(this.articleId)
    try {
      console.log(response)
      this.title = response.data.title,
        this.desc = response.data.description,
        this.username = response.data.username,
        this.date = response.data.date,
        this.userId = response.data.userId;
      if (response.data.imageUrl !== undefined) {
        this.imageUrl = response.data.imageUrl;
      }
      this.likes = response.data.likes;
      const userInArray = response.data.usersLiked.includes(this.user.userId);
      if (userInArray) {
        this.onLike = true;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped lang="scss">

@import "@/../public/variable.scss";
.row {
  justify-content: center;
  margin: 30px 0;
}
.col {
  flex: 0 0 80%;
  margin: 10px 0;
}

.card-img-top {
  height: 500px;
  width: auto;
  object-fit: cover;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.card-btn-group {
  display: flex;
  justify-content: space-between;
}

.btn-like {
  display: flex;
  align-items: center;
}

.countLike {
  display: flex;
  align-items: center;
  margin: 0 5px;
}

.iconLike {
  font-size: 20px;
  &:hover {
    color: green;
  }
}

.iconOnLike {
  color: green;
  font-size: 20px;
}

.btn-sm:hover {
  background-color: $color-primary;
}
</style>
