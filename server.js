import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "express-async-errors";
//security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
//routes
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

dotenv.config();
connectDB();

//swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],

  },
  apis: ['./routes/*.js']
};

const spec = swaggerJSDoc(options)


const app = express();

//middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobsRoutes);

app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log("server is running");
});
