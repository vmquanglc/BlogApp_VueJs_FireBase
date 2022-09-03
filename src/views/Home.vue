<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" v-if="!user"/>
    <BlogPost
      v-for="(item, index) in blogPostsFeed"
      :key="index"
      :post="item"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View more recent blogs</h3>
        <div class="blog-cards">
          <BlogCard v-for="(item, index) in blogPostsCards" :key="index" :post="item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
import BlogCard from "../components/BlogCard";
export default {
  name: "Home",
  components: { BlogPost, BlogCard },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome to my Blogs",
        blogPost: "",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "This's filter title",
          blogHTML: "This is a filter",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This's filter title 2",
          blogHTML: "This is a filter 2",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
      
    };
  },
  computed:{
    user() {
      return this.$store.state.user;
    },
    // sampleBlogCards(){
    //   const me = this;
    //   return me.$store.state.sampleBlogCards;
    // }
    blogPostsCards(){
      return this.$store.getters.blogPostsCards
    },
    blogPostsFeed(){
      return this.$store.getters.blogPostsFeed
    }
  }
};
</script>
<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>