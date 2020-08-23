<template>
    <div class="text-white py-5">
        <h3>Similar Titles</h3>
        <div class="recommendations">
            <b-card
                v-for="m in items"
                :key="m.id"
                no-body
                class="overflow-hidden h-card"
            >
                <div class="d-flex flex-row">
                    <b-card-img
                        class="rounded-0"
                        :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + m.poster_path"
                        :alt="m.title"
                        @click="goToMovie(m.id)"
                    />
                    <b-card-body :title="m.title" class="bg-gradient-dark text-white pb-3">
                        <b-card-text>{{ limitText(m.overview) }}</b-card-text>
                    </b-card-body>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Recommendations',
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
        limitText (text) {
            return text.slice(0, 200) + '...'
        },
        async goToMovie (id) {
            const res = await this.$api.get(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=f187ec601eb1cd302d1bf2c5d15455ee`)
            this.$router.push('/movie/' + res.imdb_id)
        }
    }
}
</script>

<style scoped lang="scss">
.recommendations {
    height: 200px;
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    .h-card {
        width: 500px;
        height: 200px;
        display: flex;
        flex-direction: column;

        .card-img {
            flex-shrink: 0;
            flex-grow: 0;
            width: 133px !important;
            height: 200px !important;
            cursor: pointer;
        }
        .card-body {

        }
    }
}
</style>
