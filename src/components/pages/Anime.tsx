import { Theme } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { animeModel } from '../../models/animeModel';
import './../Keyframes.css';
import AnimeMovie from './AnimeMovie';
import './../../index.css';

const style = (theme: Theme) => createStyles({
    mainDiv: {
        margin: '90px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    dayTitles: {
        margin: '30px',
        fontFamily: 'Damion, cursive',
        color: 'white',
        fontStyle: 'oblique',
        fontSize: '60px',
        borderBottom: '2px solid white',
        borderBottomWidth: '2%',
    },
    animeItemContainer: {
        display: 'flex',
        maxWidth:'90%',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    hrSeperator: {
        width: '100%',
        height: '5px',
        backgroundColor: 'black',
        borderColor: 'transparent'
    }


});

export interface AnimeDetails {
    mal_id: number,
    title: string,
    image_url: string,
    synopsis: string,
    type: string,
    airing_start: string,
    episodes: number,
    genres: [{
        mal_id: number,
        type: string,
        name: string,
        url: string
    }],
    source: string,
    producers: [{
        mal_id: number,
        type: string,
        name: string,
        url: string,
    }],
    licensors: [string],
    r18: boolean,
    kids: boolean
}

interface Props extends WithStyles<typeof style> {

}

interface State {
    inputValue: string,
    monday: AnimeDetails[],
    tuesday: AnimeDetails[],
    wednesday: AnimeDetails[],
    thursday: AnimeDetails[],
    friday: AnimeDetails[],
    saturday: AnimeDetails[],
    sunday: AnimeDetails[],
    unknown: AnimeDetails[],
    other: AnimeDetails[],
    animPlayState: string,
}


class Anime extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        
        this.getAnimes();

        this.state = {
            inputValue: '',
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
            unknown: [],
            other: [],
            animPlayState: ""
        }

        this.handleChange = this.handleChange.bind(this);
       // this.getAnimes = this.getAnimes.bind(this);
    }

    handleChange = (e: { target: { value: any; }; }) => {
        const text = e.target.value;
        this.setState({inputValue: text});
    }

    getAnimes = async () => {
        const response = await fetch(
            'https://api.jikan.moe/v3/schedule/',
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        )

        const json = await response.json();

        animeModel.schedule = json;

        this.setState({
            monday: json["monday"],
            tuesday: json["tuesday"],
            wednesday: json["wednesday"],
            thursday: json["thursday"],
            friday: json["friday"],
            saturday: json["saturday"],
            sunday: json["sunday"],
            unknown: json["unknown"],
            other: json["other"]
        });
    }


    onAnimeItemOver = () => {

    }

    setAnimes = (day: AnimeDetails[]) => {
        return (
            <div className={this.props.classes.animeItemContainer}>
                {day.map((anime) => {
                    return (
                        <AnimeMovie key={anime.mal_id} anime={anime} />
                    );
                })}
            </div>
        );
    }



    render() {
        return(
            <div className={this.props.classes.mainDiv}>
                    <h1 className={this.props.classes.dayTitles}>Monday</h1>
                    {this.setAnimes(this.state.monday)}
                    <hr className={this.props.classes.hrSeperator} />
                    <h1 className={this.props.classes.dayTitles}>Tuesday</h1>
                    {this.setAnimes(this.state.tuesday)}
                    <h1 className={this.props.classes.dayTitles}>Wednesday</h1>
                    {this.setAnimes(this.state.wednesday)}
                    <h1 className={this.props.classes.dayTitles}>Thursday</h1>
                    {this.setAnimes(this.state.thursday)}
                    <h1 className={this.props.classes.dayTitles}>Friday</h1>
                    {this.setAnimes(this.state.friday)}
                    <h1 className={this.props.classes.dayTitles}>Saturday</h1>
                    {this.setAnimes(this.state.saturday)}
                    <h1 className={this.props.classes.dayTitles}>Sunday</h1>
                    {this.setAnimes(this.state.sunday)}
                    <h1 className={this.props.classes.dayTitles}>Unknown</h1>
                    {this.setAnimes(this.state.unknown)}
                    <h1 className={this.props.classes.dayTitles}>Other</h1>
                    {this.setAnimes(this.state.other)}
            </div>
        );
    }
}
export default withStyles(style)(Anime);