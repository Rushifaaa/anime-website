import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React, { Component } from 'react';

const style = (theme: Theme) => createStyles({
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
        margin: '0 10px 0 10px',
        '@media (min-width:780px)': {
            display: 'none',
        }
    },
    line: {
        height: '3px',
        width: '30px',
        backgroundColor: 'black',
        margin: '3px',
    }
});

interface Props extends WithStyles<typeof style>{
    onClick(): void;
}

interface State {

}

class Burger extends Component<Props, State> {
    render() {
        return(

            <div className={this.props.classes.mainDiv} onClick={this.props.onClick}>

                <div className={this.props.classes.line}></div>
                <div className={this.props.classes.line}></div>
                <div className={this.props.classes.line}></div>

            </div>

        );
    }
}

export default withStyles(style)(Burger);