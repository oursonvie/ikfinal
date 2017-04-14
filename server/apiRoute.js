var bodyParser = Meteor.npmRequire( 'body-parser' );

// Define our middleware using the Picker.middleware() method.
Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.route( '/api/student/:_id', function( params, request, response, next ) {

  var getDocument = Students.findOne( { "_id": params._id } );

  if ( getDocument ) {
    response.setHeader( 'Content-Type', 'application/json' );
    response.statusCode = 200;
    response.end( JSON.stringify( getDocument ) );
  } else {
    response.setHeader( 'Content-Type', 'application/json' );
    response.statusCode = 404;
    response.end( JSON.stringify( { error: 404, message: "Document not found." } ) );
  }
});
