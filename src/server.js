const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
// const enforce = require("express-sslify");

const routes = require("./modules/routes");
const createError = require("./helpers/createError");
const { RESPONSE } = require("./constants/response");
const { HTTP } = require("./constants/http");

const app = express();
// app.use(enforce.HTTPS({ trustProtoHeader: true })) // Force HTTPS connection (Does not work locally)

app.disable("x-powered-by");

// global middlewares
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

app.use(function (_err, _req, _res, _) {
  if (_err instanceof SyntaxError) {
    return _res.status(HTTP.BAD_REQUEST).json({
      code: HTTP.UNPROCESSABLE_ENTITY,
      status: RESPONSE.ERROR,
      message: "Invalid JSON payload passed.",
      data: null,
    });
  }
});

const apiRouter = express.Router();

// expose routes here
apiRouter.use(routes());

// handler for route-not-found
apiRouter.use((_req, _res, next) => {
  next(
    createError(HTTP.NOT_FOUND, [
      {
        code: HTTP.NOT_FOUND,
        status: RESPONSE.ERROR,
        message: "Route not found.",
        data: null,
      },
    ])
  );
});

// error handler for api router
apiRouter.use((error, _req, res, _next) => {
  console.log(error);
  const initialError = error;
  if (!error.statusCode) {
    error = createError(HTTP.SERVER_ERROR, [
      {
        code: HTTP.SERVER_ERROR,
        status: RESPONSE.ERROR,
        message: initialError.message || "Internal Server Error.",
        data: error.data,
        stack: error.stack,
      },
    ]);
  }

  return res.status(error.statusCode).json({
    code: error.code,
    status: error.status,
    message: error.message,
    data: error.data || null,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});


app.use('/payment', apiRouter);

module.exports = app;
