import { Button, Theme, Checkbox, FormControlLabel, FormGroup, Select, MenuItem } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { BetterCheckbox } from './AnimeSearchComponent';
import { AnimeDetails } from '../AnimeSchedule';
import AnimeMovie from '../AnimeMovie';

const style = (theme: Theme) => createStyles({
    mainDiv: {
        margin: '90px 0 0 0',
    }
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
            url: "https://api.jikan.moe/v3/search/",
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
                <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
                <Button style={{ color: 'white' }} onClick={this.search}>Search</Button><br />
                <Button style={{ color: 'white' }} onClick={() => this.setState({ url: 'https://api.jikan.moe/v3/search/anime/?q=' })}>Anime</Button><br />
                <Button style={{ color: 'white' }} onClick={() => this.setState({ url: 'https://api.jikan.moe/v3/search/manga/?q=' })}>Manga</Button><br />

                <Select
                    multiple
                    onChange={this.handleMultiSelectChange}
                    value={this.state.selectValue}
                >
                    <MenuItem value={`&genre=1`}>Action</MenuItem>
                    <MenuItem value={`&genre=2`}>Adventure</MenuItem>
                    <MenuItem value={`&genre=3`}>Cars</MenuItem>
                    <MenuItem value={`&genre=4`}>Comedy</MenuItem>
                    <MenuItem value={`&genre=5`}>Dementia</MenuItem>
                    <MenuItem value={`&genre=6`}>Demons</MenuItem>
                    <MenuItem value={`&genre=7`}>Mystery</MenuItem>
                    <MenuItem value={`&genre=8`}>Drama</MenuItem>
                    <MenuItem value={`&genre=9`}>Ecchi</MenuItem>
                    <MenuItem value={`&genre=10`}>Fantasy</MenuItem>
                    <MenuItem value={`&genre=11`}>Game</MenuItem>
                    <MenuItem value={`&genre=12`}>Hentai</MenuItem>
                    <MenuItem value={`&genre=13`}>Historical</MenuItem>
                    <MenuItem value={`&genre=14`}>Horror</MenuItem>
                </Select>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    maxWidth: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>{animeList}</div>
            </div>
        );
    }

}
export default withStyles(style)(AnimeSearch);