function createDataBase() {
    const OBJECT_KEYS = ['title', 'description'];
    const API_BASE_URL = 'http://localhost:3000/api/items';

    const validateObject = (obj) => {
        if (typeof obj !== 'object') return false;
        return OBJECT_KEYS.every(key => obj.hasOwnProperty(key));
    };

    const handleResponse = async (response) => {
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Network error' }));
            throw new Error(error.error || 'Request failed');
        }
        return response.json();
    };

    const getData = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            return [];
        }
    };

    const setData = async (data) => {
        if (!validateObject(data)) return null;

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to create item:', error);
            return null;
        }
    };

    const deleteData = async ({ id }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to delete item:', error);
            return null;
        }
    };

    const updateData = async (id, data) => {
        if (!validateObject(data)) return null;

        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Failed to update item:', error);
            return null;
        }
    };

    return { getData, setData, deleteData, updateData };
}

export const dataBase = createDataBase();
