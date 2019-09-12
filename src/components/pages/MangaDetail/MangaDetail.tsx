import { Box, createStyles, Tab, Tabs, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Articles, Characters, Forum, MangaDetailed, Pictures, Stats, Reviews, Recommendations } from '../../../types/MangaDetailed';
import { AnimeCredits, AnimeDescription, AnimeDetailHeader, AnimeStatus } from '../AnimeDetail/AnimeDetailComponents';
import { getManga, getMangaCharacters, getMangaForum, getMangaNews, getMangaPictures, getMangaStats, getMangaReviews, getMangaRecommendations } from './../../../models/mangaModel';
import { MangaCharacter, MangaNews, MangaPictures, MangaForum, MangaMoreInfo, MangaReviews, MangaRecommendations } from './MangaDetailComponent';

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
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);

        this.setState({
            manga: await getManga(id),
            characters: await getMangaCharacters(id),
            news: await getMangaNews(id),
            pictures: await getMangaPictures(id),
            stats: await getMangaStats(id),
            topics: await getMangaForum(id),
            reviews: await getMangaReviews(id),
            recommendations: await getMangaRecommendations(id),
        })


        if (this.state.topics.length === 0) {
            this.setState({ topicsAvailable: false });
        } else {
            this.setState({ topicsAvailable: true });
        }


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

    render() {
        const manga = this.state && this.state.manga;
        const characters = this.state && this.state.characters;
        const news = this.state && this.state.news;
        const pictures = this.state && this.state.pictures;
        const stats = this.state && this.state.stats;
        if (!manga || !characters || !news || !pictures || !stats) {
            return <div>sssss</div>;
        }




        return (
            <div className={this.props.classes.mainDiv}>

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
                        <Tab label="Characters" {...this.allyProps(1)} />
                        <Tab label="News" {...this.allyProps(2)} />
                        <Tab label="Pictures" {...this.allyProps(3)} />
                        <Tab label="Statistic" {...this.allyProps(4)} />
                        <Tab label="Forum" {...this.allyProps(5)} />
                        <Tab label="Mor Info" {...this.allyProps(6)} />
                        <Tab label="Reviews" {...this.allyProps(7)} />
                        <Tab label="Recomandations" {...this.allyProps(8)} />

                    </Tabs>
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
                </div>

            </div >
        );
    }
}
export default withStyles(style)(MangaDetail);