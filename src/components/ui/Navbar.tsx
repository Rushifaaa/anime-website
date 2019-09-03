import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React, { Component } from 'react';
import Burger from '../ui/Burger';


const styles = (theme: Theme) => createStyles({
    navDiv: {
        display: 'flex',
        flexDirection: 'row-reverse',
        textDecoration: 'none',
        alignItems: 'center',
        verticalAlign: 'middle',
        width: '100%',
        position: 'fixed',
        backgroundColor: 'grey',
        height: '60px',
        zIndex: 9999
        
    },
    button: {
        fontSize: '18px',
        '@media (max-width:780px)': {
            display: 'none',
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    onBurgerClick(): void;
}

interface State {
    value: string
}

class Navbar extends Component<Props, State> {
    render() {
        return (
            <div className={this.props.classes.navDiv}>
                <Burger onClick={this.props.onBurgerClick} />
                <Button className={this.props.classes.button} href="/">Home</Button>
                <Button className={this.props.classes.button} href="/about">About</Button>
                <Button className={this.props.classes.button} href="/anime">Anime</Button>

            </div>
        );
    }
}

export default withStyles(styles)(Navbar);
