<template>
    <section id="movie-details" class="bg-gradient-dark">
        <template v-if="details !== null">
            <div class="container">
                <div class="poster" :style="poster">
                    <div class="container">
                        <h1 class="mb-0">{{ details.Title }}</h1>
                        <b-badge variant="primary" class="mb-3 p-2">{{ details.Year }}</b-badge>
                        <dl>
                            <dt>Actors</dt>
                            <dd>{{ details.Actors }}</dd>
                            <dt>Plot</dt>
                            <dd>{{ details.Plot }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </template>
        <vue-particles color="#dedede" class="particles" />
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Movie',

    computed: {
        ...mapGetters({
            details: 'movies/movieDetails'
        }),
        pageTitle () {
            return (this.details !== null && this.details.Title) ? this.details.Title + ' - Movie Details' : 'Getting movie details...'
        },
        poster () {
            return { 'background-image': 'url("' + this.details.Poster.replace('._V1_SX300', '') + '")' }
        }
    },

    async created () {
        await this.$nextTick(async () => {
            const movie = await this.$api.get('', { params: { i: this.$route.params.id } })
            this.$store.commit('movies/setMovieDetails', movie)
        })
    },

    destroyed () {
        this.$store.commit('movies/setMovieDetails', null)
    },

    head () {
        return {
            title: this.pageTitle
        }
    }
}
</script>

<style lang="scss" scoped>
#movie-details {
    min-height: 100vh;

    .poster {
        height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        background: 50% 50% no-repeat;
        background-size: cover;
        color: #fff;
        position: relative;
        z-index: 1;

        .container {
            position: relative;
            padding-top: 200px;
            z-index: 1;
            background: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
        }
    }

    .particles {
        position:absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
}
</style>
