export default {
  //specifies the test environment to be used by Jest.
  testEnvironment: "node", //node indicates that the tests will run in a Node.js environment.
  transform: {
    //regular expression pattern to match JavaScript and JSX files.
    //these files will be transformed using babel-jest before running the tests.
    "^.+\\.jsx?$": "babel-jest",
  },
};
