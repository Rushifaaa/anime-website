import { Theme } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { animeModel } from '../../models/animeModel';

const style = (theme: Theme) => createStyles( {
    animeDetailsMain: {
        display: 'flex',
        flexDirection: 'column',
        margin: '90px 0 0 0',
        color: 'white',
    },
    animeDetailsHeader: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        fontSize: '40px',

    },
    headerImage: {
        float: 'left',
        margin: '20px',
        maxWidth: '15%',
    },
    headerTitle: {},
    animeSecondaryTitle: {
        fontSize: '15px',
    },
    animeDetailsContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        width: '100%',
    },
    contentGenres: {
        textAlign: 'left',
        float: 'left',
        margin: '5px',
        maxWidth: 'auto',
    },
    contentGenresTitle: {
        float: 'left',
        textAlign: 'start',
        maxWidth: 'auto',
        textDecoration: 'underline',
        fontStyle: 'oblique',
        fontFamily: 'Baloo'
    },
    contentGenresDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        marginTop: '20px',
        width: '10%',
        fontSize: '20px',

    },
    contentText: {
        maxWidth: '80%',
        fontSize: '20px', 
    },
    contentEpisodes: {
        display: 'flex',
        flexDirection: 'column',
        width: '20%',
    },
    contentEpisodesTitle: {
        width: 'auto',
        //display: 'inline-block',
        textDecoration: 'underline',
        fontStyle: 'oblique',
        fontFamily: 'Baloo'
    },
    animeDescription: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin: '20px 0 20px 0',
    },
    animeStatusDetails: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
    },
    animeStatus: {
        display: 'flex',
        flexDirection: 'column',
        width: '20%',
    },
    animeOptionalDetails: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    producerSeperator: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        width: '100%',
    },
    producerList: {
        display: 'flex',
        flexDirection: 'row',
        margin: '10px',
    },
    producer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
    },
    producerTitle: {
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        //display: 'inline-block',
        textDecoration: 'underline',
        fontStyle: 'oblique',
        fontFamily: 'Baloo'
    },
    licensorsList: {
        display: 'flex',
        flexDirection: 'row',
        margin: '10px'
    },
    licensor: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px',
    },
    licensorTitle: {
        display: 'flex',
        alignItems: 'center',
        width: 'auto',
        //display: 'inline-block',
        textDecoration: 'underline',
        fontStyle: 'oblique',
        fontFamily: 'Baloo'
    },
});

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
            from: {
                day: number | null;
                month: number | null;
                year: number | null;
            };
            to: {
                day: number | null;
                month: number | null;
                year: number | null;
            };
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
    premiered: string  | null;
    broadcast:  string | null;
    related: {
        Adaption: [
            {
                mal_id: number;
                type: string;
                name: string;
                url: string
            }
        ] | null;
        Other:[
            {
                mal_id: number;
                type: string;
                name: string;
                url: string
            }
        ] | null;
        Summary: [
            {
                mal_id: number;
                type: string;
                name: string;
                url: string
            }
        ] | null;
    };
    producers: [{    
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }] | null;
    licensors: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string
        }
    ] | null;
    studios: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string
        }
    ] | null;
    genres: [
        {
            mal_id: number;
            type: string;
            name: string;
            url: string
        }
    ] | null;
    opening_themes: [string] | null;
    ending_themes: [string] | null;




}

interface Props extends WithStyles<typeof style>{
    history: any;
}

interface State {
    anime: AnimeDetailed;
}

class AnimeDetail extends Component<Props, State> {

    componentDidMount() {
        if (!animeModel.currentSelectedAnime) {
            this.props.history.push("/anime");
        }
        this.getAnime();
    }

    getAnime = async () => {
        if(animeModel.currentSelectedAnime) {
            const response = await fetch(
                'https://api.jikan.moe/v3/anime/' + animeModel.currentSelectedAnime.mal_id,
                {
                    headers: {
                        Accept: 'application/json',
                    }
                }
            );
            this.setState({anime: await response.json()});
            
        } else {
            return <div>Kein Anime gefunden</div>;
        }
    }

    render() {        
        //const anime = this.state.anime;
        if(!animeModel.currentSelectedAnime) {
            return <div>s</div>;
        }
        const anime = this.state && this.state.anime;
        const style = this.props.classes;
        if(!anime) {
            return <div>sssss</div>;
        }
        if(!anime.genres || !anime.producers || !anime.licensors) {
            return;
        }
        console.log(anime.mal_id)
        //const anime = animeModel.currentSelectedAnime

        return (
            <div className={this.props.classes.animeDetailsMain}>
                <div className={this.props.classes.animeDetailsHeader}>

                    <div className={this.props.classes.headerTitle}>
                        <p>{anime.title}</p>
                        <p className={this.props.classes.animeSecondaryTitle}>{anime.title_english}</p>
                        <p className={this.props.classes.animeSecondaryTitle}>{anime.title_japanese}</p>
                        <img className={this.props.classes.headerImage} src={anime.image_url} alt={`${anime.title}`}/>
                        
                        <div className={this.props.classes.contentGenresDiv}>
                            <p className={this.props.classes.contentGenresTitle}>Genres: </p>
                            {anime.genres.map( (g) =>  {
                                return (
                                    <p key={g.mal_id} className={this.props.classes.contentGenres}>{g.name}</p>
                                );
                            })}    
                        </div>
                    
                    </div>

                </div>
                <div className={this.props.classes.animeDetailsContent}>
                    <div className={this.props.classes.animeStatusDetails}>
                        <div className={this.props.classes.contentEpisodes}>
                            <p className={this.props.classes.contentEpisodesTitle}>Episodes: </p>
                            <p>{anime.episodes}</p>
                        </div>

                        <div className={this.props.classes.animeStatus}>
                            <p className={this.props.classes.contentEpisodesTitle}>Status: </p>
                            <p>{anime.status}</p>
                        </div>

                        <div className={this.props.classes.animeStatus}>
                            <p className={this.props.classes.contentEpisodesTitle}>Broadcat in TV: </p>
                            <p>{anime.broadcast}</p>
                        </div>

                        <div className={this.props.classes.animeStatus}>
                            <p className={this.props.classes.contentEpisodesTitle}>Premiered: </p>
                            <p>{anime.premiered}</p>
                        </div>

                        <div className={this.props.classes.animeStatus}>
                            <p className={this.props.classes.contentEpisodesTitle}>Episode Duration: </p>
                            <p>{anime.duration}</p>
                        </div>

                    </div>
                    

                    <div className={this.props.classes.animeDescription}>
                        <p className={this.props.classes.contentGenresTitle}><strong>Description:</strong></p>
                        <p className={this.props.classes.contentText}>{anime.synopsis}</p>
                    </div>

                    <div className={this.props.classes.animeOptionalDetails}>
                        <div className={this.props.classes.producerList}>
                            <p className={this.props.classes.producerTitle}>Producer: </p><br/>
                            {anime.producers.map((producer) => {
                                return (
                                    <div key={producer.mal_id} className={this.props.classes.producer}>
                                        <p>{producer.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <hr />

                        <div className={this.props.classes.licensorsList}>
                            <p className={this.props.classes.licensorTitle}>Licensor/s: </p>
                            {anime.licensors.map((licensor) => (
                                <div key={licensor.mal_id} className={this.props.classes.licensor}>
                                   <p>{licensor.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
        }
    }
export default withStyles(style)(AnimeDetail);