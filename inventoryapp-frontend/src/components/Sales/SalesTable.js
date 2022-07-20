import React from "react";
import MaterialTable from "material-table";
import { CsvBuilder } from 'filefy';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function SalesTable(props) {


    const orderData = props.data
    console.log(orderData)
    
    const formattedOrderData = orderData.map( ({_id,invoiceNo,company,createdAt,updatedAt,grossTotal}) => 
    ({_id,invoiceNo,company,createdAt,updatedAt,grossTotal}))



    
    const columns=[
        {title:"ID",field:"_id"},
        {title:"Invoice No",field:"invoiceNo"},
        {title:"Company",field:"company"},
        {title:"Created At",field:"createdAt"},
        {title:"Updated At",field:"updatedAt"},
        {title:"Gross Amount",field:"grossTotal"}
    ]

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '-' + dd + '-' + yyyy;

    return (
        <>
            <MaterialTable 
                title = "Sales"
                data = {formattedOrderData}
                columns = {columns}
                options = {
                    {
                        search: false,
                        paging: true,
                        filtering: true,
                        pageSize: 10,
                        maxBodyHeight: "500px",
                        exportButton: {
                            csv: true,
                            pdf: true,
                        },
                        exportCsv: () => {
                            const columnTitles = columns
                                .map(columnDef => columnDef.title);
                            
                            const csvData = formattedOrderData.map(rowData =>
                                  columns.map(columnDef => rowData[columnDef.field]),
                                );
                          
                            const builder = new CsvBuilder(`Orders_${today}_.csv`)
                                  .setColumns(columnTitles)
                                  .addRows(csvData)
                                  .exportFile();
                          
                            return builder;
                          },
                          exportPdf: () => {
                            const doc = new jsPDF();
                          
                            const columnTitles = columns
                                .map(columnDef => columnDef.title);
                            
                            const pdfData = formattedOrderData.map(rowData =>
                                  columns.map(columnDef => rowData[columnDef.field]),
                                );
                          
                            doc.autoTable({
                               head: [columnTitles],
                               body: pdfData,
                            });
                          
                            doc.save(`Orders_${today}_.pdf`);
                          }


                }
            }
                onRowClick = {props.copy}
                
            /> 
        </>
    )
}