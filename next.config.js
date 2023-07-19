/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async headers() {
    return [
      {
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET",
          },
        ],
      },
    ];
  },
};
