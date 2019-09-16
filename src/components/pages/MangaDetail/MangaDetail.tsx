import { Box, createStyles, Tab, Tabs, Theme, Typography, WithStyles, withStyles, CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Articles, Characters, Forum, MangaDetailed, Pictures, Stats, Reviews, Recommendations } from '../../../types/MangaDetailed';
import { AnimeCredits, AnimeDescription, AnimeDetailHeader, AnimeStatus } from '../AnimeDetail/AnimeDetailComponents';
import { getManga, getMangaCharacters, getMangaForum, getMangaNews, getMangaPictures, getMangaStats, getMangaReviews, getMangaRecommendations } from './../../../models/mangaModel';
import { MangaCharacter, MangaNews, MangaPictures, MangaForum, MangaMoreInfo, MangaReviews, MangaRecommendations } from './MangaDetailComponent';
import SwipeableViews from 'react-swipeable-views';
import { theme } from '../../ui/Theme';

const style = (theme: Theme) => createStyles({

    mainDiv: {
        margin: '90px 0 0 0',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
    },
    mangaDetailsHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '40px',
    },
    mangaDetailsContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
        width: '90%',
    },
    mangaStatusDetail: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
    },
    mangaCredits: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
    }
});

type Props = WithStyles<typeof style> & RouteComponentProps & {
    match: any;
}

interface State {
    manga: MangaDetailed | null;
    characters: Characters[];
    news: Articles[];
    pictures: Pictures[];
    stats: Stats | null;
    topics: Forum[];
    topicsAvailable: boolean
    reviews: Reviews[];
    recommendations: Recommendations[];
    tabValue: number;
    oldID: number;
    charactersAvailable: boolean;
    newsAvailable: boolean;
    picturesAvailable: boolean;
    statsAvailable: boolean;
    moreInfoAvailable: boolean;
    reviewsAvailable: boolean;
    recommendationsAvailable: boolean;
    loading: boolean;
}

class MangaDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            manga: null,
            tabValue: 0,
            characters: [],
            news: [],
            pictures: [],
            topics: [],
            topicsAvailable: false,
            reviews: [],
            recommendations: [],
            stats: null,
            oldID: this.props.match.params.id,
            charactersAvailable: false,
            newsAvailable: false,
            picturesAvailable: false,
            statsAvailable: false,
            moreInfoAvailable: false,
            reviewsAvailable: false,
            recommendationsAvailable: false,
            loading: true,
        }
    }

    async componentDidMount() {
        await this.fetchData();
    }

    async componentDidUpdate() {
        if (this.props.match.params.id !== this.state.oldID) {
            this.setState({ oldID: this.props.match.params.id, });
            //this.setState({ loading: true });
            await this.fetchData();
        }
    }

    async fetchData() {

        console.log(this.state.loading);

        const id = this.props.match.params.id;
        console.log(this.state.loading);

        const manga = await getManga(id);
        const characters = await getMangaCharacters(id);
        const news = await getMangaNews(id);
        const pictures = await getMangaPictures(id);
        const stats = await getMangaStats(id);
        const topics = await getMangaForum(id);
        const reviews = await getMangaReviews(id);
        const recommendations = await getMangaRecommendations(id);

        console.log(this.state.loading);

        this.setState({
            loading: false,
            manga,
            characters,
            news,
            pictures,
            stats,
            topics,
            reviews,
            recommendations,
            tabValue: 0,
        });

        console.log(this.state.loading);

        this.available();
    }

    TabPanel(props: any) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        );
    }

    allyProps(index: number) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    handleTabChange = (event: any, newValue: number) => {
        this.setState({ tabValue: newValue });
    }

    available = () => {
        this.setState({
            charactersAvailable: this.state.characters.length > 0,
            newsAvailable: this.state.news.length > 0,
            picturesAvailable: this.state.pictures.length > 0,
            statsAvailable: this.state.stats !== null,
            topicsAvailable: this.state.topics.length > 0,
            moreInfoAvailable: false,
            reviewsAvailable: this.state.reviews.length > 0,
            recommendationsAvailable: this.state.recommendations.length > 0,
        });
    }

    renderLoading() {
        return (
            <div style={{
                display: 'flex',
                width: '100%',
                height: "calc(100vh - 90px)",
                alignItems: 'center',
                justifyContent: 'center'
            }} >
                <CircularProgress color="secondary" />
            </div>
        );
    }

    handleChangeIndex = (index: number) => {
        this.setState({ tabValue: index })
    }

    renderContent() {
        const manga = this.state && this.state.manga;
        const characters = this.state && this.state.characters;
        const news = this.state && this.state.news;
        const pictures = this.state && this.state.pictures;
        const stats = this.state && this.state.stats;
        if (!manga || !characters || !news || !pictures || !stats) {
            return <div>sssss</div>;
        }

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '90%',
            }}>

                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.tabValue}
                    onChange={this.handleTabChange}
                    style={{ overflow: "visible", marginLeft: '5%' }}
                >
                    <Tab label="Overview" {...this.allyProps(0)} />
                    {this.state.charactersAvailable ? <Tab label="Characters" {...this.allyProps(1)} /> : <Tab label="Characters" {...this.allyProps(1)} disabled />}
                    {this.state.newsAvailable ? <Tab label="News" {...this.allyProps(2)} /> : <Tab label="News" {...this.allyProps(2)} disabled />}
                    {this.state.picturesAvailable ? <Tab label="Pictures" {...this.allyProps(3)} /> : <Tab label="Pictures" {...this.allyProps(3)} disabled />}
                    {this.state.statsAvailable ? <Tab label="Statistics" {...this.allyProps(4)} /> : <Tab label="Statistics" {...this.allyProps(4)} disabled />}
                    {this.state.topicsAvailable ? <Tab label="Forum" {...this.allyProps(5)} /> : <Tab label="Forum" {...this.allyProps(5)} disabled />}
                    {this.state.moreInfoAvailable ? <Tab label="More Info" {...this.allyProps(6)} /> : <Tab label="More Info" {...this.allyProps(6)} disabled />}
                    {this.state.reviewsAvailable ? <Tab label="Reviews" {...this.allyProps(7)} /> : <Tab label="Reviews" {...this.allyProps(7)} disabled />}
                    {this.state.recommendationsAvailable ? <Tab label="Recommendations" {...this.allyProps(8)} /> : <Tab label="Recommendations" {...this.allyProps(8)} disabled />}
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.tabValue}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <this.TabPanel value={this.state.tabValue} index={0}>
                        <div className={this.props.classes.mangaDetailsHeader}>
                            <AnimeDetailHeader romajiTitle={manga.title} englishTitle={manga.title_english}
                                japaneseTitle={manga.title_japanese} genres={manga.genres} imageUrl={manga.image_url} />
                        </div>
                        <div className={this.props.classes.mangaDetailsContent}>
                            <div className={this.props.classes.mangaStatusDetail}>
                                <AnimeStatus title="Type:" content={manga.type} />
                                <AnimeStatus title="Volumes:" content={manga.volumes} />
                                <AnimeStatus title="Chapters:" content={manga.chapters} />
                                <AnimeStatus title="Publishing:" content={manga.publishing ? "Yes" : "No"} />
                                <AnimeStatus title="Rank:" content={manga.rank} />
                            </div>

                            <AnimeDescription title="Description:" synopsis={manga.synopsis} />

                            <div className={this.props.classes.mangaCredits}>
                                <hr />
                                <AnimeCredits credits={manga.authors} title="Authors:" />
                                <hr />
                                <AnimeCredits credits={manga.seralizations} title="Serializations:" />
                            </div>
                        </div>

                    </this.TabPanel>
                    <this.TabPanel value={this.state.tabValue} index={1}>
                        <MangaCharacter characters={characters} />
                    </this.TabPanel>
                    <this.TabPanel value={this.state.tabValue} index={2}>
                        <MangaNews news={this.state.news} />
                    </this.TabPanel>
                    <this.TabPanel value={this.state.tabValue} index={3}>
                        <MangaPictures pictures={this.state.pictures} />
                    </this.TabPanel>
                    <this.TabPanel value={this.state.tabValue} index={4}>
                        <div>
                            <div>
                                {/* Make a graph for the userratings*/}
                                <p>One Score/Star</p>
                                {stats.scores[1].percentage}
                                <p>Two Scores/Stars</p>
                                {stats.scores[2].percentage}
                                <p>Three Scores/Stars</p>
                                {stats.scores[3].percentage}
                                <p>Four Scores/Stars</p>
                                {stats.scores[4].percentage}
                                <p>Five Scores/Stars</p>
                                {stats.scores[5].percentage}
                                <p>Six Scores/Stars</p>
                                {stats.scores[6].percentage}
                                <p>Seven Scores/Stars</p>
                                {stats.scores[7].percentage}
                                <p>Eight Scores/Stars</p>
                                {stats.scores[8].percentage}
                                <p>Nine Scores/Stars</p>
                                {stats.scores[9].percentage}
                                <p>Ten Scores/Stars</p>
                                {stats.scores[10].percentage}

                            </div>
                        </div>
                    </this.TabPanel>
                    <this.TabPanel value={this.state.tabValue} index={5}>
                        {this.state.topicsAvailable ?
                            <MangaForum topics={this.state.topics} /> : <div>No topics Available for this Manga</div>
                        }
                    </this.TabPanel>
                    <this.TabPanel value={this.state.tabValue} index={6}>
                        <MangaMoreInfo />
                    </this.TabPanel>
                    <this.TabPanel value={this.state.tabValue} index={7}>
                        <MangaReviews reviews={this.state.reviews} />
                    </this.TabPanel>
                    <this.TabPanel value={this.state.tabValue} index={8}>
                        <MangaRecommendations recommendations={this.state.recommendations} />
                    </this.TabPanel>
                </SwipeableViews>
            </div>
        );
    }

    render() {
        return (
            <div className={this.props.classes.mainDiv}>
                {this.state.loading ? this.renderLoading() : this.renderContent()}
            </div >
        );
    }
}
export default withStyles(style)(MangaDetail);