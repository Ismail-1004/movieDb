<template>
  <main class="main">
    <section class="main__movies">
      <div class="container">
        <div class="main__movies-infoo">
          <h2 class="main__movies-title">MovieDb {{ $t("info.top") }} 250</h2>
          <form class="header__nav-form">
            <input
              type="text"
              class="header__nav-input"
              :placeholder="$t('info.search')"
              v-model="search"
            />
          </form>
        </div>
        <transition-group name="fade" tag="div" class="main__movies-content">
          <div
            class="main__movies-item"
            v-for="(item, index) of filterMovies"
            :key="index"
            v-show="getShowMovie"
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
                  {{ $t("info.more") }}
                </router-link>
                <h4 class="main__movies-rating" ref="average">
                  <span> {{ item.vote_average }} </span>
                </h4>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="main__movies-preloader" v-show="getPrelouder">
          <div class="main__movies-element"></div>
        </div>
      </div>
    </section>
    <div
      class="main__arrow"
      :class="{ active__arrow: showUp }"
      @click="scrollUp"
    >
      <i class="fas fa-chevron-up"></i>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      search: "",
      showUp: true,
      page: 1,
    };
  },
  methods: {
    ...mapActions(["getNowPlaying"]),
    scrollUp() {
      scrollTo(0, 0);
    },
  },
  computed: {
    ...mapGetters(["getFilms", "getPrelouder", "getShowMovie"]),
    filterMovies() {
      return this.getFilms.filter((movie) => {
        return movie.title.toLowerCase().indexOf(this.search) !== -1;
      });
    },
  },
  mounted() {
    if (this.getPrelouder === true) {
      this.getShowMovie;
      this.getNowPlaying();
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      let scrollTop = document.documentElement.scrollTop;

      if (scrollTop > 700) {
        this.showUp = false;
      } else {
        this.showUp = true;
      }
    });
  },
};
</script>
