interface ServerConfig {
  DEV_MODE: string;
  PORT: number;
  DUMMY_TOKEN: string;
  JWT_SECRET: string;
}

// Load configuration from .env file
const serverConfig: ServerConfig = {
  DEV_MODE: process.env.DEV_MODE || "development",
  PORT: parseInt(process.env.PORT || "8000"),
  DUMMY_TOKEN: process.env.DUMMY_TOKEN || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
};

export { serverConfig, ServerConfig };
