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

    let formattedOrderData
    const products = props.order.rowData.products

    if (products) {
        formattedOrderData = products.map(({productId,productName,price,quantity}) => ({productId,productName,price,quantity,total: quantity * price}));
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