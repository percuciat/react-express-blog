import jwt from "jsonwebtoken";

type Payload = {
  id: string;
};

export const generateActiveToken = (payload: Payload) => {
  return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
    expiresIn: "5m",
  });
};

export const generateAccessToken = (payload: Payload) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: Payload) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "30d",
  });
};

export const refreshTokenTime = 30 * 24 * 60 * 60 * 1000; // 30 days
