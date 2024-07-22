'use server';

import { redirect } from 'next/navigation';
import { auth, signIn, signOut } from './auth';
import { createBooking, deleteBooking, getBooking, updateBooking, updateGuest } from './data-service';
import { revalidatePath } from 'next/cache';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateProfile(formData) {
  const guest = await OnlyLoggedIn();

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  validateNationalId(nationalID);

  await updateGuest(guest.id, { nationalID, nationality, countryFlag });
  revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
  const guest = await OnlyLoggedIn();
  const booking = await getBooking(bookingId);

  if (guest.id !== booking.guestId) throw new Error('You can not delete this reservation');

  // await new Promise(setTimeout(() => {}, 2000));
  // throw new Error();

  await deleteBooking(bookingId);

  revalidatePath('/account/reservations');
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get('bookingId'));
  const numGuests = Number(formData.get('numGuests'));
  const observations = formData.get('observations');

  const guest = await OnlyLoggedIn();
  const booking = await getBooking(bookingId);

  if (guest.id !== booking.guestId) throw new Error('You can not uddate this reservation');

  await updateBooking(bookingId, { numGuests, observations });

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect('/account/reservations');
}

export async function bookCabin(pathname, bookData, formData) {
  const session = await auth();
  const numGuests = +formData.get('numGuests');
  const observations = formData.get('observations');

  bookData.numGuests = numGuests;
  bookData.observations = observations;
  bookData.guestId = session.user.id;
  bookData.extrasPrice = 0;
  bookData.totalPrice = bookData.cabinPrice;
  bookData.isPaid = false;
  bookData.hasBreakfast = false;
  bookData.status = 'unconfirmed';

  await createBooking(bookData);

  revalidatePath(pathname);
  redirect('/thank-you');
}

/*





*/

async function OnlyLoggedIn() {
  const session = await auth();

  if (!session) throw new Error('You are not logged in');
  return session.user;
}

function validateNationalId(nationalID) {
  const isValid = /^[a-zA-Z0-9]{6,12}$/.test(nationalID);

  if (!isValid) throw new Error('National Id is not valid');
  return isValid;
}
