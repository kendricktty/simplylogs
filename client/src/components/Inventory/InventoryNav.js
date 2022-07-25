import React from 'react'

export default function InventoryNav(props) {
    return (
        <div className="InventoryNav">
            <div className="InventoryNav--catergory">
                <a href="#" className="InventoryNav--catergoryBtn" onClick={() => props.setCategory("")}>
                    <i class='bx bxs-shapes' ></i>
                    All Items
                </a>
            </div>
            <div className="InventoryNav--catergory">
                <a href="#" className="InventoryNav--catergoryBtn" onClick={() => props.setCategory("Food")}>
                    <i class='bx bxs-bowl-rice' ></i>
                    Food
                </a>
            </div>
            <div className="InventoryNav--catergory">
                <a href="#" className="InventoryNav--catergoryBtn" onClick={() => props.setCategory("KitchenWare")}>
                    <i class='bx bx-fridge' ></i>
                    KitchenWare
                </a>
            </div>
            <div className="InventoryNav--catergory">
                <a href="#" className="InventoryNav--catergoryBtn" onClick={() => props.setCategory("Furnishings")}>
                    <i class='bx bx-bed' ></i>
                    Furnishings
                </a>
            </div>
        </div>
    )
}