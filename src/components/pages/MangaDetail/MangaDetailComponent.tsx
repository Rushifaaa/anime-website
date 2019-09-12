import React from 'react';
import { Characters, Pictures, Articles, Forum, Reviews, Recommendations } from '../../../types/MangaDetailed';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const MangaCharacter = (props: {
    characters: Characters[]
}) => {
    return (
        <div id="test" style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {props.characters.map((character) => (
                <div key={character.mal_id} style={{
                    width: '30%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img style={{
                        width: '100%',
                        padding: '20px'
                    }} src={character.image_url} alt={character.name + ""} />
                    <p style={{ display: 'inline-block' }}>{character.name}</p>
                </div>
            ))}
        </div>
    );
}

export const MangaNews = (props: {
    news: Articles[]
}) => {
    return (
        <div>
            {props.news.map((article, index) => (
                <div key={index} style={{
                    margin: '20px',
                }}>
                    <Button style={{ color: 'white', textAlign: 'start' }} href={article.url}>{article.intro}</Button>
                    <p style={{ padding: '6px 8px 6px 8px', fontSize: '13px' }}>{`by ${article.author_name}`}</p>
                </div>
            ))}
        </div>
    );
}

export const MangaPictures = (props: {
    pictures: Pictures[];
}) => (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            {props.pictures.map((picture, index) => (
                <div key={index} >
                    <img src={picture.small} alt={picture.small} />
                </div>
            ))}
        </div>
    );


export const MangaForum = (props: {
    topics: Forum[];
}) => (
        <div style={{
            width: '100%',
        }}>
            {props.topics.map((topic) => (
                <div style={{
                    margin: '20px',
                }} key={topic.topic_id}>
                    <Button style={{
                        color: 'white',
                        textAlign: 'start',
                        textDecoration: 'underline'
                    }} href={topic.url}>{topic.title}</Button>
                    <p style={{
                        padding: '6px 8px 6px 8px',
                        fontSize: '13px',
                    }}>
                        {`by ${topic.author_name}`}
                    </p>
                </div>
            ))}
        </div>
    );

export const MangaMoreInfo = () => (
    <div>No more Info</div>
)

export const MangaReviews = (props: {
    reviews: Reviews[];
}) => (
        <div>
            {props.reviews.map((review) => (
                <div style={{
                    margin: '20px'
                }} key={review.mal_id}>
                    <p style={{
                        textDecoration: 'underline',
                        fontFamily: 'Baloo',
                        fontSize: '20px'
                    }}><strong>Scores:</strong></p>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        margin: '30px'
                    }}>
                        <div style={{
                            margin: '0 10px 0 0',
                            display: 'flex'
                        }}>
                            <p style={{
                                marginRight: '10px'
                            }}>Overall: </p>
                            <p>{review.reviewer.scores.overall}</p>
                        </div>
                        <div style={{
                            margin: '0 10px 0 0',
                            display: 'flex'
                        }}>
                            <p style={{
                                marginRight: '10px'
                            }}>Story: </p>
                            <p>{review.reviewer.scores.story}</p>
                        </div>
                        <div style={{
                            margin: '0 10px 0 0',
                            display: 'flex'
                        }}>
                            <p style={{
                                marginRight: '10px'
                            }}>Art:</p>
                            <p>{review.reviewer.scores.art}</p>
                        </div>
                        <div style={{
                            margin: '0 10px 0 0',
                            display: 'flex'
                        }}>
                            <p style={{
                                marginRight: '10px'
                            }}>Character:</p>
                            <p>{review.reviewer.scores.character}</p>
                        </div>
                        <div style={{
                            margin: '0 10px 0 0',
                            display: 'flex'
                        }}>
                            <p style={{
                                marginRight: '10px'
                            }}>Enjoyment:</p>
                            <p>{review.reviewer.scores.enjoyment}</p>
                        </div>
                        <div style={{
                            margin: '20px 0 0 0',
                        }}>
                            <p style={{
                                textDecoration: 'underline',
                            }}>Review:</p>
                            <p>{review.content}</p>
                        </div>
                    </div>


                </div>
            ))}
        </div>
    );

export const MangaRecommendations = (props: {
    recommendations: Recommendations[]
}) => (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            {props.recommendations.map((recommendation) => (
                <div key={recommendation.mal_id}>
                    <Link to={`/manga/details/${recommendation.mal_id}`}>
                        <img src={recommendation.image_url} alt={recommendation.image_url} />
                    </Link>
                </div>
            ))}
        </div>
    );