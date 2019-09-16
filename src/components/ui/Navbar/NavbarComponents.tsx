import React from 'react';
import { Icon, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const CreateIcon = (props: {
    icon: string,
    text: string,
    path: string,
}) => (
        <div style={{
            display: 'flex',
            margin: '5px',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <IconButton
                href={props.path}
                style={{
                    fontSize: '13px',
                    width: '100%'
                }}>
                <Icon style={{ marginRight: '5px' }}>{props.icon}</Icon>
                <p><strong>{props.text}</strong></p>
            </IconButton>
        </div>
    )