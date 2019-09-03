import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import React from 'react';

const styles = (theme: Theme) => createStyles({
    mainDivAbout: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    divContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '80%',
      margin: '60px 0 0 0',
    },
    contentParagraphs: {
      lineHeight: 1.3,
    },
    contentH: {
      margin: '10px',
    },
    button: {
      margin: '20px',
    }
});

interface Props extends WithStyles<typeof styles> {

}

interface State {

}

class App extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <div className={this.props.classes.mainDivAbout}>
                  <div className={this.props.classes.divContent}>
                    <br/>
                    <h1 className={this.props.classes.contentH}>Welcome!</h1>
                    <h3 className={this.props.classes.contentParagraphs}>Welcome to my Anime Website, build with React in TypeScript</h3><br/>
                    <p className={this.props.classes.contentParagraphs}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat nisi id elit scelerisque, id porttitor ante porttitor. Aenean pellentesque cursus ex in vulputate. Praesent sit amet ex pellentesque, vestibulum ex vitae, suscipit turpis. Morbi aliquam justo turpis, vitae tempus nunc finibus a. Sed pretium est ac massa imperdiet, luctus vehicula risus laoreet. Aenean quis nibh sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum eget mauris vel rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
Nullam ut massa ut elit consectetur hendrerit sit amet et quam. Curabitur lobortis ante porta rutrum auctor. Praesent lacinia libero in ante euismod egestas. Praesent eu bibendum est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut varius nibh orci, a feugiat magna hendrerit vitae. Proin vitae ex lacinia, dignissim purus non, malesuada ante. Sed rhoncus elementum ligula. Nam laoreet sit amet libero sollicitudin tempor. Proin quis neque eu neque dapibus pellentesque quis nec est.
Phasellus sit amet finibus lorem. Sed sollicitudin sagittis augue, sit amet laoreet nisl feugiat trum auctor. Praesent lacinia libero in ante euismod egestas. Praesent eu bibendum est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut varius nibh orci, a feugiat magna hendrerit vitae. Proin vitae ex lacinia, dignissim purus non, malesuada ante. Sed rhoncus elementum ligula. Nam laoreet sit amet libero sollicitudin tempor. Proin quis neque eu neque dapibus pellentesque quis nec est.
Phasellus sit amet finibus lorem. Sed sollicitudin sagittis augue, sit amet laoreet nisl feugiat trum auctor. Praesent lacinia libero in ante euismod egestas. Praesent eu bibendum est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut varius nibh orci, a feugiat magna hendrerit vitae. Proin vitae ex lacinia, dignissim purus non, malesuada ante. Sed rhoncus elementum ligula. Nam laoreet sit amet libero sollicitudin tempor. Proin quis neque eu neque dapibus pellentesque quis nec est.
Phasellus sit amet finibus lorem. Sed sollicitudin sagittis augue, sit amet laoreet nisl feugiat trum auctor. Praesent lacinia libero in ante euismod egestas. Praesent eu bibendum est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut varius nibh orci, a feugiat magna hendrerit vitae. Proin vitae ex lacinia, dignissim purus non, malesuada ante. Sed rhoncus elementum ligula. Nam laoreet sit amet libero sollicitudin tempor. Proin quis neque eu neque dapibus pellentesque quis nec est.
Phasellus sit amet finibus lorem. Sed sollicitudin sagittis augue, sit amet laoreet nisl feugiat vitae. Maecenas atis velit vitae nibh mattis, nec vehicula turpis molestie. Praesent at ultrices enim. Nulla lobortis dolor ac scelerisque rhoncus. Aenean dictum efficitur lacinia. Etiam sit amet viverra quam, vitae sodales urna. Sed aliquam tempor pretium. Aliquam nec quam felis. Suspendisse potenti. Donec pulvinar urna libero, ut bibendum nisi fringilla non. Cras imperdiet mi a ante egestas imperdiet.</p>
                    <Button className={this.props.classes.button} style={{marginTop: '20px'}} color="secondary" href="/about">About me</Button>
                  </div>
                                
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(App);