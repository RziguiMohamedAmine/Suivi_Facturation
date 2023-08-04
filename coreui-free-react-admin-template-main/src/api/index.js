import axios from "axios";
import { getURL } from "src/utils/getURL";


// const url = "https://nextec-back.vercel.app/";
const url = getURL()

export const loginUser = async (user) => {
    try {

        const res = await axios.post(url + "/api/v1/auth/authenticate", user);
        return res
    }
    catch (e) {
        if (e.response && e.response.status >= 400
            && e.response.status <= 500)
            throw e
    }
}
export const registerUser = async (user) => {
    try {

        const res = await axios.post(url + "/api/v1/auth/register", user);
        return res
    }
    catch (e) {
        if (e.response && e.response.status >= 400
            && e.response.status <= 500)
            throw e
    }
}

export const successLogin = async (token) => {
    try {
        const res = await axios.get(url + "/Kpis/session/"+token, {
            headers: {
                authorization: "Bearer " + token,
            },
        });
        return res
    }
    catch (e) {
        if (e.response && e.response.status >= 400
            && e.response.status <= 500)
            throw e
    }
}

export const FetchKpi1 = async (token) => {
    try {
        const res = await axios.get(url + "/Kpis/getKpi1"+token, {
            headers: {
                authorization: "Bearer " + token,
            },
        });
        return res
    }
    catch (e) {
        if (e.response && e.response.status >= 400
            && e.response.status <= 500)
            throw e
    }
}




