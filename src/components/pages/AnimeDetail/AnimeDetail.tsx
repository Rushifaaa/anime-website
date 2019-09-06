import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { animeModel } from '../../../models/animeModel';
import { AnimeDetailed } from '../../../types/AnimeDetailed';
import { AnimeCredits, AnimeDescription, AnimeDetailHeader, AnimeStatus, AnimeTheme } from './AnimeDetailComponents';

const style = () => createStyles({
    animeDetailsMain: {
        display: 'flex',
        flexDirection: 'column',
        margin: '90px 0 0 0',
        color: 'white',
    },
    animeDetailsHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '40px',
    },
    animeDetailsContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        width: '100%',
    },
    animeStatusDetails: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
    },
    animeOptionalDetails: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
    },
    animeOpeningEnding: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        margin: '10px 0 10px 0',
    },
});


type Props = WithStyles<typeof style> & RouteComponentProps & {
    match: any;
}

interface State {
    anime: AnimeDetailed;
}


class AnimeDetail extends Component<Props, State> {

    componentDidMount() {
        this.getAnime();
    }

    getAnime = async () => {
        const response = await animeModel.getAnime(this.props.match.params.id);
        this.setState({ anime: await response });
    }

    render() {
        //const anime = this.state.anime;
        const anime = this.state && this.state.anime;
        if (!anime) {
            return <div>sssss</div>;
        }
        if (!anime.genres) {
            return;
        }
        console.log(anime.mal_id)
        //const anime = animeModel.currentSelectedAnime

        return (
            <div className={this.props.classes.animeDetailsMain}>
                <div className={this.props.classes.animeDetailsHeader}>
                    <AnimeDetailHeader englishTitle={anime.title_english} japaneseTitle={anime.title_japanese}
                        romajiTitle={anime.title} genres={anime.genres} imageUrl={anime.image_url} />
                </div>
                <div className={this.props.classes.animeDetailsContent}>
                    <div className={this.props.classes.animeStatusDetails}>
                        <AnimeStatus title="Episodes:" content={anime.episodes} />
                        <AnimeStatus title="Status:" content={anime.status} />
                        <AnimeStatus title="Broadcast in TV:" content={anime.broadcast} />
                        <AnimeStatus title="Premiered:" content={anime.premiered} />
                        <AnimeStatus title="Episode Duration:" content={anime.duration} />
                    </div>

                    <AnimeDescription title="Description:" synopsis={anime.synopsis} />

                    <div className={this.props.classes.animeOpeningEnding}>
                        <AnimeTheme themes={this.state.anime.opening_themes} title="Opening Themes:" />
                        <AnimeTheme themes={this.state.anime.ending_themes} title="Ending Themes:" />
                        {/* <div className={this.props.classes.openingList}>
                            <p className={this.props.classes.themesTitle}>Ending Theme/s: </p>
                            {anime.ending_themes.map((ending) => (
                                <p>{ending}</p>
                            ))}
                        </div> */}
                    </div>

                    <div className={this.props.classes.animeOptionalDetails}>
                        <hr />
                        <AnimeCredits title="Producers:" credits={anime.producers} />
                        <hr />
                        <AnimeCredits title="Licensors:" credits={anime.licensors} />
                        <hr />
                        <AnimeCredits title="Studios:" credits={anime.studios} />

                    </div>
                </div>
            </div>
        );
    }
}
export default withStyles(style)(AnimeDetail);