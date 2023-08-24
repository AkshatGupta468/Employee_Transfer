const express = require("express")
const morgan = require("morgan")
const AppError = require("./utils/appError")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const cors = require("cors")
const userRouter = require("./routes/userRoutes")

const app = express()

//Global middlewares

//Cross Origin Resource Sharing
app.use(cors())
//security HTTP header
app.use(helmet())

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

//Setting the rate limitter(allowing 100 requests)
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: "Too many requests from this IP, please try again in an hour",
})
app.use("/api", limiter)

//Reading data from body into req.body with data limit
app.use(
  express.json({
    limit: "10kb",
  })
)

//Data sanitization against NoSQL query injection
app.use(mongoSanitize())

app.use("/api/v1/users/", userRouter)
//app.all("*", (req, res, next) => {
//  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
//});
module.exports = app
