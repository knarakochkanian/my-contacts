import React, { useState } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import { render } from '@testing-library/react';
import { Avatar } from '@material-ui/core';

const empList = [
  { id: 1, name: "Anna", email: 'annaj@gmail.com', phone: 9876543210, },
  { id: 2, name: "Raya", email: 'raya@gmail.com', phone: 9812345678, },
  { id: 3, name: "David", email: 'david342@gmail.com', phone: 7896536289,},
  { id: 4, name: "Vika", email: 'vika75@gmail.com', phone: 9087654321,},
]

function App() {

  const [data, setData] = useState(empList)
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name", render:(row)=><Avatar>{row.name[0]}</Avatar>},
    { title: "Name", field: "name" },
    { title: "Phone Number", field: 'phone', },
    { title: "Email", field: "email" },
  ]

  return (
    <div className="App">
      <h1 align="center">My contacts</h1>
      <h4 align='center'>react app</h4>
      <MaterialTable
        title="Data"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onBulkUpdate:selectedRows=>new Promise((resolve,reject)=>{
            const rows=Object.values(selectedRows)
            const updatedRows=[...data]
            let index;
            rows.map(emp=>{
               index=emp.oldData.tableData.id
               updatedRows[index]=emp.newData
            })
            setTimeout(()=>{
              setData(updatedRows)
              resolve()
            },2000)
          
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />
    </div>
  );
}

export default App;