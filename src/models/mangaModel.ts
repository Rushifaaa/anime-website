import { fetchDetails } from "./generalModel";

export const getManga = async (id: number) => {
    const response = await fetch(
        `https://api.jikan.moe/v3/manga/${id}`,
        {
            headers: {
                Accept: 'application/json',
            }
        }
    );

    return response.json();
}

export const getMangaCharacters = async (id: number) => {
    const response = await fetchDetails("manga", "characters", id);
    return response.characters;
}

export const getMangaNews = async (id: number) => {
    const response = await fetchDetails("manga", "news", id);
    return response.articles;
}

export const getMangaPictures = async (id: number) => {
    const response = await fetchDetails("manga", "pictures", id);
    return response.pictures;
}

export const getMangaStats = async (id: number) => {
    const response = await fetchDetails("manga", "stats", id);
    return response;
}

export const getMangaForum = async (id: number) => {
    const response = await fetchDetails("manga", "forum", id);
    return response.topics;
}

export const getMangaReviews = async (id: number) => {
    const response = await fetchDetails("manga", "reviews", id);
    return response.reviews;
}

export const getMangaRecommendations = async (id: number) => {
    const response = await fetchDetails("manga", "recommendations", id);
    return response.recommendations;
}