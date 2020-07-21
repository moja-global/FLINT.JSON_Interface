import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


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
        width: "100%",
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
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        marginLeft: "20px",
        width: "50vw"
    },
    libraryName: {
        width: "200px",
        marginLeft: "20px",
    },
    libraryType: {
        width: "200px",
    }
}));

export default function LocalDomain(){
    const classes = useStyles();

    const [Transforms, setTransforms] = React.useState(
        {
            disturbance_matrices : {
                transform: {
                    queryString: "SELECT dm.id AS disturbance_matrix_id, source_pool.name as source_pool_name, dest_pool.name as dest_pool_name, dv.proportion FROM disturbance_matrix dm INNER JOIN disturbance_matrix_value dv ON dm.id = dv.disturbance_matrix_id INNER JOIN pool source_pool ON dv.source_pool_id = source_pool.id INNER JOIN pool dest_pool ON dv.sink_pool_id = dest_pool.id",
                    type: "SQLQueryTransform",
                    library: "internal.flint",
                    provider: "SQLite",
                    data_id: "",
                }
            },  
        }
    )

    const [Initial, setInitial] = React.useState({
        enable_peatland : false,
        enable_moss : false,
        admin_boundary : "British Columbia",
        eco_boundary : "Taiga Plains",
        initial_age : 0,
        initial_historic_land_class : "FL",
        initial_current_land_class : "FL",
        age_class_range : 20,
        age_maximum : 300,
        slow_ag_to_bg_mixing_rate : 0.006,
    }); 
    
    const [tempJSON, setTempJSON] = React.useState({});

    useEffect(()=>{
        const temp={};
        for (const [key, value] of Object.entries(Initial))
        {
            temp[key]=value;
        }
        for (const [key, value] of Object.entries(Transforms))
        {
            temp[key]=value;
        }
        setTempJSON(temp);
    },[Initial, Transforms]);

    useEffect(()=>console.log(Initial),[Initial])
    function handleChangeInitial(key, value)
    {
        const temp = {...Initial};
        temp[key]=value;
        setInitial(temp);
    }

    const getTransformsUI = () => 
    {
        var temp=[];
        for (const [key, value] of Object.entries(Transforms)) {
            temp.push(
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Transform Name: {key}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    <Paper elevation={5} className={classes.paper}>
                    <FormControl className={classes.formControl}>
                        queryString
                        <TextareaAutosize style={{height: "50px", width: "40vw"}}id="filled-basic" label="queryString" variant="filled" defaultValue={value.transform.queryString} onChange={(event)=>handleChange(key, "queryString", event.target.value)} />
                        {/* <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />; */}
                    </FormControl><br />
                    <FormControl className={classes.formControl}>
                        {/* <TextField id="filled-basic" label="Transform Name" variant="filled" defaultValue={value.transform.type} onChange={(event)=>handleChange(key, "type", event.target.value)} /> */}
                        <InputLabel id="demo-simple-select-label">type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // className={classes.libraryName}
                                value={value.transform.type}
                                onChange={(event)=>handleChange(key, "type", event.target.value)}
                                >
                                <MenuItem value={"SQLQueryTransform"}>SQLQueryTransform</MenuItem>
                                <MenuItem value={"LocationIdxFromFlintDataTransform"}>LocationIdxFromFlintDataTransform</MenuItem>
                            </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="library" variant="filled" defaultValue={value.transform.library} onChange={(event)=>handleChange(key, "library", event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="provider" variant="filled" defaultValue={value.transform.provider} onChange={(event)=>handleChange(key, "provider", event.target.value)} />
                    </FormControl>
                
                    </Paper>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
             )}
            return temp;
    }

    function handleChange(key, type, value)
    {
        const temp={...Transforms};
        temp[key]["transform"][type]=value;
        setTransforms(temp);
        console.log(Transforms);
    }

    return(
        <div id="container">
            <div id="jsonEditor">
                <h1>Initial Values:</h1>
                <Paper elevation={5} className={classes.paper}>

                    <FormControlLabel className={classes.formControl} label = "enable_peatland" control=
                    {<Switch
                        checked={Initial.enable_peatland}
                        onChange={event => handleChangeInitial("enable_peatland", event.target.checked)}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />}
                    />
                    <FormControlLabel className={classes.formControl} label = "enable_moss" control=
                    {<Switch
                        checked={Initial.enable_moss}
                        onChange={event => handleChangeInitial("enable_moss", event.target.checked)}
                        color="primary"
                        name="checkedB"
                        label="aa"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />}
                    />
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="admin_boundary" variant="filled" defaultValue={Initial.admin_boundary} onChange={event => handleChangeInitial("admin_boundary",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="eco_boundary" variant="filled" defaultValue={Initial.eco_boundary} onChange={event => handleChangeInitial("eco_boundary",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="initial_age" variant="filled" defaultValue={Initial.initial_age} onChange={event => handleChangeInitial("initial_age",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="initial_historic_land_class" variant="filled" defaultValue={Initial.initial_historic_land_class} onChange={event => handleChangeInitial("initial_historic_land_class",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="initial_current_land_class" variant="filled" defaultValue={Initial.initial_current_land_class} onChange={event => handleChangeInitial("initial_current_land_class",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="age_class_range" variant="filled" defaultValue={Initial.age_class_range} onChange={event => handleChangeInitial("age_class_range",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="age_maximum" variant="filled" defaultValue={Initial.age_maximum} onChange={event => handleChangeInitial("age_maximum",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="slow_ag_to_bg_mixing_rate" variant="filled" defaultValue={Initial.slow_ag_to_bg_mixing_rate} onChange={event => handleChangeInitial("slow_ag_to_bg_mixing_rate",event.target.value)} />
                    </FormControl>
                </Paper>

                <h1>Transforms:</h1>
                    {getTransformsUI()}
                    {/* <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>{addTransform()}}>
                        <AddCircleIcon />
                    </IconButton> */}
            </div>


            <div id="jsonViewer"><pre>
          {JSON.stringify(tempJSON, null, 2)}
        </pre></div>
        </div>
    );
}