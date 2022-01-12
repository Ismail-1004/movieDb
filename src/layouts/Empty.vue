<template>
    <authHeader />
        <router-view />
</template>

<script>
import authHeader from '@/components/AuthHeader.vue'
export default {
    components: {
        authHeader
    }
}
</script>