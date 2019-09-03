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
    animeDetailsContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    contentGenres: {
        float: 'left',
        margin: '20px',
        maxWidth: '15%',
    },
    contentGenresTitle: {
        float: 'left',
        margin: '20px',
        maxWidth: '15%',
        textDecoration: 'underline',
        fontStyle: 'oblique',
        fontFamily: 'Baloo'
    },
    contentGenresDiv: {
        width: '90%',
    },
    contentText: {
        maxWidth: '90%' 
    }
});

interface Props extends WithStyles<typeof style>{
    history: any;
}

interface State {

}

class AnimeDetail extends Component<Props, State> {

    componentDidMount() {
        if (!animeModel.currentSelectedAnime) {
            this.props.history.push("/anime");
        }
    }

    render() {
        if (!animeModel.currentSelectedAnime) {
            return (<div className={this.props.classes.animeDetailsMain}>Kein anime ausgwählt</div>);
        }
        const anime = animeModel.currentSelectedAnime;
        console.log(anime.genres[0].name)
        return (
            <div className={this.props.classes.animeDetailsMain}>
                <div className={this.props.classes.animeDetailsHeader}>

                    <div className={this.props.classes.headerTitle}>
                        <img className={this.props.classes.headerImage} src={anime.image_url} alt={`${anime.title}-image`}/>
                        <p>{anime.title}</p>
                    </div>

                </div>
                <div className={this.props.classes.animeDetailsContent}>
                    
                    <div className={this.props.classes.contentGenresDiv}>
                        <p className={this.props.classes.contentGenresTitle}>Genres: </p>
                        {anime.genres.map( (g) =>  {
                            return (
                                <p className={this.props.classes.contentGenres}>{g.name}</p>
                            );
                        })}    
                    </div>
                    <p className={this.props.classes.contentText}>{anime.synopsis}</p>
                </div>
            </div>
        );
    }



}
export default withStyles(style)(AnimeDetail);