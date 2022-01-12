<template>
  <header class="header" ref="header">
    <div class="container">
      <nav class="header__nav">
         <router-link :to="$i18nRoute({ name: 'Home' })" class="header__nav-logo">
            <i class="fas fa-film header__nav-icon"></i>
            <span class="header__nav-span">{{ $t('info.logo') }}</span>
         </router-link>
         <div class="header__more">
               <router-link :to="$i18nRoute({ name: 'Login' })" class="header__nav-btn">
                  {{ $t('info.login') }}
               </router-link>
            <div class="header__change" @click="changeLang">
               <img 
                  :src="getImgUrl($i18n.locale)"
                  style="width: 86%; height: 86%; object-fit: cover"
                  alt="" class="header__change-img">
            </div>
            </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { SUPPORT_LOCALES } from '@/i18n'

export default {
   data() {
      return {
         prevScrollPos: 0,
         currentScrollPos: 0
      }
   },
   methods: {
      scrollHeader () {
         this.currentScrollPos = window.pageYOffset
         if(this.prevScrollPos > this.currentScrollPos) {
            this.$refs.header.style.top = '0'
         } else {
            this.$refs.header.style.top = '-70px'
         }

         this.prevScrollPos = this.currentScrollPos 
      },
      getImgUrl (pet) {
         const images = require.context('../assets/img/', false, /\.png$/)
         return images('./' + pet + '_fl.png')
      },
      async changeLang () {
         for(const lang in SUPPORT_LOCALES) {
            if(SUPPORT_LOCALES[lang] === this.$i18n.locale) {
               this.new_lang_id = parseInt(lang) + 1
               if(this.new_lang_id >= SUPPORT_LOCALES.length) {
                  this.new_lang_id = 0
               }
               this.locale = SUPPORT_LOCALES[this.new_lang_id]

               const to = this.$router.resolve({
                  params: { locale: this.locale }
               })

               this.$router.push(to.path)

               return
            }
         }
      }
   },
   created () {
      window.addEventListener('scroll', this.scrollHeader)
   },
   unmounted () {
      window.removeEventListener('scroll', this.scrollHeader)
   }
}
</script>