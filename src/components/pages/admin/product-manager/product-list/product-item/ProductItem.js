import { Box, Modal } from "@mui/material";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../../../../redux/slices/productsSlice";
import { useSelector } from "react-redux";
import { DARK_THEME } from "../../../../../../constants/Constants";
import { ThemeContext } from "../../../../../../themes/ThemeContext";

const ProductItem = (props) => {
    const { data, isLoading } = props;

    const dispatch = useDispatch();

    const handleDelete = () => {
        if(window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            dispatch(deleteProduct(data.id));
        }
    }

    const theme = useContext(ThemeContext);

    const colorTheme = theme.theme.colorTheme;

    return (
        <>
            <tr class={` border-b   
                ${colorTheme === DARK_THEME ? 'bg-gray-800 border-gray-700 hover:bg-gray-600 text-gray-100' : ' bg-gray-50 text-gray-700'}
            `}>
                {isLoading ? (
                    <>
                        <td className="w-4"></td>
                        <td className="p-4" colSpan={5}>
                            <div class="animate-pulse flex space-x-4">
                                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                                <div class="flex-1 space-y-6 py-1">
                                    <div class="h-2 bg-slate-200 rounded"></div>
                                    <div class="space-y-3">
                                        <div class="grid grid-cols-3 gap-4">
                                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div class="h-2 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </>
                ) : (
                    <>
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input
                                    id="checkbox-table-search-1"
                                    type="checkbox"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    for="checkbox-table-search-1"
                                    class="sr-only"
                                >
                                    checkbox
                                </label>
                            </div>
                        </td>
                        <th
                            scope="row"
                            class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            <img
                                class="w-20 h-20 rounded-lg border"
                                src={`${
                                    data?.image
                                        ? data?.image?.url
                                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                }`}
                                alt="Jese image"
                            />
                            <div class="pl-3">
                                {/* <div class="text-base font-semibold">{data.name}</div> */}
                                <Link
                                    to={`/admin/products/${data?.id}`}
                                    class="font-normal text-gray-500"
                                >
                                    {data.name}
                                </Link>
                            </div>
                        </th>
                        <td class="px-6 py-4">{data?.inventory?.available}</td>
                        <td class="px-6 py-4">{data?.sort_order}</td>
                        <td class="px-6 py-4">{data?.sort_order}</td>
                        <td class="px-6 py-4">
                            <button onClick={handleDelete}>
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </>
                )}
            </tr>
        </>
    );
};

export default ProductItem;
