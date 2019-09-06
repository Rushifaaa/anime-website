import { AnimeDetails } from "../components/pages/AnimeSchedule";

class AnimeModel {
    currentSelectedAnime?: AnimeDetails;

    async getAnime(id: number) {
        console.log("fetching...", id);
        const response = await fetch(
            `https://api.jikan.moe/v3/anime/${id}`,
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        );

        return response.json();
    }
}

export const animeModel = new AnimeModel();


