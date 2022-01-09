const _apiBase = "https://norma.nomoreparties.space/api";

const getResource = async (url) => {
    const res = await fetch(`${_apiBase}${url}`);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
};

export { getResource };
