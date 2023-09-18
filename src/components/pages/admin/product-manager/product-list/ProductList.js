import { useEffect, useState } from "react";
import ProductItem from "./product-item/ProductItem";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProductList = (props) => {
  const { data, isLoading, loadingList } = props;
  // const [selectedList, setSelectedList] = useState(
  //   data.map(item => {return {id: item.id, checked: false}})
  // )

  // const handleChangeSelected = (id, checked) => {
  //   selectedList.filter()
  // }

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" class="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              Product
            </th>
            <th scope="col" class="px-6 py-3">
              Remaining
            </th>
            <th scope="col" class="px-6 py-3">
              Orders
            </th>
            <th scope="col" class="px-6 py-3">
              Sales
            </th>
            <th scope="col" class="px-6 py-3">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
          ? loadingList
          : data && data.map((item) => <ProductItem key={item.id} data={item} isLoading={isLoading}/>)}
          
        </tbody>
      </table>

    </div>
  );
};

export default ProductList;
