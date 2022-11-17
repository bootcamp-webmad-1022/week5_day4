require("dotenv/config")
require("./db")

const express = require("express")
const app = express()

require("./config")(app)

app.locals.appTitle = `RestaurApp_`

require("./routes")(app)

require("./error-handling")(app)

module.exports = app