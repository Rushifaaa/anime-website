export const getManga = async (mangaID: number) => {
    console.log("fetching...", mangaID);
    const response = await fetch(
        `https://api.jikan.moe/v3/manga/${mangaID}`,
        {
            headers: {
                Accept: 'application/json',
            }
        }
    );

    return response.json();
}