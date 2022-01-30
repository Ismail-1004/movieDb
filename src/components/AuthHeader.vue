<template>
  <header class="header__auth">
    <router-link :to="$i18nRoute({ name: '' })" class="header__auth-logo" @click="goBack">
      <i class="fas fa-film header__nav-icon"></i>
      <span class="header__nav-span">MovieDB</span>
    </router-link>
    <div class="header__auth-change" @click="changeLang">
      <img
        :src="getImgUrl($i18n.locale)"
        style="width: 86%; height: 86%; object-fit: cover"
        alt=""
        class="header__change-img"
      />
    </div>
    <transition name="fade" class="header__auth-error" v-show="showError">
      <span v-show="showError"> {{ errorMesage }}</span>
    </transition>
  </header>
</template>

<script>
import { SUPPORT_LOCALES } from "@/i18n";
import { mapMutations } from 'vuex'
import messages from '@/utils/messages'

export default {
  data() {
    return {
      errorMesage: '',
      showError: false
    }
  },
  methods: {
    ...mapMutations(['goBack']),
    scrollHeader() {
      this.currentScrollPos = window.pageYOffset;
      if (this.prevScrollPos > this.currentScrollPos) {
        this.$refs.header.style.top = "0";
      } else {
        this.$refs.header.style.top = "-70px";
      }

      this.prevScrollPos = this.currentScrollPos;
    },
    getImgUrl(pet) {
      const images = require.context("../assets/img/", false, /\.png$/);
      return images("./" + pet + "_fl.png");
    },
    async changeLang() {
      for (const lang in SUPPORT_LOCALES) {
        if (SUPPORT_LOCALES[lang] === this.$i18n.locale) {
          this.new_lang_id = parseInt(lang) + 1;
          if (this.new_lang_id >= SUPPORT_LOCALES.length) {
            this.new_lang_id = 0;
          }
          this.locale = SUPPORT_LOCALES[this.new_lang_id];

          const to = this.$router.resolve({
            params: { locale: this.locale },
          });

          this.$router.push(to.path);

          return;
        }
      }
    },
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      if (fbError) {
        this.errorMesage = messages[fbError.code] || 'Что-то пошло не так'
        this.showError = true
        setTimeout(() => {
           this.showError = false
        },1500)
      }
    }
  }
};
</script>