import axios from "../../utils/axios";

export const getCar = async (id) => {
    const response = await axios.get(`api/cars/${id}`);
    return response.data;
}


export const addCarRequest = async () => {
    const response = await axios.post("api/cars/addcar");
    return response.data;
}


export const deleteCarRequest = async (id) => {
    const response = await axios.delete(`api/cars/deletecar/${id}`);
    return response.data;
}