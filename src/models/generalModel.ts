export const fetchDetails = async (type: string, request: string, id: number) => {

    const response = await fetch(
        `http://localhost:8080/v3/${type}/${id}/${request}`,
        {
            headers: {
                Accept: 'application/json',
            }
        }
    );

    return response.json();

}

