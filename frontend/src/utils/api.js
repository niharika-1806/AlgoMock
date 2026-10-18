export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://algomock-backend-cf9v.onrender.com";

export async function apiFetch(endpoint, options = {}) {

    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    if (response.status === 401) {

    localStorage.removeItem("token");

    window.dispatchEvent(
        new Event("authChange")
    );

    window.location.href = "/login";

    throw new Error("Session expired.");
}
    return response;
}