import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem1 from '@material-ui/core/MenuItem';
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
import '../../css/form.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Divider from '@material-ui/core/Divider';
const {Menu, MenuItem} = require('electron').remote;

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
    },
    divider: {
        height: 28,
        margin: 4,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    paper1: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      },
}));

export default function Variables(props){

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const [Transforms, setTransforms] = React.useState([
        {
            key: "disturbance matrices",
            value: {
                transform: {
                    type: "SQLQueryTransform",
                    queryString: "SELECT dm.id AS disturbance_matrix_id, source_pool.name as source_pool_name, dest_pool.name as dest_pool_name, dv.proportion FROM disturbance_matrix dm INNER JOIN disturbance_matrix_value dv ON dm.id = dv.disturbance_matrix_id INNER JOIN pool source_pool ON dv.source_pool_id = source_pool.id INNER JOIN pool dest_pool ON dv.sink_pool_id = dest_pool.id",
                    library: "internal.flint",
                    provider: "SQLite",
                    data_id: "",
                    vars: ["sss","aa"],
                    custom: [
                        {
                            key: "",
                            value: ""
                        }
                    ]
                }
            }
        }
        , ...fetchData(2)
    ]);

    const [Initial, setInitial] = React.useState(
        // {
        // enable_peatland : false,
        // enable_moss : false,
        // admin_boundary : "British Columbia",
        // eco_boundary : "Taiga Plains",
        // initial_age : 0,
        // initial_historic_land_class : "FL",
        // initial_current_land_class : "FL",
        // age_class_range : 20,
        // age_maximum : 300,
        // slow_ag_to_bg_mixing_rate : 0.006,
        // }
        // props.json.
        fetchData(1)
    // }
    ); 
    // fetchData(2);
        function fetchData(type)
        {
            //1 for initial values and 2 for transforms
            if(type==1)
            {
                const temp={};
                if(props.json!=undefined)
                for (const [key, value] of Object.entries(props.json.Variables)) {
                    if(typeof(value)!="object"||Array.isArray(value))
                    temp[key]=value;
                }
                return temp;
            }
            else if(type==2)
            {
                const temp=[];
                if(props.json!=undefined)
                for (const [key, value] of Object.entries(props.json.Variables)) {
                    if(typeof(value)=="object"&&!Array.isArray(value))
                    {
                        const temp1=value;
                        temp1.transform.custom=[{key: "aa", value: "ab"}];
                        temp.push(
                            {
                                key: key,
                                value: temp1
                            }
                        )
                    }
                }
                return temp;
            }
        }
        // console.log(typeof(props.json.Variables.forest_peatland_leading_species));
    const [tempJSON, setTempJSON] = React.useState({});

    useEffect(()=>{
       // console.log("aa");
        const temp={};
        for (const [key, value] of Object.entries(Initial))
        {
            temp[key]=value;
        }
        // for (const [key, value] of Object.entries(Transforms))
        Transforms.map((inputfield)=>
        {
            // temp[key]=value;
            // temp[inputfield.key]=inputfield.value;
            const temp1={}
            if(inputfield.value.transform.type=="SQLQueryTransform")
                {
                    temp1["type"]=inputfield.value.transform.type;
                    temp1["queryString"]=inputfield.value.transform.queryString;
                    temp1["library"]=inputfield.value.transform.library;
                    temp1["provider"]=inputfield.value.transform.provider;
                    inputfield.value.transform.custom.map(field=>{
                        temp1[field.key]=field.value;
                    })
                    const temp2={};
                    temp2["transform"]=temp1;
                    temp[inputfield.key]=temp2;
                }
            else if(inputfield.value.transform.type=="LocationIdxFromFlintDataTransform")
                {
                    temp1["type"]=inputfield.value.transform.type;
                    temp1["data_id"]=inputfield.value.transform.data_id;
                    temp1["library"]=inputfield.value.transform.library;
                    temp1["provider"]=inputfield.value.transform.provider;
                    inputfield.value.transform.custom.map(field=>{
                        temp1[field.key]=field.value;
                    })
                    const temp2={};
                    temp2["transform"]=temp1;
                    temp[inputfield.key]=temp2;
                }
            else if(inputfield.value.transform.type=="CompositeTransform")
                {
                    temp1["type"]=inputfield.value.transform.type;
                    temp1["library"]=inputfield.value.transform.library;
                    temp1["vars"]=inputfield.value.transform.vars;
                    inputfield.value.transform.custom.map(field=>{
                        temp1[field.key]=field.value;
                    })
                    const temp2={};
                    temp2["transform"]=temp1;
                    temp[inputfield.key]=temp2;
                }
            else
                {
                    const temp2={}, temp1={};
                    inputfield.value.transform.custom.map(field=>{
                        temp1[field.key]=field.value;
                    })
                    temp2["transform"]=temp1;
                    temp[inputfield.key]=temp2;
                }
        })
        setTempJSON(temp);
    },[Initial, Transforms]);

    useEffect(()=>{
    const template=[...Menu.getApplicationMenu().items,{ label: 'Save', accelerator: 'Ctrl+S',click: () => save() }];
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);
    },[Transforms])

    function handleChangeInitial(key, value)
    {
        const temp = {...Initial};
        temp[key]=value;
        setInitial(temp);
    }

    function handleChange(index, type, value)
    {
        const temp=[...Transforms];
        if(type=="vars")
        temp[index].value.transform[type]=value.split(',');
        else if(type=="key")
        temp[index].key=value;
        else
        temp[index].value.transform[type]=value;
        setTransforms(temp);
       // console.log(Transforms);
    }

    function addField(index)
    {
        const temp=[...Transforms];
        temp[index].value.transform.custom.push({
            key:"",
            value:""
        });
        console.log(temp);
        setTransforms(temp);
      //  console.log(Transforms[index].value.transform.custom);
    }

    function deleteField(index, index1)
    {
       // console.log(index);
        const temp=[...Transforms];
        temp[index].value.transform.custom.splice(index1,1);
        // console.log
        setTransforms(temp);
        // document.getElementById("transform"+index+index1).style.display="none";
      //  console.log(Transforms[index].value.transform.custom);
    }

    function handleChangeField(index, index1, params, value) {
        const temp=[...Transforms];
        // if(params=="key")
        //     temp[key].transform.custom[index].key=value;
        // else
        //     temp[key].transform.custom[index].value=value;
        temp[index].value.transform.custom[index1][params]=value;
        setTransforms(temp);
      //  console.log(Transforms[index].value.transform.custom);
    }

    function addTransform(){
        const temp=[...Transforms];
        temp.push({
            key: "",
            value: {
                transform: {
                type: "",
                queryString: "",
                library: "internal.flint",
                provider: "",
                data_id: "",
                vars: [],
                custom: [
                    {key: "",
                    value: ""}
                ]
            }
        }
    })
    setTransforms(temp); 
}

    function deleteTransform(index)
    {
        const temp=[...Transforms];
        temp.splice(index,1);
        setTransforms(temp);
        // setTransformsDup(temp);
        // document.getElementById("transform"+index).style.display="none";
    }

    const save = ()=>
    {
        console.log("save");
    }

    

    return(
        <div id="container">
            <div id="jsonEditor">
                <h1>Initial Values:</h1>
                <Paper elevation={5} className={classes.paper}>

                    <FormControlLabel className={classes.formControl} label = "enable_peatland" control=
                    {<Switch
                        checked={Initial.enable_peatland || false}
                        onChange={event => handleChangeInitial("enable_peatland", event.target.checked)}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />}
                    />
                    <FormControlLabel className={classes.formControl} label = "enable_moss" control=
                    {<Switch
                        checked={Initial.enable_moss || false}
                        onChange={event => handleChangeInitial("enable_moss", event.target.checked)}
                        color="primary"
                        name="checkedB"
                        label="aa"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />}
                    />
                    <FormControlLabel className={classes.formControl} label = "inventory_over_peatland" control=
                    {<Switch
                        checked={Initial.inventory_over_peatland || false}
                        onChange={event => handleChangeInitial("inventory_over_peatland", event.target.checked)}
                        color="primary"
                        name="checkedB"
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
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="applied_growth_curve_id" variant="filled" defaultValue={Initial.applied_growth_curve_id} onChange={event => handleChangeInitial("applied_growth_curve_id",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="default_fire_return_interval" variant="filled" defaultValue={Initial.default_fire_return_interval} onChange={event => handleChangeInitial("default_fire_return_interval",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="default_last_fire_year" variant="filled" defaultValue={Initial.default_last_fire_year} onChange={event => handleChangeInitial("default_last_fire_year",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="default_mean_annual_temperature" variant="filled" defaultValue={Initial.default_mean_annual_temperature} onChange={event => handleChangeInitial("default_mean_annual_temperature",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="default_spinup_drought_class" variant="filled" defaultValue={Initial.default_spinup_drought_class} onChange={event => handleChangeInitial("default_spinup_drought_class",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="default_forward_drought_class" variant="filled" defaultValue={Initial.default_forward_drought_class} onChange={event => handleChangeInitial("default_forward_drought_class",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="default_annual_drought_class" variant="filled" defaultValue={Initial.default_annual_drought_class} onChange={event => handleChangeInitial("default_annual_drought_class",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                    forest_peatland_leading_species
                        <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" label="forest_peatland_leading_species" variant="filled" defaultValue={Initial.forest_peatland_leading_species || ""} onChange={(event)=>handleChangeInitial("forest_peatland_leading_species",event.target.value)} />
                    </FormControl>
                </Paper>
                        
                <h1>Transforms:</h1>
                    
                    {
                        // const [disp, setDisp]=React.useState("SQLQueryTransform");
                        Transforms.map((inputfield, index) => (
                            <Accordion id={"transform"+index}>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <FormControlLabel
                                onClick={()=>deleteTransform(index)}
                                control={<IconButton color="primary" aria-label="add library" style={{marginTop: "10px"}} onClick={()=>{deleteTransform(index)}}>
                                <CancelIcon />
                                </IconButton>}
                                />
                                <Typography className={classes.heading}>
                                <TextField id="filled-basic" label="Transform Name: " value={inputfield.key} onChange={(event)=>handleChange(index, "key", event.target.value)} />
                                </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                <Paper elevation={5} className={classes.paper}>
                                
                                <FormControl className={classes.formControl}>
                                    {/* <TextField id="filled-basic" label="Transform Name" variant="filled" defaultValue={value.transform.type} onChange={(event)=>handleChange(key, "type", event.target.value)} /> */}
                                    <InputLabel id="demo-simple-select-label">type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // className={classes.libraryName}
                                            value={inputfield.value.transform.type}
                                            onChange={(event)=>{handleChange(index, "type", event.target.value)}}
                                            >
                                            <MenuItem1 value={"SQLQueryTransform"}>SQLQueryTransform</MenuItem1>
                                            <MenuItem1 value={"LocationIdxFromFlintDataTransform"}>LocationIdxFromFlintDataTransform</MenuItem1>
                                            <MenuItem1 value={"CompositeTransform"}>CompositeTransform</MenuItem1>
                                            <MenuItem1 value={"other"}>other</MenuItem1>
                                        </Select>
                                </FormControl>
            
                                {inputfield.value.transform.type=="SQLQueryTransform" && <FormControl className={classes.formControl}>
                                    queryString
                                    <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" label="queryString" variant="filled" defaultValue={inputfield.value.transform.queryString} onChange={(event)=>handleChange(index, "queryString", event.target.value)} />
                                </FormControl>}<br />
            
                                {(inputfield.value.transform.type=="LocationIdxFromFlintDataTransform" || inputfield.value.transform.type=="SQLQueryTransform" || inputfield.value.transform.type=="CompositeTransform") && <FormControl className={classes.formControl}>
                                    <TextField id="filled-basic" label="library" variant="filled" disabled defaultValue={inputfield.value.transform.library} onChange={(event)=>handleChange(index, "library", event.target.value)} />
                                </FormControl>}
            
                                {(inputfield.value.transform.type=="LocationIdxFromFlintDataTransform" || inputfield.value.transform.type=="SQLQueryTransform") && <FormControl className={classes.formControl}>
                                    <TextField id="filled-basic" label="provider" variant="filled" defaultValue={inputfield.value.transform.provider} onChange={(event)=>handleChange(index, "provider", event.target.value)} />
                                </FormControl>}
            
                                {inputfield.value.transform.type=="LocationIdxFromFlintDataTransform" && <FormControl className={classes.formControl}>
                                    <TextField id="filled-basic" label="data_id" variant="filled" defaultValue={inputfield.value.transform.data_id} onChange={(event)=>handleChange(index, "data_id", event.target.value)} />
                                </FormControl>}
            
                                {inputfield.value.transform.type=="CompositeTransform" && <FormControl className={classes.formControl}>
                                    <TextField id="filled-basic" label="vars" placeholder="comma seperated array elements" variant="filled" defaultValue={inputfield.value.transform.vars} onChange={(event)=>handleChange(index, "vars", event.target.value)} />
                                </FormControl>}
                                
                                {inputfield.value.transform.custom && inputfield.value.transform.custom.map((inputfield1, index1)=>(
                                    
                                    
                                    // return(
                                    <div id={"transform"+index+index1}>
                                    <Paper elevation={5} className={classes.paper1}>
                                    <TextField
                                      className={classes.input}
                                      label="key"
                                      value={inputfield1.key}
                                      onChange={(event)=>handleChangeField(index, index1, "key", event.target.value)}
                                    />
                                    <TextField
                                      className={classes.input}
                                      label="value"
                                      value={inputfield1.value}
                                      onChange={(event)=>handleChangeField(index, index1, "value", event.target.value)}
                                    />
                                    <Divider className={classes.divider} orientation="vertical" />
                                    <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={()=>{console.log(index);deleteField(index, index1)}}>
                                        <CancelIcon />
                                    </IconButton>
                                  </Paper>
                                  </div>
                                ))
                                } 
                                <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>{console.log("1");addField(index)}}>
                                    <AddCircleIcon />
                                </IconButton>
                                </Paper>
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}

                    <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>addTransform()}>
                        <AddCircleIcon />
                    </IconButton>
                    
            </div>


            <div id="jsonViewer"><pre>
          {JSON.stringify(tempJSON, null, 2)}
        </pre></div>
        </div>
    );
}