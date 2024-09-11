import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  // Get the JWT from cookies
  const token = request.cookies.jwt;

  if (!token) {
    return response.status(401).send("You are not authenticated!");
  }

  // Verify the JWT
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return response.status(403).send("Token is not valid!");
    }

    // Attach userId from the token payload to the request object
    request.userId = payload.userId;
    next();
  });
};
