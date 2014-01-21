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
	var post = {
		email : request.payload.email ? request.payload.email : null,
		smtp_id : request.payload.smtp_id ? request.payload.smtp_id : null,
		category : request.payload.category ? request.payload.category : null,
		timestamp : request.payload.timestamp ? request.payload.timestamp : null,
		event : request.payload.event ? request.payload.event : null,
		ins_dt : new Date(),
		ins_process_id : 'node.js'
	};

	var query = mysqlConnection.query('INSERT INTO email_callback SET ?', post,
		function(err, results) {
			if (err) {
				// Save the error
				errorCollector.log(request, err);

				// Close the connection with successful response and send status 503 (server error)
				var errorMsg = 'Error saving callback to database';
			    reply(errorMsg).code(503);
			}
		}
	);

	// Close the connection with successful response
    reply({ 
		status: 'OK'
   	});
};