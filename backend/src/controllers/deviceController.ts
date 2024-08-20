import { Request, Response } from 'express';
import { Device as DeviceModel } from '../db';

export const getAllDevices = async (req: Request, res: Response) => {
  try {
    const devices = await DeviceModel.findAll();
    res.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({ error: 'Error al obtener los dispositivos' });
  }
};

export const createDevice = async (req: Request, res: Response) => {
  try {
    const { name, description, details, imageUrl } = req.body;
    const newDevice = await DeviceModel.create({ name, description, details, imageUrl });
    res.status(201).json(newDevice);
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).json({ error: 'Error al crear el dispositivo' });
  }
};

export const deleteDevice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const device = await DeviceModel.findByPk(id);
    if (!device) {
      return res.status(404).json({ error: 'Dispositivo no encontrado' });
    }
    await device.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({ error: 'Error al eliminar el dispositivo' });
  }
};

export const updateDevice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, details, imageUrl } = req.body;
    const device = await DeviceModel.findByPk(id);
    if (!device) {
      return res.status(404).json({ error: 'Dispositivo no encontrado' });
    }
    device.name = name;
    device.description = description;
    device.details = details;
    device.imageUrl = imageUrl;
    await device.save();
    res.json(device);
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).json({ error: 'Error al actualizar el dispositivo' });
  }
};