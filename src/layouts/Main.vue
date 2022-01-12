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
    }
}
</script>