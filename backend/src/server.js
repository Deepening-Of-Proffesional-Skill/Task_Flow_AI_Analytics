
console.log("Server file loaded");
const app = require("./app");

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

