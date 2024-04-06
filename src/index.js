import express, { json, urlencoded } from "express";
import apiRoutes from "./routes/index.js";
import bodyParser from "body-parser";
import {
    DatabaseConfig,
    ServerConfig,
    CloudinaryConfig,
} from "./config/index.js";

const app = express();

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

CloudinaryConfig.connect();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(
        `Successfully started the server on PORT : ${ServerConfig.PORT}`
    );
    await DatabaseConfig.connect();
    console.log("MongoDB database connect");
});
