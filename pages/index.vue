<template>
    <section id="landing-section" class="bg-gradient-primary">
        <span class="overlay bg-gradient-dark" :class="overlayClass" />
        <span class="overlay bg-gradient-info" :class="overlay2Class" />
        <search @focused="changeFocus" />
        <vue-particles color="#dedede" class="particles" />

        <div v-show="resultsCount > 0" class="container">
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
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import velocity from 'velocity-animate'
import Search from '../components/homepage/search'
import CustomCard from '../components/homepage/custom-card'

export default {
    name: 'HomePage',

    components: {
        CustomCard,
        Search
    },

    data () {
        return {
            focused: false
        }
    },

    computed: {
        overlayClass () {
            return (!this.focused && this.resultsCount !== 0) ? 'active' : ''
        },
        overlay2Class () {
            return (this.focused) ? 'active' : ''
        },
        ...mapGetters({
            resultsCount: 'movies/resultsCount',
            results: 'movies/results'
        })
    },

    methods: {
        changeFocus (newVal) {
            this.focused = newVal
        },

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
    },

    head () {
        return {
            title: 'Movie Findie'
        }
    }
}
</script>

<style lang="scss">
#landing-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background-color 0.3s;
    overflow: hidden;

    .container {
        z-index: 1;
    }

    .overlay {
        content: "";
        opacity: 0;
        z-index: 0;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: opacity .3s;
        pointer-events: none;
        &.active {
            opacity: 1;
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

    .card {
        cursor: pointer;
        transition: all .3s;
        box-shadow: rgba(0, 0, 0, 0.3) 0 0 20px;

        &:hover {
            z-index: 10;
        }

        .reflection {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
            left: 0;
            top: 0;
            transition: all .1s ease;
            opacity: 0;
            mix-blend-mode: soft-light;
        }
    }
}
</style>
