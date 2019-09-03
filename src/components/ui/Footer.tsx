import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React, { Component } from 'react';

const styles = (theme: Theme) => createStyles({
    footerDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80px',
        backgroundColor: 'grey',
    },
    footerCopy: {
        fontSize: '17px',
    },
    buttons: {
        root: {
            fontSize: '20px',
        }
    },
    image: {
        width: '10%',
    }
});

interface Props extends WithStyles<typeof styles> {

}

interface State {
}

class Footer extends Component<Props, State> {
    render() {
        return (
            <div className={this.props.classes.footerDiv}>
                <div>
                    <Button style={{fontSize: 15}} href="mailto:jakub.gencer@allaboutapps.at">Email</Button>
                    <Button style={{fontSize: 15}} href="#">Discord</Button>
                </div>
                <p className={this.props.classes.footerCopy}>&copy; Jakub Gencer</p>
            </div>
        );
    }
}

export default withStyles(styles)(Footer);
