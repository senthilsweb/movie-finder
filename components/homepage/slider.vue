<template>
    <div class="container">
        <b-carousel
            v-model="slide"
            controls
            indicators
            :interval="0"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
        >
            <b-carousel-slide v-for="result in results" :key="result.imdbID">
                <template v-slot:img>
                    <b-row class="bg-gradient-dark text-white">
                        <b-col class="text-center" cols="12" md="6">
                            <nuxt-link :to="'movie/' + result.imdbID">
                                <img :src="result.Poster" :alt="result.Title" class="img-fluid">
                            </nuxt-link>
                        </b-col>
                        <b-col class="p-5" cols="12" md="6">
                            <nuxt-link :to="'movie/' + result.imdbID">
                                <h2 class="text-white">{{ result.Title }}</h2>
                            </nuxt-link>
                            <b-badge variant="primary" class="mb-3 p-2">{{ result.Year }}</b-badge>
                            <dl>
                                <dt>Directed By</dt>
                                <dd>{{ details.Director }}</dd>
                                <dt>Actors</dt>
                                <dd>{{ details.Actors }}</dd>
                                <dt>Plot</dt>
                                <dd>{{ details.Plot }}</dd>
                            </dl>
                        </b-col>
                    </b-row>
                </template>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Slider',

    data () {
        return {
            slide: -1,
            sliding: null,
            details: {}
        }
    },

    computed: mapGetters({
        results: 'movies/results'
    }),

    watch: {
        async slide (newVal) {
            const id = this.results[newVal].imdbID
            this.details = await this.$api.get('/', { params: { i: id } })
        }
    },

    created () {
        this.slide = 0
    },
    destroyed () {
        this.slide = -1
        this.details = {}
    },

    methods: {
        onSlideStart () {
            this.sliding = true
            this.details = {}
        },
        onSlideEnd () {
            this.sliding = false
        }
    }
}
</script>

<style lang="scss">
.carousel-control-prev, .carousel-control-next {
    width: 30px;
    height: 30px;
    left: auto;
    top: 20px;
    right: 20px;
}
.carousel-control-prev {
    right: 60px;
}
</style>
