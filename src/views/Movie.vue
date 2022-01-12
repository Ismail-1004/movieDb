<template>
  <section class="movie">
    <div
      class="movie__content"
      :class="{ active__modal: showModal }"
      v-show="showPage"
    >
      <img
        :src="`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`"
        alt=""
        class="movie__content-bg"
      />
      <div class="container movie__content-content">
        <div class="movie__content-item" @click="showModal = true">
          <img
            :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
            alt=""
            class="movie__content-img"
          />
          <div class="movie__content-watch">
            <h2 class="movie__content-show">
              <i class="fas fa-expand-arrows-alt"></i>
              {{ $t('info.view') }}
            </h2>
          </div>
        </div>
        <div class="movie__content-info">
          <h1 class="movie__content-title">
            {{ movie.title }}
          </h1>
          <div class="movie__content-date">
            <span>
              {{ $t('info.release') }} {{ movie.release_date }} 
            </span>
            <span v-for="item of movie.genres" :key="item.id">
               {{ item.name }}
            </span>
          </div>
          <div class="movie__content-rating">
            <div class="movie__content-ratingLine">
              <h3 class="movie__content-ratingInfo">
                {{ movie.vote_average }} 
              </h3>
            </div>
            <p class="movie__content-users"> {{ $t('info.users') }} </p>
          </div>
          <p class="movie__content-tagline">
            {{ movie.tagline }}
          </p>
          <div class="movie__content-infos">
            <h3 class="movie__content-description">
              {{ $t('info.descr') }}
            </h3>
            <p class="movie__content-descrText">
              {{ movie.overview }}
            </p>
          </div>
          <h2 class="movie__content-posters" v-if="movieImg.length > 10">
            {{ $t('info.posters') }}
          </h2>
          <div class="movie__content-relative">
            <div class="movie__content-scroll" ref="movie__scroll"  @scroll="handleMovieScrollIndicator" v-if="movieImg.length > 10">
              <div
              ref="movie__carousel"
              style="
              height: 100%; 
              display: flex; 
              transition: all 0.2s ease; 
              transform: translateX(0);"
              >
                <transition-group name="fade" appear>
                  <div
                    v-for="(item,index) in movieImg"
                    :key="index"
                  >
                    <div class="movie__wrapper"
                    style="height: 100%">
                      <div class="movie__wrapper-grayscale">
                        <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face'+item.file_path" alt="" style="width: 100%; height: 100%; object-fit: scale-down"
                        class="movie__wrapper-img">
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
              <transition name="fade">
                <div class="movie__controller left" 
                @click="handleMovieScroll(-1)"
                v-show="showMovieControl.all && showMovieControl.left">
                  <i class="fas fa-chevron-left"></i>
                </div>
              </transition>
              <transition name="fade">
                <div class="movie__controller right" 
                @click="handleMovieScroll(1)"
                v-show="showMovieControl.all && showMovieControl.right">
                  <i class="far fa-angle-right"></i>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main__movies-preloader" v-show="showPreloader">
      <div class="main__movies-element"></div>
    </div>
    <div class="movie__content-overlay" name="fade" v-show="showModal">
        <transition name="fade" class="movie__content-modal" v-show="showModal">   
          <div class="movie__content-modall">
            <div class="movie__content-image">
              <img :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`" alt="">
            </div>
            <i class="fas fa-times movie__content-close" @click="showModal = false"></i>
          </div>
        </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "Movie",
  props: ['id'],
  data() {
    return {
      showModal: false,
      showPage: false,
      showPreloader: true, 
      movie: [],
      movieImg: [],
      showMovieControl: {
        all: true,
        left: true,
        right: true
      }
    };
  },
  created() {
    this.getMovie(this.id);
    this.getMovieImg(this.id)
  },
  watch: {
    movieId() {
      this.getMovie(this.id);
      this.getMovieImg(this.id)
    },
    
  },
  methods: {
    show() {
      setTimeout(() => (this.showPage = true), 1000);
      setTimeout(() => (this.showPreloader = false), 1000);
    },
    async getMovie(id) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=259c54c53e1db75ca5c5abe2e40a02d0&language=en-US`
      );
      const data = await response.json();

      this.movie = data;
    },
    async getMovieImg (id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=259c54c53e1db75ca5c5abe2e40a02d0&language=en`)

        const data = await response.json()
        this.movieImg = data['posters']
    },
    handleMovieScroll(dir) {
      this.$refs.movie__scroll.scrollBy({
        left: this.$refs.movie__scroll.offsetWidth * dir,
        behavior: 'smooth'
      })
    },
    handleMovieScrollIndicator () {
      this.showMovieControl.all =
        this.$refs.movie__carousel.offsetWidth >= window.innerWidth - 300;

      this.showMovieControl.left = this.$refs.movie__scroll.scrollLeft !== 0;

      this.maxScrollLeft =
        this.$refs.movie__scroll.scrollWidth -
        this.$refs.movie__scroll.clientWidth;

      this.showMovieControl.right =
        this.$refs.movie__scroll.scrollLeft < this.maxScrollLeft;
    }   
  },    
  mounted() {
    this.show();
  },
};
</script>



  