/** @type {import('next').NextConfig} */
// const withAuth = (handler) => (req, res) => {
//   // Implement your authentication logic here
//   // For example, check for authentication cookies or tokens
//   if (localStorage.getItem("JWTToken")) {
//     return handler(req, res);
//   } else {
//     // Redirect to login or handle authentication failure
//     res.redirect("/login");
//   }
// };

const nextConfig = {
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/reset-password",
  //         destination: "/reset-password", // Publicly accessible route
  //       },
  //     ];
  //   },
};

module.exports = nextConfig;
