import React from 'react'

export default function InventoryUtilityBar(props) {
    // const handleSubmit = event => {
    //     event.preventDefault();
    //     alert('You have submitted the form.')
    //     setSearch('')
    // }

    // const [search, setSearch] = React.useState('')



    return (
        <div className="InventoryUtilityBar row">
            {/* <div class="row select-view col-lg-4 col-sm-12">
                <div class="col-lg-12 my-3">
                    <div class="pull-right">
                        <div class="btn-group">
                            <button class="btn btn-outline-primary" id="list">
                                List View
                            </button>
                            <button class="btn btn-outline-secondary" id="grid">
                                Grid View
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
            <form className="searchBar col-lg-4 col-sm-12 my-3" action="" method="GET" >
                <div class="input-group">
                    <input 
                    type="text" class="form-control rounded" id="search"
			
			placeholder="Filter By Name"
			aria-label="Search Input"
			value={props.filterText}
			onChange={props.onFilter}/>
                    <button type="button" onClick={props.onClear} class="btn btn-outline-primary" >Clear</button>
                </div>
            </form>
            <div className="col-lg-4"></div>
            <button class="btn btn-outline-primary col-lg-2 col-sm-6 utilityBtn my-3">Export</button>
            <button class="btn btn-outline-primary col-lg-2 col-sm-6 utilityBtn my-3">Add +</button>
        </div>
    )
}