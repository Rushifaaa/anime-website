import { Icon, IconButton } from '@material-ui/core';
import React from 'react';

export const CreateIcon = (props: {
    icon: string,
    text: string,
    path: string,
}) => (
        <div style={{
            display: 'flex',
            margin: '5px',
            width: '100%',
            alignItems: 'start',
            justifyContent: 'start'
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