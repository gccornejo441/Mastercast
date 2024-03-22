import { useState } from "react";


/**
 * Fetches session data from the specified URL and logs the response data or error.
 *
 * @param {string} url - The URL to fetch session data from.
 * @return {void} This function does not return anything.
 */
const useSessionEngine = (url: string) : string => {
    const [sessionId, setSessionId] = useState<string>('');
    
    fetch(url, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', JSON.stringify(data.sessionId));
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        return "Hi";
}

export default useSessionEngine;