import React from 'react'

export default function InventoryUtilityBar() {
    return (
        <div className="InventoryUtilityBar">
            <div class="row select-view">
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
            </div>
            <form className="searchBar" action="" method="get">
                <div class="input-group">
                    <input type="text" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <input type="submit" value="submit" class="btn btn-outline-primary" />
                </div>
            </form>
        </div>
    )
}