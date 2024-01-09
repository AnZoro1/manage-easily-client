import axios from "axios"

interface createObjectI {
    name: string,
    area: number,
    floors: string,
    address: string,
    isRented: boolean,
    rentalPrice: number,
    owner: string,
}

const API_URL = 'http://localhost:4000'

export const createObjectQuery = async (objectData: createObjectI) => {
    try {
        const { data } = await axios.post(`${API_URL}/createObject`, objectData)
        return data
    } catch (error) {
        return error
    }
}

export const getObjectsQuery = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/objects`)
        return data
    } catch (error) {
        return error
    }
}