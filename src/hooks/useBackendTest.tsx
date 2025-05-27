import { useState, useEffect } from 'react';

const BackendTest = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/test')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch the backend message');
                return response.text(); // Since the backend is returning plain text
            })
            .then((data) => setMessage(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!message) return <div>Loading...</div>;

    return <div>Backend says: {message}</div>;
}

export default BackendTest;