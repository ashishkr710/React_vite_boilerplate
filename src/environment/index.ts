interface Config {
  baseUrl: string;
  apiUrl: string;
  encryptionkey?: string;
  PORT?: string;
}

const local: Config = {
  baseUrl: "http://localhost:3387",
  apiUrl: "http://localhost:3387/api/v1",
  PORT: "",
};

const staging: Config = {
  baseUrl: "http://54.201.160.69:3387/",
  apiUrl: "http://54.201.160.69:3387/api/v1",
  encryptionkey: "",
  PORT: "",
};

const production: Config = {
  baseUrl: "http://54.245.60.143:3387/",
  apiUrl: "http://54.245.60.143:3387/api/v1",
  encryptionkey: "",
  PORT: "80",
};

let envConfig: Config;

if (process.env.NODE_ENV === "development") {
  envConfig = local;
} else if (process.env.NODE_ENV === "none") {
  envConfig = staging;
} else if (process.env.NODE_ENV === "production") {
  envConfig = production;
} else {
  envConfig = local;
}

export default envConfig;
