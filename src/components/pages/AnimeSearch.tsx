import { Button, Theme } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import React, { Component } from 'react';

const style = (theme: Theme) => createStyles({
    mainDiv: {
        margin: '90px 0 0 0',
    }
});

interface Props extends WithStyles<typeof style> {

}

interface State {
    inputValue: string,
}

class AnimeSearch extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            inputValue: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e: { target: { value: any; }; }) => {
        const text = e.target.value;
        this.setState({inputValue: text});
    }
    
    search = () => {

    }

    render() {
        return (
            <div className={this.props.classes.mainDiv}>
                <input type="text" value={this.state.inputValue} onChange={this.handleChange}/>
                <Button onClick={this.search}></Button>
            </div>
        );
    }

}
export default withStyles(style)(AnimeSearch);