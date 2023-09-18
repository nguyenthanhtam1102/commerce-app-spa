import { useContext, useEffect, useState } from "react";
import ProductItem from "./product-item/ProductItem";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../../../../themes/ThemeContext";
import { DARK_THEME } from "../../../../../constants/Constants";

const ProductList = (props) => {
  const { data, isLoading, loadingList } = props;
  // const [selectedList, setSelectedList] = useState(
  //   data.map(item => {return {id: item.id, checked: false}})
  // )

  // const handleChangeSelected = (id, checked) => {
  //   selectedList.filter()
  // }

  const theme = useContext(ThemeContext);

  const colorTheme = theme.theme.colorTheme;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table className={`w-full text-sm text-left ${colorTheme === DARK_THEME ? 'text-gray-100' : 'text-gray-500'}`}>
        <thead className={`text-xs ${colorTheme === DARK_THEME ? 'bg-gray-700 text-gray-100' : 'text-gray-700'}  uppercase `}>
          <tr>
            <th scope="col" class="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Remaining
            </th>
            <th scope="col" className="px-6 py-3">
              Orders
            </th>
            <th scope="col" className="px-6 py-3">
              Sales
            </th>
            <th scope="col" className="px-6 py-3">
              Options
            </th>
          </tr>
        </thead>
        <tbody className={`text-xs ${colorTheme === DARK_THEME ? 'bg-gray-700 text-gray-100' : 'text-gray-700'}`}>
          {isLoading
          ? loadingList
          : data && data.map((item) => <ProductItem key={item.id} data={item} isLoading={isLoading}/>)}
          
        </tbody>
      </table>

    </div>
  );
};

export default ProductList;
