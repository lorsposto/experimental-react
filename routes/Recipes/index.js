module.exports = {
    path: 'recipes',

    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./routes/RecipeForm'),
                require('./routes/Recipe')
            ])
        })
    },

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/RecipeGrid'))
        })
    }
}
