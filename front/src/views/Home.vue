<template>
  <div class="home" v-if="this.user.token !== null">
    <AddArticle />
    <div class="row row-cols-3">
      <CardArticle v-for="post in allPosts" v-bind:key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import CardArticle from "../components/CardArticle.vue"
import AddArticle from "@/components/AddArticle.vue"
import { getAllArticles } from "@/utils/api"



export default {
  name: 'HomeArticle',
  data () {
    return {
      post: {
        title: "",
        description: "",
        imageUrl: "",
        username: "",
        date: ""
      },
      allPosts: [],
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  components: {
    CardArticle,
    AddArticle
},
  async mounted() {
    const response = await getAllArticles();
    try {
      console.log(response)
      this.allPosts = response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

</script>

<style scoped lang="scss">

@import "@/../public/variable.scss";

.row {
  margin: 0 10px;
  justify-content: center;
  flex-wrap: wrap-reverse;
  flex-direction: row-reverse;
  @include mobile {
  }
  @include tablet {
    
  }
}

h2 {
  font-size: 1.3em;
}

.title{
  margin-top: 20px;
  font-size: 30px;
}

</style>