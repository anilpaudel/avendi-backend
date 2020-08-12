/**
 * @overview routes
 * Application Routing
*/


// unclassified routes
const auth = require('../controllers/auth');

// expose routes to the server.
exports.configure = function configure(app) {
  console.log('configuring routes.');

  app.get('', function(req, res, next) {
    res.status(200).json({message: 'Avendi Backend'});
  });

  // auth gateway
  app.post('/auth/login', auth.login);
  
  // // room
  // app.post('/room', room.create);
  // app.put('/room/:id', room.update);
  // app.get('/room', room.list);
  // app.get('/room/:id', room.details);
  // app.delete('/room/:id', room.remove);

  // // booking
  // app.post('/booking', booking.create);
  // app.put('/booking/:id', booking.update);
  // app.get('/booking', booking.list);
  // app.get('/booking/:id', booking.details);


};
