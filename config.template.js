exports.database = {
	host: "localhost",
	user: "root",
	password: "",
	database: "sendgrid"
};

exports.errorTracker = {
	url: "http://api.hotelquickly.com"
}

exports.healthyCheck = {
	tableName: "email_callback"
}

exports.server = {
	port: 8080
}