import React, { Component } from 'react';
import { createStyles, Theme, withStyles, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import { genres } from '../../models/Genres';
import MangaItem from './MangaItem';
import { MangaDetail } from '../../types/MangaDetailed';

const style = (theme: Theme) => createStyles({
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        margin: '90px 0 0 0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mangaSearch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        color: 'white',
    },
    formControl: {
        minWidth: 120,
        maxWidth: 150,
        color: 'white',
    },

});

interface Props extends WithStyles<typeof style> {

}

interface State {
    inputValue: string,
    url: string,
    action: boolean,
    mangas: MangaDetail[],
    selectValue: string[]
}

class MangaSearch extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            inputValue: "",
            url: "https://api.jikan.moe/v3/search/manga/?q=",
            action: false,
            mangas: [],
            selectValue: []
        }
    }

    handleChange = (e: { target: { value: any; }; }) => {
        const text = e.target.value;
        this.setState({ inputValue: text });
    }

    handleChangeAction = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ action: e.target.checked });
    }

    handleMultiSelectChange = (e: any) => {
        this.setState({ selectValue: e.target.value as string[] });
    }

    search = async () => {
        const params = this.state.selectValue.join("");
        const url = this.state.url + this.state.inputValue + params;

        console.log("Fecthing mangas with", url);

        const response = await fetch(
            url,
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        );

        const mangas = (await response.json()).results;
        this.setState({ mangas })
        console.log("##MANGAS", this.state.mangas);
    }

    render() {

        const mangaList = this.state.mangas && this.state.mangas.length > 0 ?
            this.state.mangas.map((manga) =>
                <MangaItem manga={manga} key={manga.mal_id} />
            ) : null;

        return (
            <div className={this.props.classes.mainDiv}>
                <div className={this.props.classes.mangaSearch}>
                    <input type="text" value={this.state.inputValue}
                        onChange={this.handleChange} />
                    <Button type="submit" style={{ color: 'white' }} onClick={this.search}>Search</Button> <br />
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
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {mangaList}
                </div>
            </div>
        );
    }

}

export default withStyles(style)(MangaSearch);