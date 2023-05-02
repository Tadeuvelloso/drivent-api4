import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import bookingRepository from '@/repositories/booking-repository';
import { dontHavePermissionToAccess } from '@/errors/no-have-permission-to-access-error';

async function checkUserData(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw dontHavePermissionToAccess();
  }
}

async function getBooking(userId: number) {
  const userBooking = await bookingRepository.findBooking(userId);

  if (!userBooking) throw notFoundError();
  return userBooking;
}

async function postBooking(userId: number, roomId: number) {
  await checkUserData(userId);

  const roomExistence = await bookingRepository.findRooom(roomId);
  if (!roomExistence) throw notFoundError();
  if (roomExistence.Booking.length !== 0) throw dontHavePermissionToAccess();

  await bookingRepository.insertBooking(userId, roomId);
  const userBooking = await bookingRepository.findBooking(userId);
  if (!userBooking) throw notFoundError();
  return { bookingId: userBooking.id };
}

async function putBooking(userId: number, roomId: number, bookingId: number) {
  await checkUserData(userId);
  const userOldBooking = await bookingRepository.findByBookingId(bookingId);
  if (!userOldBooking) throw notFoundError();

  const roomExistence = await bookingRepository.findRooom(roomId);
  if (!roomExistence) throw notFoundError();
  if (roomExistence.Booking.length !== 0) throw dontHavePermissionToAccess();

  await bookingRepository.updateBooking(roomId, bookingId);
  const userBooking = await bookingRepository.findByBookingId(bookingId);
  if (!userBooking) throw notFoundError();
  return { bookingId: userBooking.id };
}

const bookingService = {
  getBooking,
  postBooking,
  putBooking,
};

export default bookingService;
