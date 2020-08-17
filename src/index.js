const app = require("./app");
const port = process.env.PORT || 5000;
app.listen(3000, () => {
  console.log(`Listening: http://localhost:${port}`);
});
