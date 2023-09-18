import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProductVariants } from "../../../../../redux/slices/productsSlice";

const ProductGroupModal = ({ show, handleClose, productId, groups, setGroups }) => {
    const dispatch = useDispatch();
    const productVariants = useSelector(state => state.products.productVariants);
    const productVariantsLoading = useSelector(state => state.products.loading);
    const productVariantsLoadError = useSelector(state => state.products.error);

    const handleInputGroupNameChange = (groupIndex, groupName) => {
        let groupCopy = [...groups];
        groupCopy[groupIndex].name = groupName;
        setGroups(groupCopy);
    };

    const handleInputOptionNameEnter = (event, groupIndex, optionName) => {
        if (event.key === "Enter") {
            let groupCopy = [...groups];
            groupCopy[groupIndex].options = [
                ...groupCopy[groupIndex].options,
                { name: optionName },
            ];
            setGroups(groupCopy);
        }
    };

    const handleAddNewGroup = () => {
        setGroups([
            ...groups,
            {
                name: "",
                options: [],
            },
        ]);
    };

    const handleDeleteGroup = (groupIndex) => {
        let groupCopy = groups.filter((group, index) => index !== groupIndex);
        setGroups(groupCopy);
    };

    const handleDeleteOption = (groupIndex, optionIndex) => {
        let groupCopy = [...groups];
        groupCopy[groupIndex].options = groups[groupIndex].options.filter(
            (option, index) => index !== optionIndex
        );
        setGroups(groupCopy);
    };

    useEffect(() => {
        if(productId) {
            dispatch(fetchProductVariants(productId))
        }
    }, [productId])

    console.log('Variants: ', productVariants);

    return (
        <div
            className={clsx(
                "fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center z-50",
                { block: show },
                { hidden: !show }
            )}
        >
            <div className="w-9/12 max-h-[90%] overflow-auto rounded-xl shadow-lg bg-white p-7">
                <div className="flex">
                    <div className="flex-1">
                        <span className="text-3xl font-bold">Variants</span>
                    </div>
                    <div className="flex items-center">
                        <button className="text-lg" onClick={handleClose}>
                            <i className="fa-solid fa-xmark-large"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <div>
                        <div className="flex">
                            <div className="flex-1 items-center">
                                <span className="text-xl font-bold">Group</span>
                            </div>
                            <div className="flex items-center justify-end">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-full"
                                    onClick={handleAddNewGroup}
                                >
                                    <i className="fa-solid fa-plus mr-2"></i>
                                    Add
                                </button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="grid grid-cols-10 gap-2 font-bold py-2 px-4 bg-gray-200 rounded-t-lg border text-center">
                                <div className="col-span-3">Group Name</div>
                                <div className="col-span-6">Options Name</div>
                                <div className="col-span-1">Actions</div>
                            </div>
                            <div className="border rounded-b-lg py-2">
                                {groups &&
                                    groups.map((group, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-10 gap-2 "
                                        >
                                            <div className="col-span-3 px-4 py-2">
                                                <input
                                                    className="w-full px-4 py-2 rounded-md shadow-md border outline-none"
                                                    type="text"
                                                    placeholder="Enter group name"
                                                    value={group.name}
                                                    onChange={(event) =>
                                                        handleInputGroupNameChange(
                                                            index,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                                {/* <p className="text-red-500 mt-1.5">Name is not empty</p> */}
                                            </div>
                                            <div className="col-span-6 px-4 py-2">
                                                <div className="border rounded-md shadow-md px-4 py-2">
                                                    <div className="flex gap-2">
                                                        {group.options.map(
                                                            (
                                                                option,
                                                                optionIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        optionIndex
                                                                    }
                                                                    className="px-2 py-1 font-semibold border text-xs w-fit rounded-md flex items-center justify-center shadow-md"
                                                                >
                                                                    <label>
                                                                        {
                                                                            option.name
                                                                        }
                                                                    </label>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDeleteOption(
                                                                                index,
                                                                                optionIndex
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fa-solid fa-circle-xmark ml-2"></i>
                                                                    </button>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="mt-3">
                                                        <input
                                                            className="outline-none w-full"
                                                            type="text"
                                                            placeholder="Enter option name"
                                                            onKeyDown={(
                                                                event
                                                            ) =>
                                                                handleInputOptionNameEnter(
                                                                    event,
                                                                    index,
                                                                    event.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-1 flex items-center justify-center">
                                                <button
                                                    className="text-xl"
                                                    onClick={() =>
                                                        handleDeleteGroup(index)
                                                    }
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="mt-5">
                            <button className="px-4 py-2 bg-blue-500 rounded-full text-white font-semibold">
                                Save And Create Variants
                            </button>
                        </div>
                    </div>
                    <div className="mt-7">
                        <div>
                            <span className="text-xl font-bold">Variants</span>
                        </div>
                        <div className="mt-3">
                            <div className="grid grid-cols-12 gap-2 font-bold py-2 px-4 bg-gray-200 rounded-t-lg border text-center">
                                <div className="col-span-1">Image</div>
                                <div className="col-span-3">Option</div>
                                <div className="col-span-2">Quantity</div>
                                <div className="col-span-2">Price</div>
                                <div className="col-span-3">SKU</div>
                                <div className="col-span-1">Actions</div>
                            </div>
                            <div className="border rounded-b-lg py-2">
                                {productVariants && productVariants.map((variant, index) => (
                                    <div
                                        key={index} 
                                        className="grid grid-cols-12"
                                    >
                                        <div className="col-span-1">
                                            <img 
                                                src={variant?.assets ? variant?.assets[0]?.url : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"} 
                                                alt=""
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            {/* {variant?.options && variant?.options?.map((option, index) => (
                                                <div className="flex rounded-full">
                                                    <div className="px-4 py-2 bg-gray-200">{option.name}</div>
                                                </div>
                                            ))} */}
                                        </div>
                                        <div className="col-span-2">
                                            <input 
                                                className="px-4 py-2 border rounded-md"
                                                value={variant.inventory}    
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <input 
                                                className="px-4 py-2 border rounded-md"
                                                value={variant.price}    
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input 
                                                className="px-4 py-2 border rounded-md"
                                                value={variant.sku}    
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <i className="fa-regular fa-ellipsis"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGroupModal;
