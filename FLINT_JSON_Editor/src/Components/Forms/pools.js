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

export default function Pools(props){
    const classes = useStyles();

    // const [Pools, setPools] = React.useState([
    //     {
    //         poolName: "Acrotelm_A",
    //         poolValue: "0.0"
    //     },
    //     {
    //         poolName: "Acrotelm_B",
    //         poolValue: "0.0"
    //     }
    // ]);
    const [Pools, setPools] = React.useState([...fetchJSON()]);

    // const [PoolsDup, setPoolsDup] = React.useState(Pools);
    const [tempLibrary, setTempLibrary] = React.useState({});

    useEffect(()=>{
        const temp={};
        Pools.map(inp => temp[inp.poolName]=inp.poolValue);
        const temp1={};
        temp1["Pools"]=temp;
        console.log(JSON.stringify(temp1));
        setTempLibrary(temp1);
    },[Pools]);

    function handleChangePool(index, type, value)
    {
        const temp = [...Pools];
        temp[index][type]=value;
        setPools(temp);
        // setPoolsDup(temp);
        console.log(Pools);
    }

    function addPool()
    {
        const temp = [...Pools];
        temp.push({
            poolName : "",
            poolValue: ""
        });
        setPools(temp);
        // setPoolsDup(temp);
        console.log(Pools);
    }

    function deletePool(index)
    {
        console.log(index);
        const temp = [...Pools];
        temp.splice(index,1);
        setPools(temp);
        console.log(Pools);
        // document.getElementById("pool"+index).style.display="none";
    }
    
    function fetchJSON()
    {
        const temp=[];
        // console.log(props.json.Pools)
        console.log(props.json!=undefined)
        if(props.json!=undefined)
        for (const [key, value] of Object.entries(props.json.Pools)) {
            temp.push({
                poolName: key,
                poolValue: value
            })
        }
        return temp;
    }

    return(
        <div id="container">
            <div id="jsonEditor">
                <h1>Pools:</h1>
                <Paper elevation={5} className={classes.paper}>
                {
                    Pools.map((inputField, index) => (
                        <div>
                            <FormControl className={classes.formControl}>
                                <TextField id="name" label="Pool Name" variant="filled" value={inputField.poolName} onChange={event => handleChangePool(index, "poolName", event.target.value)} />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField id="name" label="Pool Value" variant="filled" value={inputField.poolValue} onChange={event => handleChangePool(index, "poolValue", event.target.value)} />
                            </FormControl>
                            <IconButton color="primary" aria-label="add library" style={{marginTop: "10px"}} onClick={()=>{deletePool(index)}}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                    ))
                }
                {/* <br /><br /><br /> */}
                
                    <IconButton color="primary" aria-label="add library" style={{marginLeft: "16vw"}} onClick={()=>addPool()}>
                        <AddCircleIcon />
                    </IconButton>
                </Paper>
                {/* <div id="up">{te}</div> */}
           </div>

           <div id="jsonViewer"><pre>
          {JSON.stringify(tempLibrary, null, 2)}
        </pre></div>
        </div>
    );
}