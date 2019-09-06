import { Theme } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { animeModel } from '../../models/animeModel';
import { AnimeDetails } from './AnimeSchedule';

const style = (theme: Theme) => createStyles({
    animeItemLink: {
    },
    animeItems: {
        display: 'flex',
        margin: '5px',
        overflow: 'hidden',
        boxShadow: '0',
        transition: 'box-shadow 0.4s',
        '&:hover': {
            opacity: 0.8,
            boxShadow: '0 0 10px #fff'
        }
    },
    animeTitle: {
        padding: '24px',
        width: '100%', 
        color: 'rgba(235, 236, 255)', 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        background: 'rgba(0, 0, 0, 0.65)', 
        transform: 'translate(-100%)',
        transition: 'transform 0.4s',
        textShadow: '1px 1px 5px white',
        textAlign: 'center',
        fontSize: '16px'
    },
    animeTitleHover: {
        transform: 'translate(0%)'
    },
    animeImages: {
        border: '1px solid black'
    },
    animeText: {
        textDecoration: 'none',
        transition: 'text-decoration 0.4s',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    animeContent: {
        position: "relative", 
        display: "flex",
    }
});

interface Props extends WithStyles<typeof style>{
    anime: AnimeDetails
}
interface State {
    animPlayState: string,
    animPlayDirection: string,
    animeTitleClasses: string
}

class AnimeMovie extends Component<Props, State> {
    state: State = {
        animPlayState: "",
        animPlayDirection: "",
        animeTitleClasses: ""
    }

    onAnimeItemHover = () => {
        this.setState({animeTitleClasses: this.props.classes.animeTitleHover})
    }

    onAnimeItemLeave = () => {
        this.setState({animeTitleClasses: ""})
    }

    render() {
        const anime = this.props.anime;
        return(
            <div className={this.props.classes.animeItems} key={anime.mal_id}>
                <Link onClick={()=> {animeModel.currentSelectedAnime = anime;}} to={"/anime/details/" + anime.mal_id}>
                    <div className={this.props.classes.animeContent}
                    onMouseOver={this.onAnimeItemHover}
                    onMouseLeave={this.onAnimeItemLeave}>
                        <img className={this.props.classes.animeImages} src={anime.image_url} alt={anime.title + "-image"}/>
                        <div
                        className={`${this.state.animeTitleClasses} ${this.props.classes.animeTitle}`}
                        >
                            <strong className={this.props.classes.animeText}>{anime.title}</strong>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }

}
export default withStyles(style)(AnimeMovie);