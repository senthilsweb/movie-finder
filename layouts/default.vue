<template>
    <div>
        <b-navbar class="text-center" fixed="top">
            <b-navbar-brand class="mx-auto text-white text-display text-lg bg-white text-primary px-3">
                <nuxt-link to="/">Movie Findie</nuxt-link>
            </b-navbar-brand>
        </b-navbar>
        <nuxt />
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" src="../assets/scss/app.scss" />
