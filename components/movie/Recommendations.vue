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
                    <b-card-img :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + m.poster_path" :alt="m.title" width="70" height="200" class="rounded-0" />
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
            flex-shrink: 1;
            width: 133px;
            height: 200px;
        }
        .card-body {

        }
    }
}
</style>
