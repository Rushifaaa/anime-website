import { AnimeDetails } from "../components/pages/AnimeSchedule";

class AnimeModel {
    currentSelectedAnime?: AnimeDetails;

    async getAnime(id: number) {

        const response = await fetch(
            `http://localhost:8080/v3/anime/${id}`,
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


