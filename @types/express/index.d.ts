import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userEmail?: string;
      userId?: string;
      isSeller: boolean = false;
    }
  }
}
