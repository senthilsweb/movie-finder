module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs'
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        indent: ['warn', 4],
        'vue/html-indent': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
    }
}
