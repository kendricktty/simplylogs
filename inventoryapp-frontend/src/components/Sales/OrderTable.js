import React from "react";
import MaterialTable from "material-table";
import {
    Form,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    Modal,
    ModalBody,
} from "react-bootstrap";

export default function OrderTable(props) {

    console.log(props.order.rowData.products);

    /*  category: "Food"
        price: 1.25
        productId: 1
        productName: "CocoNut drink"
        productRef: "62cb105d8f0e77758204eebf"
        quantity: 2
        supplier: "Coca Cola"
        _id: "62cbaca196ea08a131795dcf"
    */

    let formattedOrderData
    const products = props.order.rowData.products

    if (products) {
        formattedOrderData = products.map(({productId,productName,price,quantity}) => ({productId,productName,price,quantity,total: quantity * price}))
        console.log(formattedOrderData);
    }
    
    
    const columns=[
        {title:"Product ID",field:"productId"},
        {title:"Product Name",field:"productName"},
        {title:"Price",field:"price"},
        {title:"Quantity",field:"quantity"},
        {title:"Total",field:"total"}
    ]

    const handleClose = () => props.setOrder((prevState) => { return {... prevState, show : false}});
    return (
        <Modal size="lg" show={props.order.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Invoice {props.order.rowData.invoiceNo}</Modal.Title>
            </Modal.Header>
            <MaterialTable 
                title = "Sales"
                data = {formattedOrderData}
                columns = {columns}
                options = {
                    {
                        search: true,
                        paging: true
                    }
                }
            />
        </Modal>
    )
}