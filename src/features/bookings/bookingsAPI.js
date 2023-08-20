import axios from "../../utils/axios";

export const getBookings = async () => {
    const response = await axios.get("/api/bookings/getallbookings");
    return response.data;
}
