import axios from "../../utils/axios";

export const getCars = async () => {
    const response = await axios.get("api/cars/getallcars");
    return response.data;
}
