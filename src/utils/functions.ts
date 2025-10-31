import { SERVER_URL } from "./const";

export const canRegister = async () => {
    const response = await fetch(SERVER_URL+"/API/canRegister");
    const value = await response.text()
    return Boolean(Number(value));
}