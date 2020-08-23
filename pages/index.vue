<template>
    <section id="landing-section" class="bg-gradient-primary" :class="landingClass">
        <span class="overlay bg-gradient-dark" :class="overlayClass" />
        <span class="overlay bg-gradient-info" :class="overlay2Class" />
        <search class="search-box" @focused="changeFocus" @fetchFinished="resultsActive=true" />
        <vue-particles color="#dedede" class="particles" />

        <poster-grid v-if="resultsActive && resultsCount > 0 && resultsMode === 'posters'" />
        <slider v-if="resultsActive && resultsCount > 0 && resultsMode === 'slider'" />

        <dont-click />
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '../components/homepage/search'
import PosterGrid from '../components/homepage/poster-grid'
import Slider from '../components/homepage/slider'
import DontClick from '../components/homepage/dont-click'

export default {
    name: 'HomePage',

    components: {
        DontClick,
        Slider,
        PosterGrid,
        Search
    },

    data () {
        return {
            focused: false,
            resultsActive: false
        }
    },

    computed: {
        overlayClass () {
            return (!this.focused && this.resultsCount !== 0) ? 'active' : ''
        },
        overlay2Class () {
            return (this.focused) ? 'active' : ''
        },
        landingClass () {
            return (this.resultsActive) ? 'active' : ''
        },
        ...mapGetters({
            resultsCount: 'movies/resultsCount',
            resultsMode: 'movies/resultsMode'
        })
    },

    destroyed () {
        this.$store.commit('movies/storeResults', [])
    },

    methods: {
        changeFocus (newVal) {
            this.focused = newVal
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
    transition: all 0.3s;
    overflow: hidden;
    position: relative;

    .search-box {
        transition: all 0.3s;
        margin-top: calc(50vh - 100px);
        position: relative;
        z-index: 5;
    }

    &.active {
        .search-box {
            margin-top: 3em;
        }
    }

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
        overflow: hidden;
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
