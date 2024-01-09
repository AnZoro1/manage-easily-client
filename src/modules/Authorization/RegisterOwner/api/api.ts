import axios from "axios"

interface registerOwnerI {
    ownerName: string
    email: string
    password: string
}

const API_URL = 'http://localhost:4000'

export const registerOwnerQuery = async (ownerData: registerOwnerI) => {
    try {
        const { data } = await axios.post(`${API_URL}/registerOwner`, ownerData)
        return data
    } catch (error) {
        return error
    }
}