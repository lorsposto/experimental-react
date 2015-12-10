var express = require('express'),
    router = express.Router(),
    JSX = require('node-jsx').install(),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    match = require('react-router').match,
    RoutingContext = React.createFactory(require('react-router').RoutingContext),
    routes = require('../components/routes.jsx');

router.get('/', function(req, res, next) {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(ReactDOMServer.renderToString(RoutingContext({
        history: renderProps['history'],
        location: renderProps['location'],
        components: renderProps['components'],
        routes: renderProps['routes'],
        params: renderProps['params']
      })))
    } else {
      res.status(404).send('Not found')
    }
  });
  //res.render('recipes', {
  //  reactOutput: ReactDOMServer.renderToString(Browser({})),
  //  data: '',
  //  scripts: ''
  //});
});

module.exports = router;
