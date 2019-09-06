import { Theme } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import AnimeMovie from './AnimeMovie';
import { AnimeDetails } from './AnimeSchedule';

const style = (theme: Theme) => createStyles({
    mainDiv: {
        margin: '90px 0 0 0',
        display: 'flex',
        maxWidth: '100%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

interface Props extends WithStyles<typeof style> {

}

interface State {
    anime: AnimeDetails[];
}

class AnimeSeasons extends Component<Props, State> {

    componentDidMount() {
        this.getSeasons();
    }
    constructor(props: Props) {
        super(props);

        this.state = {
            anime: []
        }
    }

    getSeasons = async () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();


        //Frühling März 3
        //Sommerzeit Juny 6 - September 9
        //Herbst September 9 - December 12
        //Winterzeit December 12 - März 3
        console.log(month);

        console.log("Test1")
        let season = "";
        if (month > 0 && month <= 3) {
            season = 'winter';
        } else if (month > 3 && month <= 6) {
            season = "spring";
        } else if (month > 6 && month <= 9) {
            season = "summer";
        } else if (month > 9 && month <= 12) {
            season = "fall";
        }


        const response = await fetch(
            'https://api.jikan.moe/v3/season/' + year + "/" + season,
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        );

        const animes = await response.json();
        const anime: AnimeDetails[] = animes["anime"];
        this.setState({ anime: anime })
        console.log(this.state.anime)
    }

    render() {
        if (this.state.anime === null) {
            return <div>Hallo</div>
        } else {


            return (
                <div className={this.props.classes.mainDiv}>
                    {this.state.anime && this.state.anime.map((anime) => {
                        if (!anime) {
                            return <div>Hello</div>;
                        }
                        return (
                            <AnimeMovie key={anime.mal_id} anime={anime} />
                        );
                    })}
                </div>
            );
        }

    }
}
export default withStyles(style)(AnimeSeasons);