<template>
    <div class="auth">
        <img src="@/assets/img/auth.jpg" alt="" class="auth__img">
        <div class="auth__content">
            <div class="container auth__content-content">
                <form class="auth__content-form" @submit.prevent="">
                    <h1 class="auth__content-title">
                        {{ $t('info.login') }}
                    </h1>
                    <input type="text" class="auth__content-input" :placeholder="$t('info.name')" v-model="name" required>
                    <input type="email" class="auth__content-input" :placeholder="$t('info.email')"  v-model="email" required>
                    <input type="password" class="auth__content-input" :placeholder="$t('info.password')" v-model="password" required>
                    <button class="auth__content-btn" @click="registrationHeandler">
                        {{ $t('info.login') }}
                    </button>
                     <div class="auth__content-sigIn">
                         <h3 class="auth__content-subTitle">
                           {{ $t('info.haveAcc') }}
                        </h3>
                        <router-link :to="$i18nRoute({ name: 'Login' })" class="auth__content-registration">
                            {{ $t('info.registration') }}
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            name: ''
        }
    },
    methods: {
        async registrationHeandler () {
            try {
                await this.$store.dispatch('register', {
                    email: this.email,
                    password: this.password,
                    name: this.name
                })
                this.$router.push(this.$i18nRoute({ name: 'Login' }))
            } catch (e) {}

        }
    }
}
</script>