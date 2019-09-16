import { AppBar, createStyles, IconButton, InputBase, Toolbar, Typography, WithStyles, withStyles, Drawer, Divider, Paper, CardActionArea, ClickAwayListener, CardMedia, CardContent, Card, MenuList, MenuItem } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import { fade, MuiThemeProvider } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { theme } from '../Theme';
import { CreateIcon } from './NavbarComponents'
import _ from 'lodash';
import { AnimeSearchDetail } from '../../../types/AnimeDetailed';
import { MangaDetail } from '../../../types/MangaDetailed';

const style = (theme: Theme) => createStyles({
    main: {
        flexGrow: 1,
        position: 'fixed',
        zIndex: 999,
        width: '100%',
        display: 'flex',

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    drawer: {
        width: '240px',
        flexShrink: 0,
    },

});

interface Props extends WithStyles<typeof style> {
    onBurgerClick(): void;
}

interface State {
    drawerOpen: boolean;
    searchValue: string;
    anime: AnimeSearchDetail | null;
    manga: MangaDetail | null;
    searched: boolean;
}

class Navbar extends Component<Props, State> {
    classes = this.props.classes;

    constructor(props: Props) {
        super(props);

        this.state = {
            drawerOpen: false,
            searchValue: "",
            anime: null,
            manga: null,
            searched: false,
        }
    }

    drawerHandler = () => {
        if (this.state.drawerOpen) {
            this.setState({ drawerOpen: false });
        } else {
            this.setState({ drawerOpen: true });
        }
    }

    handleSearchChange = (e: { target: { value: any; }; }) => {
        this.setState({ searchValue: e.target.value });
        if (e.target.value.length > 3) {
            this.handleChangeDeBounce();
        }
    }

    handleChangeDeBounce: () => void = _.debounce(() => {
        this.search();
    }, 400);


    search = async () => {
        const responseAnime = await fetch(
            `http://localhost:8080/v3/search/anime/?q=${this.state.searchValue}&limit=1`,
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        );

        const responseManga = await fetch(
            `http://localhost:8080/v3/search/manga/?q=${this.state.searchValue}&limit=1`,
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        );
        this.setState({ searched: false })
        const animeResponse = await responseAnime.json();
        const mangaResponse = await responseManga.json();

        const anime = animeResponse.results[0];
        const manga = mangaResponse.results[0];

        this.setState({ anime, manga, searched: true })
        console.log(anime, manga);

        //console.log(await responseAnime.json(), await responseManga.json());
    }

    handleClickAway = () => {
        this.setState({ searched: false })
    }

    animeCard = (anime: AnimeSearchDetail | null, manga: MangaDetail | null) => {

        if (!anime || !manga) {
            return (
                <></>
            )
        }
        console.log(anime);

        return (

            <ClickAwayListener onClickAway={this.handleClickAway}>
                <Paper style={{
                    display: 'flex',
                    width: '100%'
                }}>
                    <Card style={{
                    }}>
                        <CardActionArea href={`/anime/details/${anime.mal_id}`}>
                            <CardMedia
                                style={{
                                    height: '100px',
                                    fontSize: '10px',
                                }}
                                image={anime.image_url}
                                title={anime.title}
                            />
                            <CardContent style={{
                                height: '200px'
                            }}>
                                <Typography gutterBottom variant="body1" component="p">
                                    {anime.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" >
                                    {anime.synopsis}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card style={{
                    }}>
                        <CardActionArea href={`/manga/details/${manga.mal_id}`}>
                            <CardMedia
                                style={{
                                    fontSize: '10px',
                                    height: '100px'
                                }}
                                image={manga.image_url || undefined}
                                title={manga.title || undefined}
                            />
                            <CardContent style={{
                                height: '200px'
                            }}>
                                <Typography gutterBottom variant="body1" component="p">
                                    {manga.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" >
                                    {manga.synopsis}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </ClickAwayListener >

        );
    }
    handleClickAwayDrawer = () => {
        this.setState({ drawerOpen: false });
        console.log(this.state.drawerOpen);

    }

    render() {

        const anime = this.state.anime;
        const manga = this.state.manga;
        console.log(anime, manga);

        return (

            <div className={this.classes.main}>
                <AppBar position="static" style={{ background: 'rgb(241, 69, 61)' }}>
                    <Toolbar>
                        <IconButton onClick={this.drawerHandler} className={this.classes.menuButton} edge="start" color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={this.classes.title}>
                            Anime/Manga Website
                        </Typography>
                        <div className={this.classes.search}>
                            <div className={this.classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase onChange={this.handleSearchChange} placeholder="Search..." classes={{
                                root: this.classes.inputRoot,
                                input: this.classes.inputInput,
                            }} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    this.search();
                                }
                            }} />

                        </div>
                        {this.state.searched ?
                            <div style={{
                                position: 'absolute',
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                marginTop: '185px',
                                height: 305,
                                width: 400,
                                right: 0,
                                fontSize: ' 10px',
                            }}>
                                {this.animeCard(anime, manga)}
                            </div>
                            : null}

                    </Toolbar>
                </AppBar>
                <ClickAwayListener onClickAway={this.handleClickAwayDrawer}>

                    <Drawer
                        variant="persistent"
                        anchor="left"
                        open={this.state.drawerOpen}
                        className={this.props.classes.drawer}
                        classes={{
                            paper: this.props.classes.drawer
                        }}
                    >

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <MuiThemeProvider theme={theme}>
                                <IconButton style={{ width: '100%' }} onClick={this.drawerHandler}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                                <hr style={{ width: '100%' }} />
                                <CreateIcon icon="home" text="Home" path="/" />
                                <CreateIcon icon="info" text="About" path="/about" />
                                <CreateIcon icon="movie" text="Anime" path="/anime" />
                                <CreateIcon icon="book" text="Manga" path="/manga" />
                            </MuiThemeProvider>

                        </div>

                    </Drawer>
                </ClickAwayListener>





            </div>
        );
    }
}

export default withStyles(style)(Navbar);