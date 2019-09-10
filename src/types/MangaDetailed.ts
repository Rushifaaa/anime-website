import { DetailDate, DetailEntry } from './AnimeDetailed';

export interface MangaDetail {
    mal_id: string;
    url: string | null;
    image_url: string | undefined;
    title: string | null;
    publishing: boolean | null;
    synopsis: string | null;
    type: string | null;
    chapters: number | null;
    volumes: number | null;
    score: number | null;
    start_date: string | null;
    end_date: string | null;
    members: number | null;
}

export interface MangaDetailed {
    mal_id: number | null;
    url: string | null;
    image_url: string | undefined;
    trailer_url: string | null;
    title: string | null;
    title_english: string | null;
    title_japanese: string | null;
    title_synonyms: [string] | null;
    type: string | null;
    volumes: number | null;
    chapters: number | null;
    status: string | null;
    publishing: boolean | null;
    published: {
        from: string | null;
        to: string | null;
        prop: {
            from: DetailDate;
            to: DetailDate;
        },
        string: string | null;
    };
    score: number | null;
    scored_by: number | null;
    rank: number | null;
    popularity: number | null;
    members: number | null;
    favorites: number | null;
    synopsis: string | null;
    background: string | null;
    related: {
        Adaption: DetailEntry[] | null;
        Other: DetailEntry[] | null;
        Summary: DetailEntry[] | null;
    };
    authors: DetailEntry[] | null;
    seralizations: DetailEntry[] | null;
    genres: DetailEntry[] | null;
}

export interface Characters {
    mal_id: number | null;
    url: string | null;
    image_url: string | undefined;
    name: string | null;
    role: string | null;
}

export interface Articles {
    url: string | null;
    title: string | null;
    date: string | null;
    author_name: string | null;
    author_url: string | null;
    forum_url: string | null;
    image_url: string | undefined;
    comments: number | null;
    intro: string | null;
}

export interface Pictures {
    small: string | undefined;
    large: string | undefined;
}

interface stats_detail {
    votes: number;
    percentage: number;
}

export interface Stats {
    reading: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_read: number;
    scores: {
        1: stats_detail;
        2: stats_detail;
        3: stats_detail;
        4: stats_detail;
        5: stats_detail;
        6: stats_detail;
        7: stats_detail;
        8: stats_detail;
        9: stats_detail;
        10: stats_detail;
    }
}

export interface Forum {

}

export interface MoreInfo {

}

export interface Reviews {

}

export interface Recommendations {

}

export interface UserUpdates {

}