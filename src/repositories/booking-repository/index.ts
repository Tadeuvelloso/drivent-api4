import { prisma } from '@/config';

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

async function findByBookingId(bookingId: number) {
  return prisma.booking.findFirst({
    where: { id: bookingId },
    include: { Room: true },
  });
}

async function insertBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: { userId, roomId },
  });
}

async function updateBooking(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { roomId },
  });
}

async function findRooom(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
    include: { Booking: true },
  });
}
const bookingRepository = {
  findBooking,
  insertBooking,
  updateBooking,
  findRooom,
  findByBookingId,
};

export default bookingRepository;
