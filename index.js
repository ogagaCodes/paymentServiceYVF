const mongoose = require("mongoose");
const app = require("./src/server");

mongoose
  .connect(process.env.MONGODBURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server has started!... and running on port ${PORT}`);
    });
  });
