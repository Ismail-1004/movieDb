<template>
    <Header />
    <router-view />
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    name: 'main-layout',
    components: {
        Header
    },
    async mounted () {
        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo')
        }
    }
}
</script>