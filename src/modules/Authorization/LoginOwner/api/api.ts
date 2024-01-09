import axios from "axios"

interface loginOwnerI {
    ownerName: string
    password: string
}

const API_URL = 'http://localhost:4000'

export const loginOwnerQuery = async (ownerData: loginOwnerI) => {
    try {
        const { data } = await axios.post(`${API_URL}/loginOwner`, ownerData)
        return data
    } catch (error) {
        return error
    }
}