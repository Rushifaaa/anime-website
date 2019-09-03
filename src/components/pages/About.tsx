import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React from 'react';
import { oneParagraph } from '../text/placeHolderText';



const styles = (theme: Theme) => createStyles({
    divAbout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    h1: {
        margin: '90px 0 0 0'
    },
    mainContent: {
        display: 'flex',
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
    },
    paragraph: {
        padding: '20px',
        color: 'grey',
        fontSize: '20px',
        transition: 'background-color 1s, padding 0.4s, border-width 0.4s, color 1s',
        '&:hover': {
            borderWidth: '0 0 0 5px',
            borderStyle: 'solid',
            borderColor: 'red',
            backgroundColor: 'rgb(166, 166, 166, 20)',
            padding: '20px 20px 20px 22px',
            color: 'black',
        }
    },
    button: {
        margin: '20px',
        color: 'black'
    }


});

interface Props extends WithStyles<typeof styles> {

}

interface State {

}

class About extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <div className={this.props.classes.divAbout}>
                    <br/>
                    <h1 className={this.props.classes.h1}>About me</h1>
                    <div className={this.props.classes.mainContent}>
                        <div className={this.props.classes.paragraph}>
                            <h3>Title</h3>
                            <p>{oneParagraph}</p>
                        </div>
                        <div className={this.props.classes.paragraph}>
                            <h3>Title</h3>
                            <p>{oneParagraph}</p>
                        </div>
                        

                    </div>
                    <Button className={this.props.classes.button} href="/">Back to Home?</Button>

                </div>
            </div>
        );
    }
}
export default withStyles(styles)(About);