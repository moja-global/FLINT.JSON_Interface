import React from 'react';
import update from 'react-addons-update';
import Tabs from "react-draggable-tabs";
import Editor from './ScratchJSONEditor';
const fs = require("fs");

export default function EditorEntry(props) {
  // const classes = useStyles();
  props={
    files: ["standard_gcbm_variables.json","standard_gcbm_spinup.json","standard.json"]
  };
  const [tabs,setTabs] = React.useState([
    {
        id: 1,
        content: "Scratch JSoN Editor",
        active: true,
        display: <div></div>
    },
    {
        id: 2,
        content: <span><i className="fa fa-paw" aria-hidden="true"></i> 2nd Tab </span>,
        display: <div></div>
    },
    {
        id: 3,
        content: '3rd Tab',
        display: <div></div>
    },
]);
const [view,setView] = React.useState(false);

function moveTab(dragIndex, hoverIndex) {
  let newTabs = [...tabs];
  newTabs.splice(hoverIndex, 0, newTabs.splice(dragIndex, 1)[0]);
  setTabs(newTabs);
}

console.log(props.files);
fs.readdir('src/storage/templates/files',(err,files)=>{
  if(err) throw err;
  console.log(files)
});

function selectTab(selectedIndex, selectedID) {
  console.log("se "+selectedID);
  const newTabs = tabs.map(tab => ({
    ...tab,
    active: tab.id === selectedID
  }));
  setTabs(newTabs);
  if(selectedID==1)
  {document.getElementById("v1").style.display="block";document.getElementById("v2").style.display="none";document.getElementById("v3").style.display="none";}
  else if(selectedID==2)
  {document.getElementById("v1").style.display="none";document.getElementById("v2").style.display="block";document.getElementById("v3").style.display="none";}
  else
  {document.getElementById("v1").style.display="none";document.getElementById("v2").style.display="none";document.getElementById("v3").style.display="block";}

}
console.log(view);

function closedTab(removedIndex, removedID) {
  let newTabs = [...tabs]
      newTabs.splice(removedIndex, 1)

      if (tabs[removedIndex].active && newTabs.length !== 0) { // automatically select another tab if needed
          const newActive = removedIndex === 0
              ? 0
              : removedIndex - 1
          newTabs[newActive].active = true;
      }
  setTabs(newTabs);
}

function addTab(){
  let newTabs = [...tabs]
      newTabs.push({
          id: newTabs.length+1,
          content: 'Cute *',
      display: <div key={newTabs.length+1}>Cute *</div>})
  setTabs(newTabs);
}

const activeTab = tabs.filter(tab => tab.active === true);
console.log(tabs);
document.body.style.backgroundImage='none';

return (
    <div>
      <Tabs moveTab={moveTab} selectTab={selectTab} closeTab={closedTab} tabs={tabs}>
        <button onClick={addTab}>+</button>
      </Tabs>
      <div id="container">
      <div id="v1" style={{display: "none"}}>view1</div>
      <div id="v2" style={{display: "none"}}>view2</div> 
      <div id="v3" style={{display: "none"}}>view3</div> 
      </div>
        {activeTab.length !== 0 ? activeTab[0].display : ""}
    </div>
  );
}
