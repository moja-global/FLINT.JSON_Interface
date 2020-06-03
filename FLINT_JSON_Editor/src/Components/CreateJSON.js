import React from 'react'
import Card from "./Card"
import '../css/CreateJSON.css'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    }
}));
  
 const theme = createMuiTheme({
    palette: {
      primary: green,
    },
});


export default function CreateJSON(params) {
    const classes = useStyles();
    return(
    <div id="body">
        <div id="container">
            <div id="card"><Card name="Create JSON File from Scratch" description="This option will help you to create a JSON File from a basic template"/></div>
            <div id="card"><Card name = "Create JSON File using Interactive editor" description = "This option will help you to create a JSON File, just by choosing values for the keys"/></div>
        </div>
        <div id="button">
            <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={classes.margin}>Next ></Button>
            </ThemeProvider>
        </div>
    </div>
    )
}