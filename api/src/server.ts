import db from "../config/database.config";
import app from "./app";

db.sync({ force: true }).then(() => {
	console.log("connect to db");
});

const port = 3001;

app.listen(port, () => {
	console.log("server is running on port " + port);
});