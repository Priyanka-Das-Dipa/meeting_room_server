

const addRoomBooking = async () =>{
    const result = await bookingValidation.create(payload);
  return result;
}