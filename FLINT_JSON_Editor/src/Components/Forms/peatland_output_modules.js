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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const { ipcRenderer } = require('electron');
const fs = require('fs');
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function peatland(props){

    ipcRenderer.on('title-reply', (event, arg) => {
        console.log(arg+" "+props.directory);
        if(arg==props.directory)
        save();
      })

    const classes = useStyles();
    console.log(props.json==undefined)
    const [Peatland, setPeatland] = React.useState({
            "enabled": props.json!=undefined ?  props.json.Modules.WriteVariableGeotiff.enabled : false,
            "order": props.json!=undefined ? props.json.Modules.WriteVariableGeotiff.order : "",
            "library": props.json!=undefined ? props.json.Modules.WriteVariableGeotiff.library : "",
    });

    const [open, setOpen] = React.useState(false);

    const handleClickSnack = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const [PeatlandItems,setPeatlandItems] = React.useState(
        // [{
        //     "data_name": "Age",
        //     "enabled": true,
        //     "variable_data_type": "Int16",
        //     "on_notification": "OutputStep",
        //     "variable_name": "age",
        //     "flux": {
        //         "to": [],
        //         "from": []
        //     },
        //     "item_type": ""
        // },
        // {
        //     "pool_name": [
        //         "SoftwoodMerch",
        //         "SoftwoodStem",
        //         "SoftwoodFoliage",
        //         "SoftwoodOther",
        //         "HardwoodMerch",
        //         "HardwoodStem",
        //         "HardwoodFoliage",
        //         "HardwoodOther",
        //         "WoodyStemsBranchesLive",
        //         "WoodyFoliageLive",
        //         "SedgeFoliageLive",
        //         "FeatherMossLive",
        //         "SphagnumMossLive"
        //     ],
        //     "data_name": "AG_Biomass_C",
        //     "enabled": true,
        //     "variable_data_type": "float",
        //     "on_notification": "OutputStep",
        //     "flux": {
        //         "to": [],
        //         "from": []
        //     },
        //     "item_type": ""
        // },]
        // props.json!=undefined? [...props.json.Modules.WriteVariableGeotiff.settings.items] : []
        assignJSON()
    )
    const [tempLibrary, setTempLibrary] = React.useState({});
    // const [PeatlandItemsDup,setPeatlandItemsDup]=React.useState(PeatlandItems);

    function assignJSON()//function to explicitly assign item_type key for all setings
    {
        const temp = props.json!=undefined? [...props.json.Modules.WriteVariableGeotiff.settings.items] : [];
        for(var i=0;i<temp.length;i++)
            {
                if(temp[i]["variable_name"]!=undefined)
                temp[i]["item_type"]="variable_name";
                else if(temp[i]["pool_name"]!=undefined)
                temp[i]["item_type"]="pool_name";
                else if(temp[i]["flux"]!=undefined)
                temp[i]["item_type"]="flux";
                else 
                temp[i]["item_type"]="";
            }
            return temp;
    }
    
    useEffect(()=>{
        // console.log("aaa");
        const temp={};
        // setPeatlandItemsDup(PeatlandItems);
        const temp2=JSON.parse(JSON.stringify(PeatlandItems));
        PeatlandItems.map((inputfield,index) =>{
            if(inputfield.item_type=="variable_name")
            {
                delete temp2[index].flux;
                delete temp2[index].pool_name;
                // delete temp2[index].item_type;
                // temp2[index].item_type="aaaaaa";
                console.log(PeatlandItems);
            }
            else if(inputfield.item_type=="pool_name")
            {
                delete temp2[index].flux;
                delete temp2[index].variable_name;
                // delete temp2[index].item_type;
                // temp2[index].item_type="aaaaaa";

                console.log(PeatlandItems);

            }
            else if(inputfield.item_type=="flux")
            {
                delete temp2[index].variable_name;
                delete temp2[index].pool_name;
                // delete temp2[index].item_type;
                // temp2[index].item_type="aaaaaa";

                console.log(PeatlandItems);
            }
            delete temp2[index].item_type;
        });
        temp["WriteVariableGeotiff"]={};
        temp["WriteVariableGeotiff"]["library"]=Peatland.library;
        temp["WriteVariableGeotiff"]["enabled"]=Peatland.enabled;
        temp["WriteVariableGeotiff"]["order"]=Peatland.order;
        temp["WriteVariableGeotiff"]["settings"]={};
        temp["WriteVariableGeotiff"]["settings"]["items"]=temp2;
        const temp1={};
        temp1["Modules"]=temp;
        setTempLibrary(temp1);
    },[PeatlandItems, Peatland]);

    // useEffect(()=>console.log(Peatland),[Peatland]);
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
        else if(key=="to"||key=="from")
        {
            if(temp[index].flux==undefined)
            temp[index]["flux"]={
                "to":[],
                "from":[]
            }
            temp[index].flux[key]=value.split(',');
        }
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
            },
            "item_type": ""
        },)
        setPeatlandItems(temp);
    }

    const save = ()=>
    {
        console.log("save from peatland");
        fs.writeFileSync(props.directory, JSON.stringify(tempLibrary, null, 2),{encoding: "utf-8"});
        handleClickSnack();
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
                {/* {console.log(PeatlandItems)} */}
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
                            
                            <FormControlLabel className={classes.formControl} label = "enabled" control=
                                {<Switch
                                    checked={inputfield.enabled}
                                    onChange={event => handleChangeItem(index, "enabled",event.target.checked)}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}
                            />
                            <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Item Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // className={classes.libraryName}
                                            value={inputfield.item_type}
                                            onChange={(event)=>{handleChangeItem(index, "item_type", event.target.value)}}
                                            >
                                            <MenuItem value={""}></MenuItem>
                                            <MenuItem value={"variable_name"}>variable_name</MenuItem>
                                            <MenuItem value={"pool_name"}>pool_name</MenuItem>
                                            <MenuItem value={"flux"}>flux</MenuItem>
                                        </Select>
                            </FormControl>
                            {inputfield.item_type=="variable_name" &&<FormControl className={classes.formControl}>
                                <TextField id="filled-basic" label="variable_name" variant="filled" value={inputfield.variable_name || ""} onChange={(event) => handleChangeItem(index, "variable_name",event.target.value)} />
                            </FormControl>}
                            {inputfield.item_type=="pool_name" && <FormControl className={classes.formControl}>pool_name
                                <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" placeholder="comma seperated array elements" label="pool_name" variant="filled" value={inputfield.pool_name || ""} onChange={(event) => handleChangeItem(index, "pool_name",event.target.value)} />
                            </FormControl>}
                            {inputfield.item_type=="flux" && <FormControl className={classes.formControl}>flux: to[]
                                <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" placeholder="comma seperated array elements" label="flux: to[]" variant="filled" value={inputfield.flux!=undefined ? inputfield.flux.to :  ""} onChange={(event) => handleChangeItem(index, "to",event.target.value)} />
                            </FormControl>}
                            {inputfield.item_type=="flux" && <FormControl className={classes.formControl}>flux: from[]
                                <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" placeholder="comma seperated array elements" label="flux: from[]" variant="filled" value={inputfield.flux!=undefined ? inputfield.flux.from :  ""} onChange={(event) => handleChangeItem(index, "from",event.target.value)} />
                            </FormControl>}
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

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            {props.directory+" Saved Successfully!"}
        </Alert>
        </Snackbar>

        </div>
    );
}