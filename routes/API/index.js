module.exports = {
    path: 'api',

    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./routes/All')
            ])
        })
    }
};
