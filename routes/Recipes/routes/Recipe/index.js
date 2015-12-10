module.exports = {
    path: ':recipeid',

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Recipe'))
        })
    }
};