import { useState } from "react";

const InventoryStack = ({defaultPrice, defaultQuantity, handlePriceChange, handleQuantityChange}) => {
    const [price, setPrice] = useState(defaultPrice);
    const [priceIsError, setPriceIsError] = useState(false);
    const [stackSelected, setStackSelected] = useState(0);
    const [quantity, setQuantity] = useState(defaultQuantity);
    const [quantityIsError, setQuantityIsError] = useState(false);

    const handleInputPriceChange = (event) => {
        let price = event.target.value;

        if(!checkPrice(price)) {
            price = 0;
        }
        
        setPrice(price);
        
        if(handlePriceChange)
            handlePriceChange(price);
    }

    const checkPrice = (p) => {
        if (price === "") {
            setPriceIsError(true);
            return false;
        }

        setPriceIsError(p < 0);
        return !(p < 0);
    };

    const handleInputQuantityChange = (event) => {
        let quantity = event.target.value;

        if(!checkQuantity(quantity)) {
            quantity = 0;
        }

        setQuantity(quantity);

        if(handleQuantityChange)
            handleQuantityChange(quantity);
    }

    const checkQuantity = (q) => {
        if(quantity === '') {
            setQuantityIsError(true);
            return false;
        }

        setPriceIsError(q < 0);
        return !(q < 0);
    }

    return (
        <div>
            <h4 className="mb-3 text-xl font-semibold">Inventory</h4>
            <div className="grid grid-cols-12">
                <div className="col-span-4 border-y">
                    <ul>
                        <li>
                            <div 
                                className="flex items-center p-3 border-y text-xs"
                                onClick={() => setStackSelected(0)}    
                            >
                                <i className="fa-duotone fa-dollar-sign font-semibold mr-2"></i>
                                Pricing
                            </div>
                        </li>
                        <li>
                            <div 
                                className="flex items-center p-3 border-y text-xs"
                                onClick={() => setStackSelected(1)}    
                            >
                                <i className="fa-regular fa-cube mr-2"></i>
                                Restock
                            </div>
                        </li>
                        <li>
                            <div 
                                className="flex items-center p-3 border-y text-xs"
                                onClick={() => setStackSelected(2)}
                            >
                                <i className="fa-regular fa-truck mr-2"></i>
                                Shipping
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-span-8 border-y border-l py-3 px-7">
                    <div className={`${stackSelected === 0 ? 'block' : 'hidden'}`}>
                        <h5 className="text-md font-semibold mb-1">Pricing</h5>
                        <input
                            className="w-full text-xs rounded-md border px-4 py-2.5"
                            type="number"
                            placeholder="Enter price..."
                            value={price}
                            onChange={handleInputPriceChange}
                            onBlur={(e) => checkPrice(price)}
                        />
                        {priceIsError && (
                            <small className="text-red-600">
                                Product price must be greater than 0
                            </small>
                        )}
                    </div>
                    <div className={`${stackSelected === 1 ? 'block' : 'hidden'}`}>
                        <h5 className="text-md font-semibold mb-1">
                            Quantity
                        </h5>
                        <input
                            className="w-full text-xs rounded-md border px-4 py-2.5"
                            type="number"
                            placeholder="Enter price..."
                            value={quantity}
                            onChange={handleInputQuantityChange}
                            onBlur={(e) => checkQuantity(quantity)}
                        />
                        {priceIsError && (
                            <small className="text-red-600">
                                Quantity must be greater than 0
                            </small>
                        )}
                    </div>
                    <div className={`${stackSelected === 2 ? 'block' : 'hidden'}`}>
                        <h5 className="text-md font-semibold mb-1">Shipping</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryStack;
