import { fetchAPI } from "../lib/api";
import { LoginCredential, LoginRes } from "../types";

export async function login(credential: LoginCredential): Promise<LoginRes> {
    const res = await fetchAPI<LoginRes>(`/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credential)
    })

    if (res.token) {
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", JSON.stringify(res.user))
    }

    return res
}

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
}
