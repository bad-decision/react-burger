const API_BASE = "https://norma.nomoreparties.space/api";

const getResource = async (url) => {
    const res = await fetch(`${API_BASE}${url}`);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
};

export { getResource };
