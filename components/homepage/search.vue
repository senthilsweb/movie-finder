<template>
    <b-container>
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
            <b-form-group class="text-center mt-3">
                <b-form-radio-group
                    id="result-variation"
                    v-model="resultsMode"
                    :options="options"
                    button-variant="silver"
                    size="lg"
                    buttons
                    name="radios-btn-default"
                />
            </b-form-group>
        </b-jumbotron>
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
            options: [
                { text: 'Slider', value: 'slider' },
                { text: 'Posters', value: 'posters' }
            ]
        }
    },

    computed: {
        resultsMode: {
            get () {
                return this.$store.getters['movies/resultsMode']
            },
            set (value) {
                this.$store.commit('movies/setResultViewMode', value)
            }
        }
    },

    watch: {
        query () {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => this.fetch(), 200)
        }
    },

    methods: {
        async fetch () {
            if (this.query.length >= 3) {
                const { Search } = await this.$api.get('/', { params: { s: this.query } })

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
@media (min-width: 675px) {
    .search-input {
        font-size: 2em;
    }
    .btn-lg, .btn-group-lg > .btn {
        padding: 0.5rem 1rem 0.3rem;
    }
}
</style>
