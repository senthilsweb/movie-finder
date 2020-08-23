export const state = () => ({
    searchResults: [],
    movieDetails: null,
    resultsMode: 'slider'
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
    },
    resultsMode (state) {
        return state.resultsMode
    }
}

export const mutations = {
    storeResults (state, results) {
        state.searchResults = results
    },
    setMovieDetails (state, details) {
        state.movieDetails = details
    },
    setResultViewMode (state, mode) {
        state.resultsMode = mode
    }
}
