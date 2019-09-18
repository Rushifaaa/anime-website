
import React from 'react';
import { DetailEntry } from '../../../types/AnimeDetailed';

export const AnimeStatus = (props: {
    title: string;
    content: any;
}) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '125px',
            }}
        >
            <p
                style={{
                    width: 'auto',
                    textDecoration: 'underline',
                    fontStyle: 'oblique',
                    fontFamily: 'Baloo'
                }}
            >
                {props.title}
            </p>
            <p>{props.content}</p>
        </div>
    );

export const AnimeTheme = (props: {
    title: string;
    themes: string[] | null;
}) => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
        }}>
            <p style={{
                display: 'flex',
                alignItems: 'center',
                width: 'auto',
                //display: 'inline-block',
                textDecoration: 'underline',
                fontStyle: 'oblique',
                fontFamily: 'Baloo'
            }}>{props.title}</p>
            {props.themes
                && props.themes.map((theme, index) => (
                    <p key={index}>{theme}</p>
                ))
            }
        </div>
    )

export const AnimeDescription = (
    props: {
        synopsis: string | null;
        title: string;
    }) => (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            margin: '20px 0 20px 0',
        }}>
            <p style={{
                float: 'left',
                textAlign: 'start',
                maxWidth: 'auto',
                textDecoration: 'underline',
                fontStyle: 'oblique',
                fontFamily: 'Baloo'
            }}>
                <strong>{props.title}</strong>
            </p>
            <p style={{
                maxWidth: '80%',
                fontSize: '20px',
            }}>{props.synopsis}</p>
        </div>
    );

export const AnimeCredits = (props: {
    title: string;
    credits: DetailEntry[] | null;
    //AnimeDetailed.studio: string[];
}) => (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '10px',
        }}>
            <p style={{
                display: 'flex',
                alignItems: 'center',
                width: 'auto',
                //display: 'inline-block',
                textDecoration: 'underline',
                fontStyle: 'oblique',
                fontFamily: 'Baloo'
            }}>
                {props.title}
            </p>
            {props.credits
                && props.credits.map((credit) => (
                    <div key={credit.mal_id} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '10px',
                    }}>
                        <p>{credit.name}</p>
                    </div>
                ))}
        </div>
    );

export const AnimeDetailHeader = (props: {
    romajiTitle: string | null;
    englishTitle: string | null;
    japaneseTitle: string | null;
    genres: DetailEntry[] | null;
    imageUrl: string | undefined;
}) => (
        <div style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <p>{props.romajiTitle}</p>
            <p style={{ fontSize: '15px' }}>{props.englishTitle}</p>
            <p style={{ fontSize: '15px' }}>{props.japaneseTitle}</p>
            <img style={{
                float: 'left',
                margin: '20px',
                maxWidth: '15%',
                minWidth: '5%'
            }} src={props.imageUrl} alt={`${props.romajiTitle}`} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                marginTop: '20px',
                width: '10%',
                fontSize: '20px',
            }}>
                <p style={{
                    textAlign: 'start',
                    fontFamily: 'Baloo',
                    textDecoration: 'underline'
                }}>Genres: </p>
                {props.genres
                    && props.genres.map((g) => {
                        return (
                            <p key={g.mal_id} style={{
                                textAlign: 'left',
                                float: 'left',
                                margin: '5px',
                                maxWidth: 'auto',
                                fontSize: '18px'
                            }}>{g.name}</p>
                        );
                    })}
            </div>

        </div>
    );