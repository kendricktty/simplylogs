import React from 'react'
import ReactDOM from 'react-dom'
import DataTable from 'react-data-table-component';
import CustomMaterialPagination from '../materialui/CustomMaterialPagination';
import data from '../data/data.json'
import Barcode from 'react-barcode'

/*
https://react-data-table-component.netlify.app/?path=/docs/api-columns--page -- link to 
  table  api
*/
// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


//test data ultimate we will have to pull data from backend to add to this

// !! moved in data.json !! //
// const data = 
// {inventory: [
//     {
//         productId: 1,
//         productName: 'Beetlejuice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 2,
//         productName: 'Apple Juice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 3,
//         productName: 'Water',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 4,
//         productName: 'Sprite',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 5,
//         productName: 'Fanta Grape',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 6,
//         productName: 'Fanta Orange',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 7,
//         productName: 'Root Beer',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 8,
//         productName: 'Beetlejuice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 9,
//         productName: 'Beetlejuice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 10,
//         productName: 'Beetlejuice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 11,
//         productName: 'Beetlejuice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 12,
//         productName: 'Beetlejuice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 13,
//         productName: 'Beetlejuice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     },
//     {
//         productId: 14,
//         productName: 'Beetlejuice',
//         supplier: 'Coca Cola',
//         quatity: 99,
//         price: "$1.20"
//     }
// ]}



export default function InventoryTable() {

    const [dynamicData, setDynamicData] = React.useState(data)

    
    //testing editing of data only can edit name for now//
    const handleEditButtonClick = (data) => {
        let newName = prompt("Enter new name: ")
        if(newName === null) {
            newName = data.productName
        }
        const id = data.productId
        setDynamicData(prevState => ({
            inventory: prevState.inventory.map(
                el => el.productId === id ? {...el, productName: newName} : el 
            )
        }))

    };

    const handleGenerateButtonClick = (data) => {
        const productName = data.productName
        ReactDOM.render(
            <Barcode value={productName} />,
            document.getElementById("barcode")
        );
    }

    const columns = [
        {
            name: 'ProductID',
            selector: row => row.productId,
            sortable: true,
            sortField: 'title',
            maxWidth: "120px"
        },
        {
            name: 'ProductName',
            selector: row => row.productName,
            sortable: true,
            sortField: 'title'
        },
        {
            name: 'Supplier',
            selector: row => row.supplier,
            sortable: true,
            sortField: 'title'
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
            sortField: 'title',
            maxWidth: "120px"
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
            sortField: 'title',
            maxWidth: "120px"
        },
        {
            cell: (data) => <button onClick={()=>handleEditButtonClick(data)} className='btn btn-warning'>edit</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }, {
            cell: (data) => <button onClick={()=>handleGenerateButtonClick(data)} className='btn btn-success'>generate</button>,
            ignoreRowClick: true, 
            allowOverflow: false,
            button: true,
        }
    ];
    

    return (
        <DataTable
            className="dataTable"
            columns={columns}
            data={dynamicData.inventory}
            fixedHeader={true}
            selectableRows
            // actions={
            //     (<InventoryUtilityBar />)
            // }
            //adding pagination to the table
            pagination
            paginationComponent={CustomMaterialPagination}
        />
    );
};