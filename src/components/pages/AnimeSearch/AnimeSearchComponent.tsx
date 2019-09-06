import React, { Component } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export const BetterCheckbox = (props: {
    checked: boolean;
    value: string;
    onChange: Function;
}) => {
    <FormControlLabel
        style={{ color: 'white' }}
        control={

            <Checkbox
                checked={props.checked}
                style={{ color: "white" }}
                value={props.value} inputProps={{ "aria-label": "action" }}
                onChange={() => { props.onChange }}
            />
        }
        label="Action"
    />
}