import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import About from './components/pages/About';
import Home from './components/pages/Home';
import Footer from './components/ui/Footer';
import Navbar from './components/ui/Navbar';
import MobileMenu from './components/ui/MobileMenu';
import Anime from './components/pages/Anime';
import AnimeDetail from './components/pages/AnimeDetail';



const styles = (theme: Theme) => createStyles({
});

interface Props extends WithStyles<typeof styles> {

}

interface State {
    mobileMenuOpen: boolean
}

class App extends Component<Props, State> {
    state: State = {
        mobileMenuOpen: false
    }

    render() {
        return (
            <BrowserRouter>
                
                <Navbar onBurgerClick={() => {this.setState({mobileMenuOpen: true})}} />
                {this.state.mobileMenuOpen && <MobileMenu onClose={() => {this.setState({mobileMenuOpen: false})}} />}
                <div style={{flexGrow: 1}}>                   
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/anime" component={Anime} />
                    <Route exact path="/anime/details/:id" component={AnimeDetail} />
                </div>
                <hr style={{height: '3', }} />
                <Footer />
            </BrowserRouter>
        );
    }
}

export default withStyles(styles)(App);
