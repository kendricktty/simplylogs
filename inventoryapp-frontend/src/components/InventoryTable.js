import React from 'react'
import DataTable from 'react-data-table-component';
import CustomMaterialPagination from '../materialui/CustomMaterialPagination';

/*
https://react-data-table-component.netlify.app/?path=/docs/api-columns--page -- link to 
  table  api
*/
// A super simple expandable component.
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

//
const columns = [
    {
        name: 'ProductID',
        selector: row => row.productId,
        sortable: true,
		sortField: 'title'
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
        selector: row => row.quatity,
        sortable: true,
		sortField: 'title'
    },
    {
        name: 'Price',
        selector: row => row.price,
        sortable: true,
		sortField: 'title'
    },
];

//test data ultimate we will have to pull data from backend to add to this

const data = [
    {
        productId: 1,
        productName: 'Beetlejuice',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 3,
        productName: 'Apple Juice',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 2,
        productName: 'Water',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 1,
        productName: 'Sprite',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 1,
        productName: 'Fanta Grape',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 1,
        productName: 'Fanta Orange',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 1,
        productName: 'Root Beer',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 1,
        productName: 'Beetlejuice',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 1,
        productName: 'Beetlejuice',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    },
    {
        productId: 1,
        productName: 'Beetlejuice',
        supplier: 'Coca Cola',
        quatity: 99,
        price: "$1.20"
    }
   
]

export default function InventoryTable() {
    return (
        <DataTable
            className="dataTable"
            columns={columns}
            data={data}
            selectableRows
            //adding pagination to the table
            pagination
            paginationComponent={CustomMaterialPagination}
        />
    );
};