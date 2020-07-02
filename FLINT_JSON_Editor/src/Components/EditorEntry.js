import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import Tabs from "react-draggable-tabs";
import Editor from './ScratchJSONEditor';
const fs = require("fs");
import MyDialog from './Dialog';
const {dialog} = require('electron').remote;
import { count } from 'console';
import { Checkbox } from '@material-ui/core';
const {basename} = require('path');

export default function EditorEntry(props) {
  // const classes = useStyles();
  props={
    files: ["standard_gcbm_variables.json","standard_gcbm_spinup.json","standard.json"]
  };

  const [tabs,setTabs] = React.useState([]
//     [{
//         id: 1,
//         content: "Scratch JSoN Editor",
//         active: true,
//         display: <div></div>
//     },
//     {
//         id: 2,
//         content: <span><i className="fa fa-paw" aria-hidden="true"></i> 2nd Tab </span>,
//         display: <div></div>
//     },
//     {
//         id: 3,
//         content: '3rd Tab',
//         display: <div></div>
//     }]
);

var map=new Map();
const [view,setView] = React.useState(false);
const [dialogDisp, setdialogDisp] = React.useState(false);
const [notFound, setNotFound] = React.useState([]);
const [showTab, setShowTab] = React.useState(false);
const [newTab, setNewTab] = React.useState(0);
const [tabBody, setTabBody] = React.useState([]);
var countTabs=0;

fs.readdir('src/storage/templates/files',(err,files)=>{
  if(err) throw err;
  console.log(files);
  for(var i=0;i<files.length;i++)
    map.set(files[i],true);
  for(var i=0;i<props.files.length;i++)
    if(!(map.get(props.files[i])))
      notFound.push(props.files[i]);
  console.log(notFound.length==0);
  setdialogDisp(true);
});

function initiateTabs(ans)
{
  var temp=[];
  for(var i=0;i<props.files.length;i++)
  {
    tabs.push({
      id: i,
      content: props.files[i],
      active: i==0 ? true : false,
      display: ""
    });
    // console.log(tabs);
    // addTab(props.files[i]);
    if(map.get(props.files[i]))
      temp.push(<div id={"tab"+countTabs} style={i==0?{display: "block"}:{display: "none"}}>{ans ? props.files[i]+"template":props.files[i]+"scratch"}</div>);
    else
      temp.push(<div id={"tab"+countTabs} style={i==0?{display: "block"}:{display: "none"}}>{props.files[i]+"scratch"}</div>);
    // setCountTabs(countTabs+1);
    countTabs+=1;
  }
  // ReactDOM.render(temp,document.getElementById("TabContainer"));
  setTabBody(temp);
  setShowTab(true);
  setNewTab(countTabs);
  console.log(map);
}

function displayTab(num)
{
  var divs=document.getElementById("TabContainer").getElementsByTagName("div");
  for(var i=0;i<divs.length;i++)
  {
    document.getElementById("tab"+i).style.display=(num==i?"block":"none");
  }
}

function moveTab(dragIndex, hoverIndex) {
  let newTabs = [...tabs];
  newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);
  setTabs(newTabs);
}

function selectTab(selectedIndex, selectedID) {
  console.log("se "+selectedID);
  const newTabs = tabs.map(tab => ({
    ...tab,
    active: tab.id === selectedID
  }));
  setTabs(newTabs);
  displayTab(selectedID);
}

function closedTab(removedIndex, removedID) {
  let newTabs = [...tabs]
      newTabs.splice(removedIndex, 1)

      if (tabs[removedIndex].active && newTabs.length !== 0) { // automatically select another tab if needed
          const newActive = (removedIndex === 0 ? 0: removedIndex - 1);
          newTabs[newActive].active = true;
          console.log(newActive);
      }
  setTabs(newTabs);
}

function addTab(){
  console.log(newTab);
  dialog.showOpenDialog({
    properties: ['openFile']
  }).then(result => {
    console.log(result.canceled)
    console.log(result.filePaths)
    let newTabs = [...tabs];
      newTabs.push({
          id: newTab,
          content: basename(result.filePaths[0]),
          display: "",
          active: newTabs.length==0 ? true : false,
      })
    setTabs(newTabs);
    console.log(map);
    // tabBody.push(<div id={"tab"} >aaaaa</div>);
    setTabBody([...tabBody, <div id={"tab"+newTab} style={newTabs.length==1 ? {display: "block"}:{display: "none"}}>{map.get(basename(result.filePaths[0]))?basename(result.filePaths[0])+"template":basename(result.filePaths[0])+"scratch"}</div> ]);
    // console.log(tabBody);
    setNewTab(newTab+1);
    }).catch(err => {
      console.log(err)
  });
}

// const activeTab = tabs.filter(tab => tab.active === true);
console.log(tabs);
document.body.style.backgroundImage='none';

return (
    <div>
      { dialogDisp && <MyDialog message={notFound.length==0 ? "You have chosen "+props.files+" to open in the editor. Choose mode!" : "You have chosen "+props.files+" to open in the editor. Choose mode!(Templates for "+notFound+" were not found so they will be automatically opened in ScratchJSONEditor regardless of chosen option)" }
                heading="JSON Editor"
                positive="Template Editor"
                negative="Scratch JSON Editor!"
                reply={(ans)=>{initiateTabs(ans);}} />}
      { showTab && <Tabs moveTab={moveTab} selectTab={selectTab} closeTab={closedTab} tabs={tabs}>
        <button onClick={()=>{console.log("click");addTab("aa")}}>+</button>
      </Tabs>}
      {/* {activeTab.length !== 0 ? activeTab[0].display : ""}  */}
      <div id="TabContainer">{tabBody}</div>
    </div>
  );
}
