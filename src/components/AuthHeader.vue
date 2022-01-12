<template>
  <header class="header__auth">
    <router-link :to="$i18nRoute({ name: 'Home' })" class="header__auth-logo">
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
  </header>
</template>

<script>
import { SUPPORT_LOCALES } from "@/i18n";

export default {
  methods: {
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
  }
};
</script>