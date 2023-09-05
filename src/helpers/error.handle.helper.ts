import { Response } from "express";

const handleHttp = (res: Response, errorRaw?: any) => {
  return res.status(500).send({ errorRaw });
};

export { handleHttp };
