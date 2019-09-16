import React, { Component } from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { MangaDetail } from '../../types/MangaDetailed';
import { Link } from 'react-router-dom';

const style = (theme: Theme) => createStyles({
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
        overflow: 'hidden'
    }
});

interface Props extends WithStyles<typeof style> {
    manga: MangaDetail;
}

interface State {
    animPlayState: string,
    animPlayDirection: string,
    animeTitleClasses: string
}

class MangaItem extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            animPlayState: "",
            animPlayDirection: "",
            animeTitleClasses: ""
        }
    }

    onAnimeItemHover = () => {
        this.setState({ animeTitleClasses: this.props.classes.animeTitleHover })
    }

    onAnimeItemLeave = () => {
        this.setState({ animeTitleClasses: "" })
    }

    render() {

        const manga = this.props.manga;
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px'
            }}>
                <Link to={`/manga/details/${manga.mal_id}`}>
                    <div className={this.props.classes.animeContent}
                        onMouseOver={this.onAnimeItemHover}
                        onMouseLeave={this.onAnimeItemLeave}>
                        <img className={this.props.classes.animeImages} src={manga.image_url} alt={manga.title + ""} />
                        <div
                            className={`${this.state.animeTitleClasses} ${this.props.classes.animeTitle}`}
                        >
                            <strong className={this.props.classes.animeText}>{manga.title}</strong>
                        </div>
                    </div>

                </Link>
            </div>
        );
    }

}
export default withStyles(style)(MangaItem);