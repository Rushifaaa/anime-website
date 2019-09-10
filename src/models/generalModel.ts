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

export const handleEnterPress = (e: any, search: any) => {
    console.log(e.key);
    if (e.key === "Enter") {
        search();
    }

}