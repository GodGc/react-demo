import React from 'react';
import './App.css';
import ExportJsonExcel from 'js-export-excel';
const arr = Array.from(new Array(35), (v,i) => { return {value: 'a'+i,isSelect:false}});

class NumberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectList: [],
      listItems:arr,
      preSelected:[2,3,8]
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleExportAllSelected = this.handleExportAllSelected.bind(this);
  }

  componentWillMount() {
    let {listItems,preSelected,selectList} = this.state;
    preSelected.forEach((item)=>{
      listItems[item].isSelect = true;
      let temp = listItems[item];
      listItems.splice(item,1);
      listItems.unshift(temp);
      selectList.push(temp);
    })
  }

  handleClick(e) {
    let {listItems,selectList} = this.state;
    let tag = e.target;
    const nodeName = e.target.nodeName.toUpperCase()
    if(nodeName==='LI'){
      let index = parseInt(tag.getAttribute('index'));
      if(e.target.className==='current'){
        listItems[index].isSelect = false;
        selectList.splice(selectList.indexOf(listItems[index]),1)
      }else{
        listItems[index].isSelect = true;
        selectList.push(listItems[index]);
      }
    }
    if(selectList.length>10){
      let changeItem = selectList[0];
      let tempIndex = listItems.indexOf(changeItem);
      listItems[tempIndex].isSelect = false;
      selectList.splice(0,1)
    }
    this.setState({
      selectList,listItems
    })
  }

  handleExportAllSelected (){
    let {selectList} = this.state;
    window.alert("The result is already printed on the browser's console(F12)");
    console.dir(selectList);
    let option={};
    let tmpSheetData = [{one:'Item',two:'Status'}];
    selectList.forEach((item)=>{
      tmpSheetData.push({one:item.value,two:item.isSelect?'选中':'未选中'})
    });
    option.fileName = 'excel'
    option.datas=[
      {
        sheetData:tmpSheetData
      }
    ];
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }

  render() {
    return (
      <div>
        <ul onClick={(e)=>this.handleClick(e)}>
          {
            this.state.listItems.map((item,index) =>
              <li key={index} index={index} className={item.isSelect?'current':''}>{item.value}</li>
            )
          }
        </ul>
        <button className="export-btn" onClick={this.handleExportAllSelected}>export all selected Items</button>
      </div>
      
    );
  }
}

export default NumberList