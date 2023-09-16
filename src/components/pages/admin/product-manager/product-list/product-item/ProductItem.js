const ProductItem = (props) => {
    const { data, isLoading } = props;
  
    return (
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
                <label for="checkbox-table-search-1" class="sr-only">
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
                <div class="font-normal text-gray-500">{data.name}</div>
              </div>
            </th>
            <td class="px-6 py-4">{data?.inventory?.available}</td>
            <td class="px-6 py-4">{data?.sort_order}</td>
            <td class="px-6 py-4">{data?.sort_order}</td>
            <td class="px-6 py-4">
              <a
                href="#"
                type="button"
                data-modal-target="editUserModal"
                data-modal-show="editUserModal"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                  <circle cx="3" cy="10" r="2" fill="currentColor" />
                  <circle cx="17" cy="10" r="2" fill="currentColor" />
                </svg>
              </a>
            </td>
          </>
        )}
      </tr>
    );
  };
  
  export default ProductItem;
  