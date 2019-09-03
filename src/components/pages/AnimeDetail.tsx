import React, {Component} from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme, Button } from '@material-ui/core';
import { AnimeDetails } from './Anime';
import { animeModel } from '../../models/animeModel';

const style = (theme: Theme) => createStyles( {



});

interface Props extends WithStyles<typeof style>{

}

interface State {

}

class AnimeDetail extends Component<Props, State> {

    
    render() {
        if (!animeModel.currentSelectedAnime) {
            return (<div>Kein anime ausgwählt</div>);
        }

        console.log("selected", animeModel.currentSelectedAnime.title);

        return (
            <div>
                
            </div>
        );
    }



}
export default withStyles(style)(AnimeDetail);