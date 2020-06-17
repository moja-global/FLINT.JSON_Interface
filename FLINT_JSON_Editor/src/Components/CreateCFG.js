import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    // width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}
export default function TransferList() {
  var peatland_JSON = [
    'peatland_modules.json', 'standard_gcbm_modules.json',
    'peatland_output_modules.json', 'standard_gcbm_pools.json',
    'peatland_pools.json', 'standard_gcbm_provider_config.json',
    'peatland_variables.json', 'standard_gcbm_spinup.json',
    'standard_gcbm_internal_variables.json', 'standard_gcbm_variables.json',
    'standard_gcbm_localdomain.json'
  ];
  
  var standard_JSON = [
    'standard_gcbm_internal_variables.json', 'standard_gcbm_pools.json',
    'standard_gcbm_localdomain.json', 'standard_gcbm_provider_config.json',
    'standard_gcbm_modules.json', 'standard_gcbm_spinup.json',
    'standard_gcbm_output_modules.json', 'standard_gcbm_variables.json'
  ];
  
  var a_n_partitioning_JSON = [
    'a_n_partitioning_internal_variables.json', 'standard_gcbm_output_modules.json',
    'a_n_partitioning_modules.json', 'standard_gcbm_pools.json',
    'a_n_partitioning_variables.json', 'standard_gcbm_provider_config.json',
    'standard_gcbm_internal_variables.json', 'standard_gcbm_spinup.json',
    'standard_gcbm_localdomain.json', 'standard_gcbm_variables.json',
    'standard_gcbm_modules.json'
  ]
  
  var JSON_array = [...new Set(standard_JSON.concat(a_n_partitioning_JSON).concat(peatland_JSON))];
  
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(JSON_array);
  const [right, setRight] = React.useState([]);
  React.useEffect(()=>{document.getElementById("next_btn").style.backgroundColor="#4caf50";document.getElementById("next_btn").style.color="rgba(0, 0, 0, 0.87)"})


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
console.log(left);
console.log(right);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />

            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid xs={5} item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid xs={5} item>{customList('Chosen', right)}</Grid>
    </Grid>
  );
}
