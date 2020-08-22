export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json'
            }
        },
        baseURL: 'https://www.omdbapi.com'
    })

    api.defaults.params = {}

    api.interceptors.request.use((config) => {
        config.params = { ...config.params, apiKey: '5b018803' }
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error)
    })

    api.interceptors.response.use((response) => {
        return response.data
    })

    // Inject to context as $api
    inject('api', api)
}
