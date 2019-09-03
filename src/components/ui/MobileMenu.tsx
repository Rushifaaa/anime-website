import React, {Component} from 'react';
import { WithStyles, createStyles, withStyles, Button } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import '../../components/Keyframes.css';


const style = (theme: Theme) => createStyles({
    mainDiv: {
        position: 'fixed',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        backgroundColor: 'grey',
        width: '100%',
        height: '100%',
        zIndex: 999,
        animationName: 'fadeIn',
        animationDuration: '0.5s'
    },
    button: {
        padding: '20px'
    },
    closeButton: {
        fontSize: '20px',
        width: '20px',
    },
    closeButtonDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
    }
});

interface Props extends WithStyles<typeof style> {
    onClose(): void
}

class MobileMenu extends Component<Props> {
    render() {
        return(
                <div  className={this.props.classes.mainDiv}>
                    <div className={this.props.classes.closeButtonDiv}>
                        <Button className={this.props.classes.closeButton} onClick={this.props.onClose}>X</Button>
                    </div>
                    
                    <Button className={this.props.classes.button} href="/">Home</Button>
                    <Button className={this.props.classes.button} href="/about">About</Button>
                    <Button className={this.props.classes.button} href="/anime">Anime</Button>
                </div>
        );
    }
}
export default withStyles(style)(MobileMenu);