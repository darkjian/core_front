
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API is not defined in env.local');
}

export async function apiFetch(endpoint, options) {
    const url = `${API_URL}${endpoint}`;
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        let errorMessage = `fetching ${url} error`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
        } catch {

        }
        throw new Error(errorMessage);
    }

    return response.json();
}