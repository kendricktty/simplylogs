import React from "react";
import ReactDOM, { render } from "react-dom";
import DataTable from "react-data-table-component";
import CustomMaterialPagination from "../../materialui/CustomMaterialPagination";
import Barcode from "react-barcode";
import InventoryUtilityBar from "./InventoryUtilityBar";



/*
https://react-data-table-component.netlify.app/?path=/docs/api-columns--page -- link to 
  table  api
*/

export default function InventoryTable(props) {
  // States
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  
  //set filtered item to filtered array of items or empty array if inventory is undef
  const filteredItems = props.dynamicData.inventory
    ? props.dynamicData.inventory.filter(
        (item) =>
          item.productName &&
          item.productName.toLowerCase().includes(filterText.toLowerCase()) && item.category.includes(props.category)
      )
    : [];

  //adds new item to the current data
  function handleAddData(data) {
    props.setDynamicData((prevState) => {
      const newState = prevState;
      if (newState.inventory === undefined) {
        return { inventory: [data] };
      }
      return { inventory: [...prevState.inventory, data], count: prevState.inventory.length + 1 };
    });
  }

  //InventoryUtilityBar
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    
      return (
        <InventoryUtilityBar
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          handleAddData={handleAddData}
          dynamicData={props.dynamicData}
          productCount={props.dynamicData.count}
        />
      );
    
    
  }, [filterText, resetPaginationToggle, props]);

  
  const handleEditButtonClick = (data) => {
    props.setShowEditProduct((prevState) => !prevState);
    props.setEditFormParams(data);
  };

  const handleGenerateButtonClick = (data) => {
    const {productId, productName} = data
    ReactDOM.render(
      <>
        <div class="alert alert-light" role="alert">
          {productName}
        </div>
        <Barcode value={productId} />
      </>
      ,
      document.getElementById("barcode")
    );
  };

  const columns = [
    {
      name: "ProductID",
      selector: (row) => row.productId,
      sortable: true,
      sortField: "title",
      maxWidth: "120px",
    },
    {
      name: "ProductName",
      selector: (row) => row.productName,
      sortable: true,
      sortField: "title",
    },
    {
      name: "Supplier",
      selector: (row) => row.supplier,
      sortable: true,
      sortField: "title",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      sortField: "title",
      maxWidth: "120px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      sortField: "title",
      maxWidth: "120px",
    },
    {
      cell: (data) => (
        <button
          onClick={() => handleEditButtonClick(data)}
          className="btn btn-warning"
        >
          edit
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      cell: (data) => (
        <button
          onClick={() => handleGenerateButtonClick(data)}
          className="btn btn-success"
        >
          generate
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
    },
  ];

  return (
    <DataTable
      className="dataTable"
      columns={columns}
      data={filteredItems}
      fixedHeader={true}
      selectableRows
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      //adding pagination to the table
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      paginationComponent={CustomMaterialPagination}
    />
  );
}
