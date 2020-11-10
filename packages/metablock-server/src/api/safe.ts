import { Request, Response } from "express";

type Handler = (req: Request, res: Response) => Promise<void>;

export default (executor: any): Handler => {
  return async (req: Request, res: Response) => {
    let response;
    try {
      response = await executor(req, res);
    } catch (exc) {
      response = exc;
    }
    res.status(response.status).json(response.data);
  };
};
