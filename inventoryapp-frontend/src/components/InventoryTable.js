import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import CustomMaterialPagination from "../materialui/CustomMaterialPagination";
import data from "../data/data.json";
import Barcode from "react-barcode";
import InventoryUtilityBar from "./InventoryUtilityBar";

/*
https://react-data-table-component.netlify.app/?path=/docs/api-columns--page -- link to 
  table  api
*/
// A super simple expandable component.
// const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

// !! moved in data.json !! //

export default function InventoryTable() {
  const [dynamicData, setDynamicData] = React.useState(data);

  // filter function
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = dynamicData.inventory.filter(
    (item) =>
      item.productName &&
      item.productName.toLowerCase().includes(filterText.toLowerCase())
  );

  //adds new item to the current data
  function handleAddData(data) {
    setDynamicData((prevState) => {
      console.log(prevState);
      const newState = prevState;
      newState.inventory.push(data);
      return newState;
    });
  }

  //InventoryUtility
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
        addData={(data) => handleAddData(data)}
      />
    );
  }, [filterText, resetPaginationToggle]);

  //testing editing of data only can edit name for now//
  const handleEditButtonClick = (data) => {
    let newName = prompt("Enter new name: ");
    if (newName === null) {
      newName = data.productName;
    }
    const id = data.productId;
    setDynamicData((prevState) => ({
      inventory: prevState.inventory.map((el) =>
        el.productId === id ? { ...el, productName: newName } : el
      ),
    }));
  };

  const handleGenerateButtonClick = (data) => {
    const productName = data.productName;
    ReactDOM.render(
      <Barcode value={productName} />,
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
      // actions={
      //     (<InventoryUtilityBar />)
      // }
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      //adding pagination to the table

      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      paginationComponent={CustomMaterialPagination}
    />
  );
}
