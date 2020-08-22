<template>
    <b-container>
        <b-jumbotron bg-variant="transparent">
            <b-input
                v-model="query"
                size="lg"
                placeholder="Search for movies..."
                @blur="$emit('focused', false)"
                @focus="$emit('focused', true)"
            />
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
            timer: null
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
                this.$store.commit('movies/storeResults', Object.values(Search))
            }
        }
    }
}
</script>
