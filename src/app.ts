import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

const cors = require("cors");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
import express from "express";

const SERVER_ADD: string = "localhost";

const app: express.Application = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    // origin: `http://${SERVER_ADD}:9000`,
    origin: "https://brinahairbeauty.netlify.app",
    method: ["POST", "PUT", "DELETE", "GET", "PATCH"],
    credentials: true,
  })
);

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const serviceRoute = require("./routes/serviceRoute");

const base_url = `/api/v1`;

app.use(`${base_url}/auth/`, authRoute);
app.use(`${base_url}/user/`, userRoute);
app.use(`${base_url}/appointment/`, appointmentRoute);
app.use(`${base_url}/service/`, serviceRoute);

app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return res.status(400).json(error);
  }
);

const port = 5600;

app.listen(port, SERVER_ADD, () => {
  console.log(`Server is running on port ${port}`);
});
