const express = require("express");
const routes = require("./routes/user.js")
const app = express();

const port = process.env.PORT || 3000;

   
app.use(routes);

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})