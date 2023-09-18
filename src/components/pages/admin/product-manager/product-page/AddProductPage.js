import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { createProduct, fetchProduct, setAssetsForProduct } from "../../../../../redux/slices/productsSlice";
import CustomCheckbox from "../../../../checkbox/custom-checkbox/CustomCheckbox";
import { fetchCategories } from "../../../../../redux/slices/categoriesSlice";
import { convertFileToBase64 } from "../../../../../Utils/FileUtils";
import { createNewAsset } from "../../../../../redux/slices/assetsSlice";
import ProductGroupModal from "./ProductGroupModal";
import { toast } from "react-toastify";


const AddProductPage = () => {
    const navigate = useNavigate();
    const { product, createStatus, loading, error } = useSelector((state) => state.products);
    const allCategories = useSelector((state) => state.categories.categories);
    const allCategoriesLoading = useSelector(
        (state) => state.categories.loading
    );
    const allCategoriesLoadingError = useSelector(
        (state) => state.categories.error
    );
    const assetAdded = useSelector((state) => state.assets.asset);
    const assetAdding = useSelector((state) => state.assets.loading);
    const assetAddError = useSelector((state) => state.assets.error);

    const inputFile = useRef();

    const dispatch = useDispatch();

    const [inventoryStackSelected, setInventoryStackSelected] = useState(0);
    const [categoriesSelectBoxOpen, setCategoriesSelectBoxOpen] = useState(false);
    const [editGroupModalShow, setEditGroupModalShow] = useState(false);

    const [name, setName] = useState("");
    const [isNameError, setIsNameError] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [isPriceError, setIsPriceError] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [isQuantityError, setIsQuantityError] = useState(false);
    const [assets, setAssets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [groups, setGroups] = useState([]);

    const checkProductName = (productName) => {
        let isError = productName !== "";
        setIsNameError(!isError);
        return isError;
    };

    const handleInputNameChange = (event) => {
        let name = event.target.value;
        checkProductName(name);
        setName(name);
    };

    const handleInputDescriptionChange = (productDescription) => {
        setDescription(productDescription);
    };

    const checkProductPrice = (productPrice) => {
        let isError = productPrice >= 0;
        setIsPriceError(!isError);
        return isError;
    };

    const handleInputPriceChange = (event) => {
        let price = event.target.value;
        if (!checkProductPrice(price)) price = 0;
        setPrice(price);
    };

    const checkProductQuantity = (productQuantity) => {
        let isError = productQuantity >= 0;
        setIsQuantityError(!isError);
        return isError;
    };

    const handleInputQuantityChange = (event) => {
        let quantity = event.target.value;
        if (!checkProductQuantity(quantity)) quantity = 0;
        setQuantity(quantity);
    };

    const handleCategoriesChange = (category, checked) => {
        if (checked) {
            setCategories([...categories, category]);
        } else {
            setCategories(categories.filter((item) => item.id !== category.id));
        }
    };

    const categoriesSelectedText = useMemo(() => {
        if (categories.length === 0) return "Choose Category";

        return categories.reduce((result, current, index) => {
            return result + (index === 0 ? "" : ", ") + current.name;
        }, "");
    }, [categories]);

    const handleToggleCategoriesSelectBoxOpen = () => {
        setCategoriesSelectBoxOpen(!categoriesSelectBoxOpen);
    };

    const handleInputAssetChange = async (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            let base64 = await convertFileToBase64(file);
            base64 = base64.replace(
                /^data:image\/(png|jpg|jpeg|gif|webp);base64,/,
                ""
            );

            dispatch(
                createNewAsset({
                    filename: file.name,
                    contents: base64,
                })
            );
        }

        inputFile.current.value = '';
    };

    const handleDeleteAssets = (asset) => {
        setAssets(assets.filter((item) => item.id !== asset.id));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
    
        const reorderedItems = [...assets];
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);
    
        setAssets(reorderedItems);
    };

    const handleToggleEditGroupModalShow = () => {
        setEditGroupModalShow(!editGroupModalShow);
    }

    const handleEditGroupModalClose = () => {
        setEditGroupModalShow(false);
    }

    const handleSaveProduct = () => {
        console.log('dispatch react product', categories)
        dispatch(createProduct({
            name: name, 
            price: price, 
            description: description, 
            inventory: quantity, 
            categories: [{category_id: "cat_0YnEoqg61le7P6"}], 
            active: true
        }))
    }

    useEffect(() => {
        dispatch(fetchCategories({}));
    }, []);

    useEffect(() => {
        if (createStatus === 201) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price.raw);
            setQuantity(product.inventory.available);
            setAssets(product.assets);
            setCategories(product.categories);

            toast.info('Save product thành công')

            console.log('assets', assets.map((asset, index) => {
                return {
                    id: asset.id
                }
            }))

            dispatch(setAssetsForProduct({
                productId: product.id,
                assets:  assets.map((asset, index) => {
                    return {
                        id: asset.id
                    }
                })
            }))

            navigate(`/admin/products/${product.id}`)

            if(product.variant_groups) {
                setGroups(product.variant_groups.map(group => {
                    return {
                        id: group.id,
                        name: group.name,
                        options: group.options
                    }
                }));
            }
        }
    }, [createStatus]);

    useEffect(() => {
        if (assetAdded) {
            setAssets([...assets, assetAdded]);
        }
    }, [assetAdded]);

    return (
        <div className="product-page py-10 text-sm">
            <div>
                <Link to={"/admin/products"} className="font-semibold">
                    <i className="fa-regular fa-arrow-left mr-2"></i>
                    Product Manager
                </Link>
            </div>
            <div className="grid grid-cols-10 mt-5">
                <div className="col-span-7">
                    <span className="font-bold text-3xl">Product</span>
                </div>
                <div className="col-span-3 text-right">
                    <button className="px-4 py-2 border rounded-md bg-transparent ml-2">
                        Cancel
                    </button>
                    <button 
                        className="px-4 py-2 rounded-md bg-blue-500 text-white ml-2"
                        onClick={handleSaveProduct}    
                    >
                        Save Product
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-10 mt-5 gap-7">
                <div className="col-span-7">
                    {/* Input Product Name */}
                    <div>
                        <div>
                            <label
                                className="text-xl font-bold"
                                htmlFor="txt-product-name"
                            >
                                Product Name
                            </label>
                        </div>
                        <div className="mt-3">
                            <input
                                id="txt-product-name"
                                className="w-full px-4 py-2 rounded-md border outline-none"
                                placeholder="Enter product name"
                                value={name}
                                onBlur={() => checkProductName(name)}
                                onChange={handleInputNameChange}
                            />
                        </div>
                        <div className="mt-1.5">
                            {isNameError && (
                                <p className="text-red-500">
                                    Product name is not empty
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Input Product Description */}
                    <div className="mt-7">
                        <div>
                            <label className="text-xl font-bold">
                                Description
                            </label>
                        </div>
                        <div className="mt-3">
                            <ReactQuill
                                className="min-h-40 bg-white"
                                modules={{
                                    toolbar: [
                                        [
                                            { header: "1" },
                                            { header: "2" },
                                            { font: [] },
                                        ],
                                        [
                                            "bold",
                                            "italic",
                                            "underline",
                                            "strike",
                                        ],
                                        [{ align: [] }],
                                        [
                                            { list: "ordered" },
                                            { list: "bullet" },
                                        ],
                                        ["link", "image", "video"],
                                        ["undo", "redo"],
                                    ],
                                }}
                                value={description}
                                onChange={handleInputDescriptionChange}
                            />
                        </div>
                    </div>

                    {/* Input Product Image */}
                    <div className="mt-7">
                        <div className="flex">
                            <div className="flex-1">
                                <label className="text-xl font-bold">
                                    Display Images
                                </label>
                            </div>
                            <div>
                                <label
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold"
                                    htmlFor="input-assets"
                                >
                                    Choose Image
                                </label>
                                <input
                                    ref={inputFile}
                                    id="input-assets"
                                    type="file"
                                    hidden
                                    onChange={handleInputAssetChange}
                                />
                            </div>
                        </div>
                        {assets && assets.length > 0 ? (
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="ROOT" type="group" direction="both">
                                    {(provided) => (
                                        <div
                                            className="grid grid-cols-6 gap-4 mt-3 border rounded-lg p-4"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {assets.map((asset, index) => (
                                                <Draggable
                                                    draggableId={asset.id}
                                                    index={index}
                                                    key={asset.id}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            className={clsx('rounded-md border relative group bg-white',
                                                                {'col-span-2 row-span-2': index === 0}
                                                            )}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            <img src={asset.url} alt={asset.id} />
                                                            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500 bg-opacity-30 text-white rounded-md group-hover:opacity-100 opacity-0 duration-300 ease-in-out cursor-pointer">
                                                                <button
                                                                    className="absolute top-2 right-3"
                                                                    onClick={() =>
                                                                        handleDeleteAssets(asset)
                                                                    }
                                                                >
                                                                    <i className="fa-solid fa-xmark"></i>
                                                                </button>
                                                                <i className="fa-regular fa-arrows-up-down-left-right text-xl"></i>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        
                                            <div
                                                className={clsx(
                                                    "relative rounded-md border",
                                                    { block: assetAdding },
                                                    { hidden: !assetAdding }
                                                )}
                                            >
                                                <img
                                                    className="w-full h-eqw invisible"
                                                    src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                                                />
                                                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                                    <i className="animate-spin text-3xl fa-duotone fa-spinner-third"></i>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        ) : (
                            <div className="flex justify-center items-center border rounded-lg mt-3 h-52">
                                <span className="text-2xl font-bold">No Image Available</span>
                            </div>
                        )}
                        {/* <div className="grid grid-cols-6 gap-4 mt-3">
                            {assets &&
                                assets.map((asset, index) => (
                                    <div
                                        key={asset.id}
                                        className={clsx(
                                            "rounded-md border relative group",
                                            {
                                                "col-span-2 row-span-2":
                                                    index === 0,
                                            }
                                        )}
                                    >
                                        <img src={asset.url} alt={asset.id} />
                                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-slate-500 bg-opacity-30 text-white rounded-md group-hover:opacity-100 opacity-0 duration-300 ease-in-out cursor-pointer">
                                            <button
                                                className="absolute top-2 right-3"
                                                onClick={() =>
                                                    handleDeleteAssets(asset)
                                                }
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                            <i className="fa-regular fa-arrows-up-down-left-right text-xl"></i>
                                        </div>
                                    </div>
                                ))}

                            <div
                                className={clsx(
                                    "relative rounded-md border",
                                    { block: assetAdding },
                                    { hidden: !assetAdding }
                                )}
                            >
                                <img
                                    className="w-full h-eqw invisible"
                                    src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                                />
                                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                    <i className="animate-spin text-3xl fa-duotone fa-spinner-third"></i>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* Input Inventory */}
                    <div className="mt-7">
                        <div>
                            <label className="text-xl font-bold">
                                Inventory
                            </label>
                        </div>
                        <div className="mt-3 w-full h-52 grid grid-cols-10 border-t border-b font-semibold bg-white text-gray-500">
                            <div className="col-span-3 border-r">
                                <div
                                    className={clsx(
                                        "px-4 py-3 select-none border-b",
                                        {
                                            "text-gray-800":
                                                inventoryStackSelected === 0,
                                        }
                                    )}
                                    onClick={() => setInventoryStackSelected(0)}
                                >
                                    <i className="fa-regular fa-tag mr-2"></i>
                                    Price
                                </div>
                                <div
                                    className={clsx(
                                        "px-4 py-3 select-none border-b",
                                        {
                                            "text-gray-800":
                                                inventoryStackSelected === 1,
                                        }
                                    )}
                                    onClick={() => setInventoryStackSelected(1)}
                                >
                                    <i className="fa-regular fa-cube mr-2"></i>
                                    Stock
                                </div>
                            </div>
                            <div className="col-span-7 relative">
                                <div className="rotate-45 w-4 h-4 absolute top-4 -left-2 border-b border-l bg-white"></div>

                                <div
                                    className={clsx(
                                        "absolute w-full h-full p-7 duration-300 ease-in-out",
                                        {
                                            "opacity-0 -z-0":
                                                inventoryStackSelected !== 0,
                                        },
                                        { "z-40": inventoryStackSelected === 0 }
                                    )}
                                >
                                    <div>
                                        <label
                                            className="text-lg font-bold"
                                            htmlFor="txt-product-price"
                                        >
                                            Price
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="txt-product-price"
                                            className="w-full px-4 py-2 rounded-md border outline-none"
                                            type="number"
                                            placeholder="Enter product price"
                                            value={price}
                                            onChange={handleInputPriceChange}
                                        />
                                    </div>
                                    <div className="mt-1.5">
                                        {isPriceError && (
                                            <p className="text-red-500">
                                                Product name is not empty
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className={clsx(
                                        "absolute w-full h-full p-7 duration-500 ease-in-out",
                                        {
                                            "opacity-0 -z-0":
                                                inventoryStackSelected !== 1,
                                        },
                                        { "z-40": inventoryStackSelected === 1 }
                                    )}
                                >
                                    <div>
                                        <label
                                            className="text-lg font-bold"
                                            htmlFor="txt-product-quantity"
                                        >
                                            Quantity
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="txt-product-quantity"
                                            className="w-full px-4 py-2 rounded-md border outline-none"
                                            type="number"
                                            placeholder="Enter product quantity"
                                            value={quantity}
                                            onChange={handleInputQuantityChange}
                                        />
                                    </div>
                                    <div className="mt-1.5">
                                        {isQuantityError && (
                                            <p className="text-red-500">
                                                Product name is not empty
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 h-full">
                    <div className="bg-white w-full p-4 rounded-lg">
                        <div>
                            <span className="text-xl font-bold">Other</span>
                        </div>
                        <div className="mt-3">
                            <div className="flex">
                                <div className="flex-1">
                                    <label className="text-lg font-bold">
                                        Categories
                                    </label>
                                </div>
                                <div className="flex">
                                    <button className="text-blue-500">Add New Category</button>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="relative">
                                    {allCategoriesLoading ? (
                                        <div className="text-center text-2xl">
                                            <i className="animate-spin fa-duotone fa-spinner-third"></i>
                                        </div>
                                    ) : (
                                        <>
                                            <div
                                                className="px-4 py-2 border rounded-md font-semibold select-none"
                                                onClick={
                                                    handleToggleCategoriesSelectBoxOpen
                                                }
                                            >
                                                {categoriesSelectedText}
                                            </div>
                                            <div
                                                className={clsx(
                                                    "absolute mt-1 py-2 bg-white rounded-md border shadow-sm w-full",
                                                    {
                                                        block: categoriesSelectBoxOpen,
                                                    },
                                                    {
                                                        hidden: !categoriesSelectBoxOpen,
                                                    }
                                                )}
                                            >
                                                {allCategories &&
                                                    allCategories.map(
                                                        (category) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    className="hover:bg-gray-100 py-2 px-4"
                                                                >
                                                                    <CustomCheckbox
                                                                        label={
                                                                            category.name
                                                                        }
                                                                        checkedIcon={
                                                                            <i className="fa-solid fa-check mr-2"></i>
                                                                        }
                                                                        notCheckedIcon={
                                                                            <i className="fa-regular fa-square mr-2"></i>
                                                                        }
                                                                        defaultChecked={categories.find(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.id ===
                                                                                category.id
                                                                        )}
                                                                        handleCheckedChange={(
                                                                            checked
                                                                        ) => {
                                                                            handleCategoriesChange(
                                                                                category,
                                                                                checked
                                                                            );
                                                                        }}
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white w-full p-4 rounded-lg mt-7">
                        <div className="flex">
                            <div className="flex-1">
                                <span className="text-xl font-bold">Group</span>
                            </div>
                            <div className="flex items-center">
                                <button 
                                    className="text-blue-500"
                                    onClick={handleToggleEditGroupModalShow}
                                >Edit Group</button>
                            </div>
                        </div>
                        {groups && groups.map((group, groupIndex) => (
                            <div
                                key={groupIndex} 
                                className="mt-3"
                            >
                                <div>
                                    <label className="text-lg font-bold">{group.name}</label>
                                </div>
                                <div className="mt-1.5 text-sm">
                                    {group.options.map((option, optionIndex) => (
                                        <button 
                                            key={optionIndex}
                                            className="px-4 py-1 mr-1 mt-1.5 rounded-full bg-gray-200 hover:bg-gray-100"
                                        >
                                            {option.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={clsx("fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center z-50",
                {'block' : loading},
                {'hidden' : !loading}
            )}>
                <div className="text-5xl text-white">
                    <i className="animate-spin fa-duotone fa-spinner-third"></i>
                </div>
            </div>

            {/* <ProductGroupModal 
                show 
                handleClose={handleEditGroupModalClose} 
                productId={id}
                groups={groups}
                setGroups={setGroups}
            /> */}
        </div>
    );
};

export default AddProductPage;
