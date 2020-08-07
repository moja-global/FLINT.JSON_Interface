import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import JSONEditor from 'jsoneditor';
// import "../ScratchJSONEditor.css";
import "jsoneditor/dist/jsoneditor.min.js";
import List from '@material-ui/core/List';
import "jsoneditor/dist/jsoneditor.min.css";
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
    },
    appBar: {
        position: 'relative',
      },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modules(){
    const classes = useStyles();
    var editor;
    const [Modules, setModules] = React.useState([
        {
            key: "CBMDisturbanceListener",
            value: {
            "enabled": true,
            "order": 20,
            "library": "moja.modules.cbm",
            "settings": [
                {
                    key: "vars",
                    value: ["aaa","bbb"]
                },
                {
                    key: "extra_decay_removals",
                    value: false
                },
                {
                    key: "ex1",
                    value: {
                        "key1": "val1",
                        "key2": "val2"
                        },
                },
                {
                    key: "ex2",
                    value: "val2"
                }
            ]
            },
        },
    ]);
    // const [ModulesDup, setModulesDup] = React.useState(Modules);
    const [tempLibrary, setTempLibrary] = React.useState({});
    useEffect(()=>{
        var temp={};
        Modules.map(inp => {
            temp[inp.key]=inp.value;
            const temp1={};
            temp[inp.key]["settings"].map(input=>temp1[input.key]=input.value);
            temp=JSON.parse(JSON.stringify(temp));//trick to avoid reference errors
            temp[inp.key]["settings"]=temp1;
            console.log(temp1);
        });
        const temp1={};
        temp1["Modules"]=temp;
        console.log(JSON.stringify(temp1));
        setTempLibrary(temp1);
    },[Modules]);

    function handleChange(index, type, value)
    {
        const temp = [...Modules];
        if(type=="key")
        temp[index].key=value;
        else
        temp[index].value[type]=value;
        setModules(temp);
        // setModulesDup(temp);
        console.log(Modules);
    }

    function addModules()
    {
        const temp = [...Modules];
        temp.push({
            key: "",
            value: {
            "enabled": true,
            "order": 0,
            "library": "moja.modules.cbm",
            "settings": [
                {
                    key: "vars",
                    value: []
                }
            ]
            },
        },);
        setModules(temp);
        // setModulesDup(temp);
        console.log(Modules);
    }

    function deleteModule(index)
    {
        console.log(index);
        const temp = [...Modules];
        temp.splice(index,1);
        setModules(temp);
        console.log(temp);
        // document.getElementById("modules"+index).style.display="none";
    }
    
    function determineType(val)
    {
        if(Array.isArray(val))
        return "array";
        else if(typeof(val)=="object")
        return "object";
        else if(typeof(val)=="string")
        return "string";
        else 
        return "boolean";
    }

    const [open, setOpen] = React.useState({"disp": false});

    const handleClickOpen = (idx1, idx2, value, key) => {
        setOpen({"disp": true, "index1": idx1, "index2": idx2, "json": value, "key": key});
    };

    const handleClose = (flag, idx1, idx2) => {
        if(flag)
        {
            handleChangeSettings(idx1, idx2, "value", editor.get())
        }
        document.getElementById("jsoneditor").innerHTML="";
        setOpen({"disp" : false});
    };
    
    function init(value){
        document.getElementById("jsoneditor").innerHTML="";
        editor = new JSONEditor(document.getElementById("jsoneditor"), {});
        editor.set(value)
    }

    function handleChangeSettings(idx1, idx2, key, value)
    {
        const temp=[...Modules];
        if(key=="type")
        {
            if(value=="array")
            temp[idx1].value.settings[idx2]["value"]=[];
            else if(value=="object")
            temp[idx1].value.settings[idx2]["value"]={};
            else if(value=="boolean")
            temp[idx1].value.settings[idx2]["value"]=false;
            else if(value=="string")
            temp[idx1].value.settings[idx2]["value"]="";
        }
        else if(key=="array")
        temp[idx1].value.settings[idx2]["value"]=value.split(',');
        else
        temp[idx1].value.settings[idx2][key]=value;
        setModules(temp);
    }

    function addSettings(index)
    {
        const temp=[...Modules];
        temp[index].value.settings.push({
            key: "",
            value: ""
        })
        setModules(temp);
    }

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
                                    <TextField id="filled-basic" label="order" variant="filled" value={inputfield.value.order} onChange={(event)=>handleChange(index, "order", event.target.value)} />
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField id="filled-basic" label="library" variant="filled" value={inputfield.value.library} onChange={(event)=>handleChange(index, "library", event.target.value)} />
                                </FormControl>

                                {/* <Paper elevation={5} className={classes.paper}> */}
                                    <h1>settings</h1>
                                    {
                                        inputfield.value.settings.map((inp,idx)=>(
                                            <div><Paper elevation={5} >
                                                <FormControl className={classes.formControl}>
                                                    <TextField id="filled-basic" label="key" variant="filled" value={inp.key} onChange={(event)=>handleChangeSettings(index, idx, "key", event.target.value)} />
                                                </FormControl>
                                                <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Setting Type</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    className={classes.libraryType}
                                                    value={determineType(inp.value)}
                                                    onChange={event => handleChangeSettings(index, idx, "type", event.target.value)}
                                                    >
                                                    <MenuItem value={"string"}>string</MenuItem>
                                                    <MenuItem value={"array"}>array</MenuItem>
                                                    <MenuItem value={"boolean"}>boolean</MenuItem>
                                                    <MenuItem value={"object"}>object</MenuItem>
                                                </Select>
                                                </FormControl>
                                                {determineType(inp.value)=="string" && <FormControl className={classes.formControl}>
                                                    <TextField id="filled-basic" label="value" variant="filled" value={inp.value} onChange={(event)=>handleChangeSettings(index, idx, "value", event.target.value)} />
                                                </FormControl>}
                                                {determineType(inp.value)=="array" && <FormControl className={classes.formControl}>
                                                    <TextareaAutosize style={{height: "50px", width: "40vw"}} id="filled-basic" label="value" variant="filled" defaultValue={inp.value} onChange={(event)=>handleChangeSettings(index, idx, "array", event.target.value)} />
                                                </FormControl>}
                                                {determineType(inp.value)=="boolean" && <Switch
                                                checked={inp.value}
                                                onChange={event => handleChangeSettings(index, idx, "value", event.target.checked)}
                                                color="primary"
                                                name="checkedB"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />}
                                                {
                                                    determineType(inp.value)=="object" && <div style={{display: "inline-block"}}>
                                                    <Button variant="outlined" color="primary" onClick={()=>handleClickOpen(index, idx, inp.value, inp.key)}>
                                                    Open 
                                                    </Button>
                                                    
                                                    </div>
                                                        
                                                }
                                            </Paper>
                                            <br />
                                            </div>
                                        ))
                                        
                                    }
                                    <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>addSettings(index)}>
                                        <AddCircleIcon />
                                    </IconButton>
                                {/* </Paper> */}

    
                                </Paper>
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                    <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>addModules()}>
                        <AddCircleIcon />
                    </IconButton>
                    {<Dialog fullScreen open={open.disp} onClose={()=>handleClose(false)} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={()=>handleClose(false)} aria-label="close">
                        <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {open.key}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={()=>init(open.json)}>
                            Load Data in Editor
                        </Button>
                        <Button autoFocus color="inherit" onClick={()=>handleClose(true, open.index1, open.index2)}>
                            Save
                        </Button>
                        </Toolbar>
                        </AppBar>
                        <pre id="jsoneditor">{JSON.stringify(open.json, null, 2)}</pre>
                    </Dialog>}
           </div>

           <div id="jsonViewer"><pre>
          {JSON.stringify(tempLibrary, null, 2)}
        </pre></div>
        </div>
    );
}