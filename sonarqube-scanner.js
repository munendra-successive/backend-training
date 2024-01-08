const scanner = require("sonarqube-scanner");
// eslint-disable-next-line @typescript-eslint/typedef
const userToken = "squ_5a86e50584173f8daea8ec4f59bf5a7e73b376ad";
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: userToken,
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/__tests__/**,src/middlewares/**,src/server.ts",
    },
  },
  () => process.exit()
);