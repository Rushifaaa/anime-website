import { CircularProgress, createStyles, FormControl, InputLabel, MenuItem, MuiThemeProvider, Select, TextField, Theme, withStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { Component } from 'react';
import { genres } from '../../models/Genres';
import { MangaDetail } from '../../types/MangaDetailed';
import { theme } from '../ui/Theme';
import MangaItem from './MangaItem';

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
    search: {
        marginTop: '30px',
        fontSize: '20px',
        color: 'white'
    },
    test: {
        boxShadow: '0',
        transition: 'box-shadow 0.4s',
        '&:hover': {
            opacity: 0.8,
            boxShadow: '0 0 10px #fff'
        }
    }

});

interface Props extends WithStyles<typeof style> {

}

interface State {
    inputValue: string,
    url: string,
    action: boolean,
    mangas: MangaDetail[],
    selectValue: string[],
    loading: boolean,
}



class MangaSearch extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            inputValue: "",
            url: "http://localhost:8080/v3/search/manga/?q=",
            action: false,
            mangas: [],
            selectValue: [],
            loading: false
        }
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

    searchAfterGenreChange: () => void = _.debounce(() => {
        this.search();
    }, 200);

    handleChangeAction = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ action: e.target.checked });
    }

    handleMultiSelectChange = (e: any) => {
        this.setState({ selectValue: e.target.value as string[] });
        this.searchAfterGenreChange();
    }

    search = async () => {
        const params = this.state.selectValue.join("");
        const url = this.state.url + this.state.inputValue + params;


        this.setState({ loading: true });
        const response = await fetch(
            url,
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        );

        const mangas = (await response.json()).results;
        this.setState({ mangas, loading: false });

    }

    handleEnterPress = (e: any) => {

        if (e.key === "Enter") {
            this.search();
        }

    }

    minLetters = (mangaList: any) => {
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
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        overflow: 'show',
                        width: '90%',
                    }}>
                        {mangaList}
                    </div>
            );
        }
    }

    render() {

        const mangaList = this.state.mangas && this.state.mangas.length > 0 ?
            this.state.mangas.map((manga) =>
                <MangaItem manga={manga} key={manga.mal_id} />
            ) : null;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={this.props.classes.mainDiv}>
                    <div className={this.props.classes.mangaSearch}>
                        <TextField type="search" label="Search Manga" value={this.state.inputValue}
                            onChange={this.handleChange} onKeyDown={(e: any) => { this.handleEnterPress(e) }} style={{ marginRight: '20px' }} />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
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

                    {this.minLetters(mangaList)}


                </div>
            </MuiThemeProvider>
        );
    }

}

export default withStyles(style)(MangaSearch);