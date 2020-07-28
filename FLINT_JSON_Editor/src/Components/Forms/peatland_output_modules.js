import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import '../../css/form.css';
import ReactDOM from 'react-dom';
import Switch from '@material-ui/core/Switch';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      paddingRight: "40px"
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1), 
          width: theme.spacing(16),
        //   height: theme.spacing(16),
        },
        '& > span': {
            margin: theme.spacing(2),
        },
      },
    paper: {
        marginLeft: "20px",
        width: "65vw"
    },
    libraryName: {
        width: "200px",
        marginLeft: "20px",
    },
    libraryType: {
        width: "200px",
    }
}));

export default function Pools(){
    const classes = useStyles();

    
    // const [tempLibrary, setTempLibrary] = React.useState({});

    // useEffect(()=>{
    //     const temp={};
    //     Modules.map(inp => temp[inp.key]=inp.value);
    //     const temp1={};
    //     temp1["Modules"]=temp;
    //     console.log(JSON.stringify(temp1));
    //     setTempLibrary(temp1);
    // },[Modules]);

    
    
    return(
        <div id="container">
            <div id="jsonEditor">
                <h1>Modules:</h1>
                {
                        Modules.map((inputfield, index) => (
                            <Accordion id={"modules"+index}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <FormControlLabel
                                onClick={()=>deleteModule(index)}
                                control={<IconButton color="primary" aria-label="add library" style={{marginTop: "10px"}} >
                                <CancelIcon />
                                </IconButton>}
                                />
                                <Typography className={classes.heading}>
                                <TextField id="filled-basic" label="Module Name: " value={inputfield.key} onChange={(event)=>handleChange(index, "key", event.target.value)} />
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                <Paper elevation={5} className={classes.paper}>
                                
                                <FormControlLabel className={classes.formControl} label = "enabled" control=
                                {<Switch
                                    checked={inputfield.value.enabled}
                                    onChange={event => handleChange(index, "enabled", event.target.checked)}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}
                                />
            
                                <FormControl className={classes.formControl}>
                                    order
                                    <TextField id="filled-basic" label="order" variant="filled" value={inputfield.value.order} onChange={(event)=>handleChange(index, "order", event.target.value)} />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    library
                                    <TextField id="filled-basic" label="library" variant="filled" value={inputfield.value.library} onChange={(event)=>handleChange(index, "library", event.target.value)} />
                                </FormControl>
                                
    
                                </Paper>
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>addModules()}>
                        <AddCircleIcon />
                    </IconButton>
                
           </div>

           <div id="jsonViewer"><pre>
          {/* {JSON.stringify(tempLibrary, null, 2)} */}
        </pre></div>
        </div>
    );
}