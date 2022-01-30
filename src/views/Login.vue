<template>
    <div class="auth">
        <img src="@/assets/img/auth.jpg" alt="" class="auth__img">
        <div class="auth__content">
            <div class="container auth__content-content">
                <form class="auth__content-form" @submit.prevent="">
                    <h1 class="auth__content-title">
                        {{ $t('info.signin') }}
                    </h1>
                    <input type="email" class="auth__content-input" :placeholder="$t('info.email')" v-model="email" required>
                    <input type="password" class="auth__content-input" :placeholder="$t('info.password')" v-model="password" required>
                    <button class="auth__content-btn" @click="submitHandler">
                        {{ $t('info.signin') }}
                    </button>
                    <div class="auth__content-sigIn">
                        <h3 class="auth__content-subTitle">
                            {{ $t('info.dontHave') }}
                        </h3>
                        <router-link :to="$i18nRoute({ name: 'Registration' })" class="auth__content-registration">{{ $t('info.login') }}</router-link>
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
            password: ''
        }
    },
    methods: {
        async submitHandler () {
            const formData = {
                email: this.email,
                password: this.password
            }
            try {
                await this.$store.dispatch('login', formData)
                this.$router.push(this.$i18nRoute({ name: 'Home' }))
            } catch (e) {}
        },
        async logout () {
            await this.$store.dispatch('logout')
            this.$router.push('/registration')
        }
    },
}
</script>