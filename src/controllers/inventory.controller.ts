import { Request, Response } from "express";
import { handleHttp } from "../helpers/error.handle.helper";
import {
  TotalNotPayed,
  cumulativeFee,
  getInventoryActive,
  getInventoryById,
  isActiveInventory,
  modifyInventory,
  newInventory,
  totalPiceIsComplete,
} from "../services/inventory.service";

const createInventory = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await newInventory(body);
    if (response.isError) {
      return res.status(406).json({ message: response.message });
    }
    res.status(201).json({ data: response.data, message: response.message });
  } catch (e) {
    handleHttp(res, e);
  }
};

const getInventory = async (req: Request, res: Response) => {
  try {
    const response = await getInventoryActive();
    res.status(200).json({ data: response.data });
  } catch (e) {
    handleHttp(res, e);
  }
};

const getInventoryId = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const response = await getInventoryById(email);
    if (response.isError) {
      return res.status(406).json({ message: response.message });
    }
    res.status(200).json({ data: response.data });
  } catch (e) {
    handleHttp(res, e);
  }
};

const setCumulative = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await cumulativeFee(body);
    if (response.isError) {
      return res.status(406).json({ message: response.message });
    }
    res.status(200).json({ data: response.data });
  } catch (e) {
    handleHttp(res, e);
  }
};

const deleteInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const response = await isActiveInventory(id);
    if (response.isError) {
      return res.status(406).json({ message: response.message });
    }
    res.status(200).json({ message: response.message });
  } catch (e) {
    handleHttp(res, e);
  }
};

const totalPiceNotPayed = async (req: Request, res: Response) => {
  try {
    const response = await TotalNotPayed();
    res.status(200).json({ data: { fullAmountNotPaid: response } });
  } catch (e) {
    handleHttp(res, e);
  }
};

const totalPiceComplete = async (req: Request, res: Response) => {
  try {
    const response = await totalPiceIsComplete();
    res.status(200).json({ data: { fullAmountComplete: response } });
  } catch (e) {
    handleHttp(res, e);
  }
};

const updatedInventory = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const response = await modifyInventory(body);
    if (response.isError) {
      return res.status(406).json({ message: response.message });
    }
    res.status(200).json({ message: response.message });
  } catch (e) {
    handleHttp(res, e);
  }
};

export {
  createInventory,
  getInventory,
  getInventoryId,
  setCumulative,
  deleteInventory,
  totalPiceNotPayed,
  totalPiceComplete,
  updatedInventory,
};
