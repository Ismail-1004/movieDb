<template>
  <main class="main" >
    <section class="main__movies">
      <div class="container">
        <div class="main__movies-infoo">
          <h2 class="main__movies-title">MovieDb {{ $t('info.top') }} 250</h2>
          <form class="header__nav-form">
            <input type="text" class="header__nav-input" :placeholder="$t('info.search')" v-model="search">
          </form>
        </div>
        <transition-group name="fade" tag="div" class="main__movies-content">
          <div
            class="main__movies-item"
            v-for="(item, index) of filterMovies"
            :key="index"
          >
            <img
              :src="`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`"
              class="main__movies-img"
            />
            <div class="main__movies-info">
              <div class="main__movies-infos">
                <h3 class="main__movies-subTitle">
                  {{ item.title }}
                </h3>
                <p class="main__movies-date">
                  {{ item.release_date }}
                </p>
                <p class="main__movies-text">
                  {{ item.overview }}
                </p>
              </div>
              <div class="main__movies-buttons">
                <router-link
                  :to="$i18nRoute({ name: 'Movie', params: { id: item.id } })"
                  class="main__movies-btn"
                >
                  {{ $t('info.more') }}
                </router-link>
                <h4 class="main__movies-rating" ref="average">
                  <span > {{ item.vote_average }} </span>
                </h4>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="main__movies-preloader" v-show="showPreloader">
          <div class="main__movies-element"></div>
        </div>
      </div>
    </section>
    <div class="main__arrow" :class="{ active__arrow: showUp}" @click="scrollUp" >
      <i class="fas fa-chevron-up"></i>
    </div>
  </main>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      arraOfFilms: [],
      showPreloader: true,
      page: 1,
      showUp: true,
      search: "",
      noMovies: false,
    };
  },
  methods: {
    async getAllMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=259c54c53e1db75ca5c5abe2e40a02d0&language=en-US-US&page=${this.page}`
      );
      const data = await response.json();
      
      if (this.arraOfFilms.length) {
        this.showPagination = true;
      }

      if (this.arraOfFilms.length != 40) {
        this.arraOfFilms.push(...data["results"]);
      }
    },
    scrollUp () {
      scrollTo(0,0)
    }
  },
  computed: {
    filterMovies () {
      return this.arraOfFilms.filter(movie => {
        return (movie.title.toLowerCase().indexOf(this.search) !== -1)
      })
    }
  },
  mounted() {
    if (this.showPreloader === true) {
      setTimeout(() => this.getAllMovies(), 1000);
      setTimeout(() => (this.showPreloader = false), 1000);
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      let clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        this.page++;
        this.getAllMovies();
      }

      if (scrollTop > 700) {
        this.showUp = false
      } else {
        this.showUp = true
      }
    });
  },
};
</script>
