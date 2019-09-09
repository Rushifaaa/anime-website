import React from 'react';
export const fetchDetails = async (type: string, request: string, id: number) => {

    const response = await fetch(
        `https://api.jikan.moe/v3/${type}/${id}/${request}`,
        {
            headers: {
                Accept: 'application/json',
            }
        }
    );

    return response.json();

}