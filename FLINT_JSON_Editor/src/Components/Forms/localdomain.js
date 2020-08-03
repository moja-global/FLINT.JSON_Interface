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
import '../../css/form.css';

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

export default function LocalDomain(props){
    const classes = useStyles();
    console.log(props.json.LocalDomain);
    const [Libraries, setLibraries] = React.useState([
        {
            libraryName : "moja.modules.cbm",
            libraryType: "external"
        },
        {
            libraryName : "",
            libraryType: ""
        }
    ]);
    const [LocalDomain, setLocalDomain] = React.useState({
        start_date : new Date('2014-08-18T21:11:54'),
        end_date : new Date('2014-08-19T21:11:54'),
        landUnitBuildSuccess: "landUnitBuildSuccess",
        simulateLandUnit: "simulateLandUnit",
        sequencer_library: "moja.modules.cbm",
        sequencer: "CBMSequencer",
        timing: "annual",
        type: "spatial_tiled",
        landscape: {
            "provider": "RasterTiled",
            "num_threads": 4,
            "tiles": [],
            "x_pixels": 1000,
            "y_pixels": 1000,
            "tile_size_x": 1.0,
            "tile_size_y": 1.0
        }
    }); 
    const [tempLibrary, setTempLibrary] = React.useState({});

    useEffect(()=>{console.log(Libraries);
        const temp={};
        Libraries.map(inp => temp[inp.libraryName]=inp.libraryType);
        const temp1={};
        temp1["Libraries"]=temp;
        temp1["LocalDomain"]=LocalDomain;
        console.log(JSON.stringify(temp1));
        setTempLibrary(temp1);

    },[Libraries, LocalDomain]);

    function handleChangeLibrary(index, libraryName, libraryType)
    {
        const tempLibraries = [...Libraries];
        tempLibraries[index].libraryName = libraryName!=="" ? libraryName : tempLibraries[index].libraryName ;
        tempLibraries[index].libraryType = libraryType!=="" ? libraryType : tempLibraries[index].libraryType ;
        setLibraries(tempLibraries);
    }

    function addLibrary()
    {
        const tempLibraries = [...Libraries];
        tempLibraries.push({
            libraryName : "",
            libraryType: ""
        });
        setLibraries(tempLibraries);
    }

    function deleteLibrary(index)
    {
        const tempLibraries = [...Libraries];
        tempLibraries.splice(index,1);
        setLibraries(tempLibraries);
    }

    function handleChangeLocalDomain(key, value)
    {
        const tempLibraries = {...LocalDomain};
        tempLibraries[key] = value;
        setLocalDomain(tempLibraries);
        console.log(LocalDomain);
    }

    return(
        <div id="container">
            <div id="jsonEditor">
                <h1>Libraries:</h1>
                <Paper elevation={5} className={classes.paper}>
                {
                    Libraries.map((inputField, index) => (
                        <div>
                            <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Library Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={classes.libraryName}
                                value={(inputField.libraryName=="" || inputField.libraryName=="moja.modules.cbm" || inputField.libraryName=="moja.modules.zipper" || inputField.libraryName=="moja.modules.gdal")?inputField.libraryName : "other"}
                                onChange={event => {if(event.target.value=="other"){handleChangeLibrary(index, event.target.value, "");document.getElementById("other"+index).style.display="block";document.getElementById("other-val"+index).value=""} else {document.getElementById("other"+index).style.display="none";handleChangeLibrary(index, event.target.value, "")}}}
                                >
                                <MenuItem value={"moja.modules.cbm"}>moja.modules.cbm</MenuItem>
                                <MenuItem value={"moja.modules.zipper"}>moja.modules.zipper</MenuItem>
                                <MenuItem value={"moja.modules.gdal"}>moja.modules.gdal</MenuItem>
                                <MenuItem value={"other"}>other</MenuItem>
                            </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <div id={"other"+index} style={{display: "none"}}><TextField id={"other-val"+index} label="library name" onChange={event => handleChangeLibrary(index, event.target.value, "")} /></div>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Library Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className={classes.libraryType}
                                value={inputField.libraryType}
                                onChange={event => handleChangeLibrary(index, "", event.target.value)}
                                >
                                <MenuItem value={"internal"}>internal</MenuItem>
                                <MenuItem value={"external"}>external</MenuItem>
                            </Select>
                            </FormControl>
                            <IconButton color="primary" aria-label="add library" style={{marginTop: "10px"}} onClick={()=>{document.getElementById("other"+index).style.display="none";deleteLibrary(index)}}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    ))}
                    <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>addLibrary()}>
                        <AddCircleIcon />
                    </IconButton>
                </Paper>

                <h1>LocalDomain:</h1>
                <Paper elevation={5} className={classes.paper}>
                        <div>
                        <FormControl className={classes.formControl}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                margin="normal"
                                id="start_date"
                                label="start_date(yy/mm/dd)"
                                format="yyyy/MM/dd"
                                value={LocalDomain.start_date}
                                onChange={date => handleChangeLocalDomain("start_date",date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                            {/* <br /> */}
                        <FormControl className={classes.formControl}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                margin="normal"
                                id="end_date"
                                label="end_date(yy/mm/dd)"
                                format="yyyy/MM/dd"
                                value={LocalDomain.end_date}
                                onChange={date => handleChangeLocalDomain("end_date",date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                            <br />
                        <FormControl className={classes.formControl}>
                            <TextField id="landUnitBuildSuccess" label="landUnitBuildSuccess" variant="filled" defaultValue={LocalDomain.landUnitBuildSuccess} onChange={event => handleChangeLocalDomain("landUnitBuildSuccess",event.target.value)} />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField id="simulateLandUnit" label="simulateLandUnit" variant="filled" defaultValue={LocalDomain.simulateLandUnit} onChange={event => handleChangeLocalDomain("simulateLandUnit",event.target.value)} />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField id="filled-basic" label="sequencer_library" variant="filled" defaultValue={LocalDomain.sequencer_library} onChange={event => handleChangeLocalDomain("sequencer_library",event.target.value)} />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField id="filled-basic" label="sequencer" variant="filled" defaultValue={LocalDomain.sequencer} onChange={event => handleChangeLocalDomain("sequencer",event.target.value)}/>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">timing</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="timing"
                                className={classes.libraryName}
                                value={LocalDomain.timing}
                                onChange={event => handleChangeLocalDomain("timing",event.target.value)}
                                >
                                <MenuItem value={"annual"}>annual</MenuItem>
                                <MenuItem value={"monthly"}>monthly</MenuItem>
                                <MenuItem value={"daily"}>daily</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            {/* <TextField id="filled-basic" label="type" variant="filled" defaultValue={LocalDomain.type} /> */}
                            <InputLabel id="demo-simple-select-label">type</InputLabel>
                            <Select
                                labelId="demo"
                                id="type"
                                className={classes.libraryName}
                                value={LocalDomain.type}
                                onChange={event => handleChangeLocalDomain("type",event.target.value)}
                                style = {{width: "300px"}}
                                >
                                <MenuItem value={"spatial_tiled"}>spatial_tiled</MenuItem>
                                <MenuItem value={"spatially_referenced_sql"}>spatially_referenced_sql</MenuItem>
                                <MenuItem value={"spatially_referenced_nosql"}>spatially_referenced_nosql</MenuItem>
                                <MenuItem value={"threaded_spatially_referenced_nosql"}>threaded_spatially_referenced_nosql</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                </Paper>

            </div>
            <div id="jsonViewer"><pre>
          {JSON.stringify(tempLibrary, null, 2)}
        </pre></div>
        </div>
    );
}