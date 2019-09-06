export interface DetailEntry {
    mal_id: number;
    type: string;
    name: string;
    url: string;
};

interface DetailDate {
    day: number | null;
    month: number | null;
    year: number | null;
};

export interface AnimeDetailed {
    mal_id: number | null;
    url: string | null;
    image_url: string | undefined;
    trailer_url: string | null;
    title: string | null;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: [string] | null;
    type: string | null;
    source: string | null;
    episodes: number | null;
    status: string | null;
    airing: boolean | null;
    aired: {
        from: string | null;
        to: string | null;
        prop: {
            from: DetailDate;
            to: DetailDate;
        },
        string: string | null;
    };
    duration: string | null;
    rating: string | null;
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    synopsis: string | null;
    background: string | null;
    premiered: string | null;
    broadcast: string | null;
    related: {
        Adaption: DetailEntry[] | null;
        Other: DetailEntry[] | null;
        Summary: DetailEntry[] | null;
    };
    producers: DetailEntry[] | null;
    licensors: DetailEntry[] | null;
    studios: DetailEntry[] | null;
    genres: DetailEntry[] | null;
    opening_themes: string[] | null;
    ending_themes: string[] | null;
}
