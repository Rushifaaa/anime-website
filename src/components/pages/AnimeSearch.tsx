import { Button, FormControl, InputLabel, MenuItem, Select, Theme, TextField, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { genres } from '../../models/Genres';
import AnimeMovie from './AnimeMovie';
import { AnimeDetails } from './AnimeSchedule';
import _ from 'lodash';
import { theme } from '../ui/Theme';

const style = (theme: Theme) => createStyles({
    root: {
        color: 'white'
    },
    mainDiv: {
        margin: '90px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        minWidth: 120,
        maxWidth: 150,
        color: 'white',
    },
    multiSelect: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        color: 'white',
    },
    animeListStyle: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '90%',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    search: {
        marginTop: '30px',
        fontSize: '20px',
        color: 'white'
    }
});

interface Props extends WithStyles<typeof style> {

}

interface State {
    inputValue: string;
    url: string;
    action: boolean;
    animes: AnimeDetails[];
    selectValue: string[];
    loading: boolean;
}

class AnimeSearch extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            inputValue: "",
            url: "https://api.jikan.moe/v3/search/anime/?q=",
            action: false,
            animes: [],
            selectValue: [],
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e: { target: { value: any; }; }) => {
        const text = e.target.value;
        this.setState({ inputValue: text });
        const textString = text.toString();
        const lengthOfText = textString.length;
        if (lengthOfText >= 3) {
            this.handleChangeDeBounce();
        }
    }

    handleChangeDeBounce: () => void = _.debounce(() => {
        this.search();
    }, 400);

    search = async () => {
        const params = this.state.selectValue.join("");
        const url = this.state.url + this.state.inputValue + params;

        console.log("Fecthing animes with", url);
        this.setState({ loading: true })
        const response = await fetch(
            url,
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        );

        const animes = (await response.json()).results;

        this.setState({ animes, loading: false })

        console.log("## animes", this.state.animes);
    }

    handleChangeAction = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ action: e.target.checked });
    }

    handleMultiSelectChange = (e: any) => {
        this.setState({ selectValue: e.target.value as string[] });
        this.searchAfterGenreChange();

    }

    searchAfterGenreChange: () => void = _.debounce(() => {
        this.search();
    }, 200);

    handleEnterPress = (e: any) => {
        console.log(e.key);
        if (e.key === "Enter") {
            this.search();
        }

    }

    minLetters = (animeList: any) => {
        if (this.state.inputValue.length === 0 && this.state.selectValue.length === 0) {
            return (
                <div className={this.props.classes.search}>Search Animes by <strong>title</strong> or select a <strong>genre</strong></div>
            );
        } else if (this.state.inputValue.length < 3 && this.state.selectValue.length === 0) {
            return (
                <div className={this.props.classes.search}>Please enter a <strong>minimum</strong> of 3 <strong>characters</strong></div>
            );
        } else {
            return (
                this.state.loading ?
                    <div className={this.props.classes.search}>
                        <CircularProgress color="secondary" />
                    </div>
                    :
                    <div className={this.props.classes.animeListStyle}>{animeList}</div>
            );
        }
    }

    render() {

        const animeList = this.state.animes && this.state.animes.length > 0 ?
            this.state.animes.map((anime) =>
                <AnimeMovie anime={anime} key={anime.mal_id} />
            ) : <div>{}</div>;



        return (
            <MuiThemeProvider theme={theme}>
                <div className={this.props.classes.mainDiv}>

                    <div className={this.props.classes.multiSelect}>
                        <TextField type="search" label="Search Anime" value={this.state.inputValue}
                            onChange={this.handleChange} onKeyDown={(e: any) => { this.handleEnterPress(e) }} style={{ marginRight: '20px' }} />
                        <div>
                            <FormControl className={this.props.classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Genre</InputLabel>
                                <Select
                                    style={{ color: 'white' }}
                                    variant="filled"
                                    multiple
                                    onChange={this.handleMultiSelectChange}
                                    value={this.state.selectValue}
                                >
                                    {Object.keys(genres).map((id) => (
                                        <MenuItem key={id} value={`&genre=${id}`}>{genres[id]}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {this.minLetters(animeList)}




                </div>
            </MuiThemeProvider>
        );
    }

}
export default withStyles(style)(AnimeSearch);