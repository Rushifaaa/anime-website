import { createMuiTheme } from '@material-ui/core/styles';
import { blue, purple, lightBlue, red } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#f00",
            light: "#f00",
            dark: "#f00",
            contrastText: "#f00",
        },
        secondary: {
            main: "#f00",
            light: "#f00",
            dark: "#f00",
            contrastText: "#f00",
        }
    },
    overrides: {
        MuiFormControl: {
            root: {
                color: 'white',
            }
        },
        MuiFormLabel: {
            root: {
                color: 'white'
            }
        },
        MuiSelect: {
            root: {
                color: 'white'
            },
            icon: {
                color: 'white'
            }
        },
        MuiInput: {
            underline: {
                "&:before": {
                    borderBottom: '1px solid rgb(255, 0, 0)',
                },

            }
        },
        MuiInputBase: {
            root: {
                color: 'white',
                fontSize: '15px',
            }
        }
    }
});

export { theme };