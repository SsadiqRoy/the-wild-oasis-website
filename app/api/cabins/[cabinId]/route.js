import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';

export async function GET(req, { params: { cabinId } }) {
  try {
    const [cabin, bookings] = await Promise.all([getCabin(cabinId), getBookedDatesByCabinId(cabinId)]);

    return Response.json({
      status: 'success',
      cabin,
      bookings,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 'failed',
      error: { message: `No cabin found` },
    });
  }
}
