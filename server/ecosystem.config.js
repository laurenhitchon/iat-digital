module.exports = {
  apps: [
    {
      name: "iat-digital-api-1",
      script: "server.js",
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        INSTANCE_ID: "1",
      },
    },
    {
      name: "iat-digital-api-2",
      script: "server.js",
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
        INSTANCE_ID: "2",
      },
    },
    {
      name: "iat-digital-api-3",
      script: "server.js",
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
        INSTANCE_ID: "3",
      },
    },
    {
      name: "iat-digital-api-4",
      script: "server.js",
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3004,
        INSTANCE_ID: "4",
      },
    },
  ],
}