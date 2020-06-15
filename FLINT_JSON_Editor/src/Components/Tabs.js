import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { GmailTabs, GmailTabItem } from '@mui-treasury/components/tabs/gmail';
import Inbox from '@material-ui/icons/Inbox';
import LocalOffer from '@material-ui/icons/LocalOffer';
import People from '@material-ui/icons/People';
import Info from '@material-ui/icons/Info';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIndex(value);
  };

  return (
    <div className={classes.root}>
      <GmailTabs value={index} onChange={handleChange}>
      <GmailTabItem icon={<Inbox />} label={'Primary'} {...a11yProps(0)}/>
      <GmailTabItem
        icon={<People />}
        label={'Social'}
        tag={'2 new'}
        subLabel={'Youtube, LinkedIn'}
        {...a11yProps(1)}
      />
      <GmailTabItem
        icon={<LocalOffer />}
        label={'Promotions'}
        subLabel={'Pattern Matching, Medium Daily'}
        {...a11yProps(2)}
      />
      <GmailTabItem icon={<Info />} label={'Updates'} tag={'15 new'} {...a11yProps(3)} />
    </GmailTabs>
      {/* <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar> */}
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
