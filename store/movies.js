export const state = () => ({
    searchResults: [],
    movieDetails: null
})

export const getters = {
    results (state) {
        return state.searchResults.filter(item => item.Poster !== 'N/A')
    },
    movieDetails (state) {
        return state.movieDetails
    },
    resultsCount (state) {
        return state.searchResults.length
    }
}

export const mutations = {
    storeResults (state, results) {
        state.searchResults = results
    },
    setMovieDetails (state, details) {
        state.movieDetails = details
    }
}
