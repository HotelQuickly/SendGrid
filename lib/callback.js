// callback.js

var mysqlConnection;
var errorCollector;

exports.setErrorCollector = function(val) {
	errorCollector = val;
}

exports.setMysqlConnection = function(val) {
	mysqlConnection = val;
};

exports.handlerSaveCallback = function (request, reply) {

	var params = {
		email : request.payload.email ? request.payload.email : null,
		smtp_id : request.payload.smtp_id ? request.payload.smtp_id : null,
		category : request.payload.category ? request.payload.category : null,
		timestamp : request.payload.timestamp ? request.payload.timestamp : null,
		event : request.payload.event ? request.payload.event : null,
	};
	//console.log(params);

	var post = {
		email : params.email,
		smtp_id : params.smtp_id,
		category : params.category,
		timestamp : params.timestamp,
		event : params.event,
		ins_dt : new Date(),
		ins_process_id : 'node.js'
	};

	var query = mysqlConnection.query('INSERT INTO email_callback SET ?', post,
		function(err, results) {
			if (err) {
				// Save the error
				errorCollector.log(request, err);

				// Close the connection with successful response and send status 503 (server error)
				var error = Hapi.error.badRequest('Error saving callback to database');
			    error.output.statusCode = 503;
			    error.reformat();
			    
			    reply(error);
			}
		}
	);

	// Close the connection with successful response
    reply({ 
		status: 'OK'
   	});
};