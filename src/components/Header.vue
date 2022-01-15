<template>
  <header class="header" ref="header">
    <div class="container">
      <nav class="header__nav">
        <router-link
          :to="$i18nRoute({ name: 'Home' })"
          class="header__nav-logo"
          @click="goBack"
        >
          <i class="fas fa-film header__nav-icon"></i>
          <span class="header__nav-span">{{ $t("info.logo") }}</span>
        </router-link>
        <div class="header__more">
          
          <router-link
            :to="$i18nRoute({ name: 'Login' })"
            class="header__nav-btn"
          >
            {{ $t("info.login") }}
          </router-link>
          <div class="header__change" @click="changeLang">
            <img
              :src="getImgUrl($i18n.locale)"
              style="width: 86%; height: 86%; object-fit: cover"
              alt=""
              class="header__change-img"
            />
          </div>
          <div class="header__nav-menu" @click="showSide">
            <i class="fas fa-bars"></i>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <transition name="side">
    <div class="header__side" v-show="getShow">
      <div class="header__side-func">
        <router-link
          :to="$i18nRoute({ name: 'Home' })"
          class="header__nav-logo"
        >
          <i class="fas fa-film header__nav-icon"></i>
          <span class="header__nav-span">{{ $t("info.logo") }}</span>
        </router-link>
        <i
          class="fas fa-times header__side-close"
          @click="closeSide"
        ></i>
      </div>
      <div class="header__side-info">
        <h2 class="header__side-title">
          {{ $t("info.WhatAreYouLoking") }}
        </h2>
        <ul class="header__side-list">
          <li class="header__side-item" @click="goBack">
            <router-link
              to="/"
              class="header__side-link"
              @click="showNowPlaying"
            >
              {{ $t('info.ViewedNow') }}
            </router-link>
          </li>
          <li class="header__side-item" @click="goBack">
            <router-link
              to="/"
              class="header__side-link"
              @click="showTopReated"
            >
              {{ $t('info.TopReated') }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { SUPPORT_LOCALES } from "@/i18n";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      prevScrollPos: 0,
      currentScrollPos: 0,
    };
  },
  methods: {
    ...mapActions(["topReated",'getNowPlaying']),
    ...mapMutations(['showSide','closeSide','goBack']),
    showTopReated() {
      setTimeout(() => this.topReated(), 1000);
    },

    showNowPlaying() {
      setTimeout(() => this.getNowPlaying(), 1000);
    },
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
  computed: mapGetters(['getShow']),
  created() {
    window.addEventListener("scroll", this.scrollHeader);
  },
  unmounted() {
    window.removeEventListener("scroll", this.scrollHeader);
  },
};
</script>