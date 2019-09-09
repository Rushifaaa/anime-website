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
        height: '100%',
        '@media (max-width:780px)': {
            display: 'none',
        }
    },
    animeDropdownList: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '50px',
        background: 'grey',
    }
});

interface Props extends WithStyles<typeof styles> {
    onBurgerClick(): void;
}

interface State {
    value: string,
    showMenu: boolean,
}

class Navbar extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            value: "",
            showMenu: false
        }

        this.showMenu = this.showMenu.bind(this);
    }

    showMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu = () => {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        })
    }



    render() {
        return (
            <div className={this.props.classes.navDiv}>
                <Burger onClick={this.props.onBurgerClick} />
                <Button className={this.props.classes.button} href="/">Home</Button>
                <Button className={this.props.classes.button} href="/about">About</Button>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button onMouseOver={this.showMenu} className={this.props.classes.button} href="/anime">Anime</Button>

                    {this.state.showMenu ? (
                        <div className={this.props.classes.animeDropdownList} onMouseLeave={() => { this.setState({ showMenu: false }) }}>
                            <Button className={this.props.classes.button} href="/anime/schedule">Schedule</Button>
                            <Button className={this.props.classes.button} href="/anime/seasons">Seasons</Button>
                        </div>
                    ) : (null)}
                </div>
                <Button className={this.props.classes.button} href="/manga">Manga</Button>

            </div>
        );
    }
}

export default withStyles(styles)(Navbar);