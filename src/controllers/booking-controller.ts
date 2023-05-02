import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function postNewBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const roomId = req.body;
  if (!roomId) return res.sendStatus(404);
  try {
    const booking = await bookingService.postBooking(userId, Number(roomId));

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { bookingId } = req.params;
  const roomsId = req.body;

  try {
    const booking = await bookingService.putBooking(userId, Number(roomsId), Number(bookingId));

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
