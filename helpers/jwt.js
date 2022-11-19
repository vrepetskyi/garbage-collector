const jwt = require("jsonwebtoken");
import { serialize, CookieSerializeOptions } from "cookie";

const expiresIn = 60 * 60 * 24 * 7;

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
}

export function setTokenCookie(res, id) {
  const token = generateToken(id);

  const options = {
    ...CookieSerializeOptions,
    path: "/",
    expires: new Date(Date.now() + expiresIn * 1000),
  };

  res.setHeader("Set-Cookie", serialize("token", token, options));
}

export function validateToken(req) {
  try {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
  } catch {
    return false;
  }
}
