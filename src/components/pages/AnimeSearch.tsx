import { Button, FormControl, InputLabel, MenuItem, Select, Theme } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component, Key } from 'react';
import AnimeMovie from './AnimeMovie';
import { AnimeDetails } from './AnimeSchedule';
import { genres } from '../../models/Genres';
import { handleEnterPress } from '../../models/generalModel';

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
        flexWrap: 'wrap'
    },
});

interface Props extends WithStyles<typeof style> {

}

interface State {
    inputValue: string;
    url: string;
    action: boolean;
    animes: AnimeDetails[];
    selectValue: string[]
}

class AnimeSearch extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            inputValue: "",
            url: "https://api.jikan.moe/v3/search/anime/?q=",
            action: false,
            animes: [],
            selectValue: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e: { target: { value: any; }; }) => {
        const text = e.target.value;
        this.setState({ inputValue: text });
    }

    search = async () => {
        const params = this.state.selectValue.join("");
        const url = this.state.url + this.state.inputValue + params;

        console.log("Fecthing animes with", url);

        const response = await fetch(
            url,
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        );

        const animes = (await response.json()).results;

        this.setState({ animes })

        console.log("## animes", this.state.animes);
    }

    handleChangeAction = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ action: e.target.checked });
    }

    handleMultiSelectChange = (e: any) => {
        this.setState({ selectValue: e.target.value as string[] });
    }

    render() {

        const animeList = this.state.animes && this.state.animes.length > 0 ?
            this.state.animes.map((anime) =>
                <AnimeMovie anime={anime} key={anime.mal_id} />
            ) : null;



        return (
            <div className={this.props.classes.mainDiv}>

                <div className={this.props.classes.multiSelect}>
                    <input type="text" value={this.state.inputValue}
                        onChange={this.handleChange} onKeyDown={(e: any) => { handleEnterPress(e, this.search) }} />
                    <Button type="submit" style={{ color: 'white' }} onClick={this.search}>Search</Button><br />
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
                <div className={this.props.classes.animeListStyle}>{animeList}</div>

            </div>
        );
    }

}
export default withStyles(style)(AnimeSearch);