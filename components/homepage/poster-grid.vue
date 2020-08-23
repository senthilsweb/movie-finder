<template>
    <div class="container">
        <b-card-group columns>
            <transition-group
                name="fade"
                :css="false"
                @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave"
            >
                <custom-card
                    v-for="result in results"
                    :key="result.imdbID"
                    :result="result"
                />
            </transition-group>
        </b-card-group>
    </div>
</template>

<script>
import velocity from 'velocity-animate'
import { mapGetters } from 'vuex'
import CustomCard from './custom-card'
export default {
    name: 'PosterGrid',
    components: {
        CustomCard
    },

    computed: mapGetters({
        results: 'movies/results'
    }),

    methods: {

        // Transition methods
        beforeEnter (el) {
            el.style.opacity = 0
        },
        enter (el, done) {
            const delay = el.dataset.index * 150
            setTimeout(() => {
                velocity(el, { opacity: 1 }, { complete: done })
            }, delay)
        },
        leave (el, done) {
            const delay = el.dataset.index * 150
            setTimeout(() => {
                velocity(el, { opacity: 0 }, { complete: done })
            }, delay)
        }
    }
}
</script>

<style lang="scss">
.card-columns {
    @media (max-width: 768px) {
        column-count: 3 !important;
    }
    @media (max-width: 500px) {
        column-count: 2 !important;
    }
}
</style>
