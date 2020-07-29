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
        // width: "65vw"
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

    const [Peatland, setPeatland] = React.useState({
            "enabled": true,
            "order": 100,
            "library": "moja.modules.gdal",
    });

    const [PeatlandItems,setPeatlandItems] = React.useState([
        {
            "data_name": "Age",
            "enabled": true,
            "variable_data_type": "Int16",
            "on_notification": "OutputStep",
            "variable_name": "age",
            "flux": {
                "to": [],
                "from": []
            }
        },
        {
            "pool_name": [
                "SoftwoodMerch",
                "SoftwoodStem",
                "SoftwoodFoliage",
                "SoftwoodOther",
                "HardwoodMerch",
                "HardwoodStem",
                "HardwoodFoliage",
                "HardwoodOther",
                "WoodyStemsBranchesLive",
                "WoodyFoliageLive",
                "SedgeFoliageLive",
                "FeatherMossLive",
                "SphagnumMossLive"
            ],
            "data_name": "AG_Biomass_C",
            "enabled": true,
            "variable_data_type": "float",
            "on_notification": "OutputStep",
            "flux": {
                "to": [],
                "from": []
            }
        },
    ])
    const [tempLibrary, setTempLibrary] = React.useState({});

    useEffect(()=>{
        const temp={};
        // PeatlandItems.map(inputfield =>(
        //     for (const [key, value] of Object.entries(PeatlandItems)) {
        //         if(PeatlandItems.data_name!="")
        //         temp["data_name"]=value;
        //         else if(PeatlandItems.enabled!="")
        //         temp["enabled"]=value;
        //         else if(PeatlandItems.variable_data_type!="")
        //         temp["variable_data_type"]=value;
        //         else if(PeatlandItems.variable_name!="")
        //         temp["variable_name"]=value;
        //         else if(PeatlandItems.on_notification!="")
        //         temp["on_notification"]=value;
        //         else if(PeatlandItems.flux!="")
        //         temp["flux"]=value;
        //         else if(PeatlandItems.pool_name!="")
        //         temp["pool_name"]=value;
        //       }
        // ))
        temp["WriteVariableGeotiff"]={};
        temp["WriteVariableGeotiff"]["library"]=Peatland.library;
        temp["WriteVariableGeotiff"]["enabled"]=Peatland.enabled;
        temp["WriteVariableGeotiff"]["order"]=Peatland.order;
        temp["WriteVariableGeotiff"]["settings"]={};
        temp["WriteVariableGeotiff"]["settings"]["items"]=PeatlandItems;
        const temp1={};
        temp1["Modules"]=temp;
        setTempLibrary(temp1);
    },[PeatlandItems, Peatland]);

    useEffect(()=>console.log(Peatland),[Peatland]);
    useEffect(()=>console.log(PeatlandItems),[PeatlandItems]);

    function handleChange(key, value)
    {
        const temp={...Peatland};
        temp[key]=value;
        setPeatland(temp);
    }
    
    function handleChangeItem(index, key, value)
    {
        const temp=[...PeatlandItems];
        if(key=="pool_name")
        temp[index][key]=value.split(',');
        else if(key=="to")
        temp[index].flux[key]=value.split(',');
        else if(key=="from")
        temp[index].flux[key]=value.split(',');
        else
        temp[index][key]=value;
        setPeatlandItems(temp);
    }

    function deleteItem(index) 
    {
        const temp=[...PeatlandItems];
        temp.splice(index,1);
        setPeatlandItems(temp);
    }

    function addItems()
    {
        const temp=[...PeatlandItems];
        temp.push({
            "pool_name": [
            ],
            "data_name": "",
            "enabled": true,
            "variable_data_type": "",
            "on_notification": "",
            "flux": {
                "to": [],
                "from": []
            }
        },)
        setPeatlandItems(temp);
    }
    return(
        <div id="container">
            <div id="jsonEditor">
                <h1>Modules: WriteVariableGeotiff</h1>
                <Paper elevation={5} className={classes.paper}>
                    <FormControlLabel className={classes.formControl} label = "enabled" control=
                        {<Switch
                            checked={Peatland.enabled}
                            onChange={(event)=>handleChange("enabled", event.target.checked)}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                    />
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="order" variant="filled" value={Peatland.order} onChange={event => handleChange("order",event.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" label="library" variant="filled" value={Peatland.library} onChange={event => handleChange("library",event.target.value)} />
                    </FormControl>
                </Paper>
                
                <h1>settings:</h1>
                {
                    PeatlandItems.map((inputfield, index)=>(
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                            <FormControlLabel
                                // onClick={()=>deleteItem(index)}
                                control={<IconButton color="primary" aria-label="add library" style={{marginTop: "10px"}} onClick={()=>deleteItem(index)}>
                                <CancelIcon />
                                </IconButton>}
                            />
                                <Typography className={classes.heading}>
                                <TextField id="filled-basic" label="data_name" disabled label="Item" value={inputfield.data_name || ""} />
                                </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Paper elevation={5} className={classes.paper}>
                            <FormControl className={classes.formControl}>
                                <TextField id="filled-basic" label="data_name" variant="filled" value={inputfield.data_name || ""} onChange={(event) => handleChangeItem(index, "data_name",event.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField id="filled-basic" label="variable_data_type" variant="filled" value={inputfield.variable_data_type || ""} onChange={(event) => handleChangeItem(index, "variable_data_type",event.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField id="filled-basic" label="on_notification" variant="filled" value={inputfield.on_notification || ""} onChange={(event) => handleChangeItem(index, "on_notification",event.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField id="filled-basic" label="variable_name" variant="filled" value={inputfield.variable_name || ""} onChange={(event) => handleChangeItem(index, "variable_name",event.target.value)} />
                            </FormControl>
                            <FormControlLabel className={classes.formControl} label = "enabled" control=
                                {<Switch
                                    checked={inputfield.enabled}
                                    onChange={event => handleChangeItem(index, "enabled",event.target.checked)}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}
                            />
                            <FormControl className={classes.formControl}>pool_name
                                {/* <TextField id="filled-basic" label="pool_name" placeholder="comma seperated array elements" variant="filled" value={inputfield.pool_name || ""} onChange={(event) => handleChangeItem(index, "pool_name",event.target.value)} /> */}
                                <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" placeholder="comma seperated array elements" label="pool_name" variant="filled" value={inputfield.pool_name || ""} onChange={(event) => handleChangeItem(index, "pool_name",event.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl}>flux: to[]
                                {/* <TextField id="filled-basic" label="flux: to[]" placeholder="comma seperated array elements" variant="filled" value={inputfield.flux.to || ""} onChange={(event) => handleChangeItem(index, "to",event.target.value)} /> */}
                                <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" placeholder="comma seperated array elements" label="flux: to[]" variant="filled" value={inputfield.flux.to || ""} onChange={(event) => handleChangeItem(index, "to",event.target.value)} />
                            </FormControl>
                            <FormControl className={classes.formControl}>lux: from[]
                                {/* <TextField id="filled-basic" label="flux: from[]" placeholder="comma seperated array elements" variant="filled" value={inputfield.flux.from || ""} onChange={(event) => handleChangeItem(index, "from",event.target.value)} /> */}
                                <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" placeholder="comma seperated array elements" label="flux: from[]" variant="filled" value={inputfield.flux.from || ""} onChange={(event) => handleChangeItem(index, "from",event.target.value)} />
                            </FormControl>
                            {/* </Paper> */}
                        </Paper>
                        </AccordionDetails>
                        </Accordion>
                    ))
                }   
                
                
                
                <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>addItems()}>
                    <AddCircleIcon />
                </IconButton>
                
           </div>

           <div id="jsonViewer"><pre>
          {JSON.stringify(tempLibrary, null, 2)}
        </pre></div>
        </div>
    );
}