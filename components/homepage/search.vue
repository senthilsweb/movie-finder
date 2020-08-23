<template>
    <b-container class="smaller">
        <b-jumbotron bg-variant="transparent">
            <b-input
                v-model="query"
                size="lg"
                placeholder="Search for movies..."
                class="text-center search-input"
                autocomplete="off"
                :autofocus="true"
                @blur="$emit('focused', false)"
                @focus="$emit('focused', true)"
            />
            <div class="text-center text-white mode-switch">
                <strong class="text-small d-inline-block" @click="resultsMode=false">Slider</strong>
                <b-form-checkbox
                    v-model="resultsMode"
                    name="mode-switch"
                    switch
                    size="lg"
                    class="d-inline-block custom-switch"
                />
                <strong class="text-small d-inline-block" @click="resultsMode=true">Posters</strong>

                <a href="#" class="float-right about-link" @click.prevent="showAbout=true">About</a>
            </div>
        </b-jumbotron>

        <b-modal
            v-model="showAbout"
            centered
            button-size="sm d-none"
            header-bg-variant=" bg-gradient-primary text-white"
            body-bg-variant=" bg-gradient-primary"
            footer-class="d-none"
            title="About Me"
        >
            <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            />
        </b-modal>
    </b-container>
</template>

<script>
export default {
    name: 'Search',

    data () {
        return {
            results: [],
            query: '',
            bouncer: null,
            timer: null,
            showAbout: false
        }
    },

    computed: {
        resultsMode: {
            get () {
                return this.$store.getters['movies/resultsMode'] === 'posters'
            },
            set (value) {
                this.$store.commit('movies/setResultViewMode', value === true ? 'posters' : 'slider')
            }
        }
    },

    watch: {
        // I later found out that boootstrap-vue inputs already has a debouncing method built-in,
        // but wanted to keep it as is nevertheless :)
        query () {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => this.fetch(), 200)
        }
    },

    methods: {
        async fetch () {
            if (this.query.length >= 3) {
                const pattern = /tt([0-9]*)/
                let Search
                if (pattern.test(this.query)) {
                    Search = await this.$api.get('/', { params: { i: this.query } })
                    Search = [Search]
                } else {
                    const res = await this.$api.get('/', { params: { s: this.query } })
                    Search = res.Search
                }

                this.$store.commit('movies/storeResults', Object.values(Search ?? {}))
                if (this.$store.getters['movies/resultsCount'] > 0) {
                    setTimeout(() => this.$emit('fetchFinished'), 300)
                }
            }
        }
    }
}
</script>

<style lang="scss">
.container.smaller {
    max-width: 700px;
}
@media (min-width: 675px) {
    .search-input {
        font-size: 2em;
    }
    .btn-lg, .btn-group-lg > .btn {
        padding: 0.5rem 1rem 0.3rem;
    }
}
.mode-switch {
    line-height: 40px;
    .custom-switch {
        margin: 5px 0 0 10px;
        top: 3px;
    }
}
.about-link {
    transform: translateX(-20px);
    line-height: 50px;
    display: inline-block;
}
</style>
