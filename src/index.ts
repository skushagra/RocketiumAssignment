import App from "./app/app";
import Env from "./env";

// get port to listen on from environment variables
const PORT = Number(Env.PORT) || 2404;

// create new instance of App
const app = new App();

// start the app
app.start(PORT);