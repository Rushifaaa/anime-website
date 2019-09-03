import { AnimeDetails } from "../components/pages/Anime";

class AnimeModel {
    schedule?: {
        monday: AnimeDetails[];
        tuesday: AnimeDetails[];
        // wedn: AnimeDetails;
        // monday: AnimeDetails;
        // monday: AnimeDetails;
    };
    currentSelectedAnime?: AnimeDetails;
}

export const animeModel = new AnimeModel();


