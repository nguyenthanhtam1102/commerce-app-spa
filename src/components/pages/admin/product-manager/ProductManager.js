import "./ProductManager.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../../../redux/slices/productsSlice";
import ProductList from "./product-list/ProductList";
import ReactPaginate from "react-paginate";
import ProductItem from "./product-list/product-item/ProductItem";
import { useNavigate } from "react-router-dom";
import SelectGroup from '../../../select-group/SelectGroup';
import { fetchCategories } from "../../../../redux/slices/categoriesSlice";
import { toast } from "react-toastify";

const ProductManager = () => {
    const navigate = useNavigate();

    const productList = useSelector((state) => state.products.products);
    const isLoading = useSelector((state) => state.products.loading);
    const isError = useSelector((state) => state.products.error);
    const pagination = useSelector((state) => state.products.pagination);
    const { categories } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [limitShow, setLimitShow] = useState(5);
    const [searchText, setSearchText] = useState('');

    const fetchData = () => {
        dispatch(fetchProducts({ 
            limit: limitShow, 
            page: currentPage,
            query: searchText !== '' ? searchText : undefined
        }))
    };

    useEffect(() => {
        fetchData()

        dispatch(
            fetchCategories({
                
            })
        );
    }, [currentPage, limitShow]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    };

    const handleChangeLimitShow = (newLimitShow) => {
        setLimitShow(newLimitShow);
    };

    const loadingList = useMemo(() => {
        let result = [];
        for(let i = 0 ; i < limitShow; i++)
            result.push(<ProductItem isLoading/>)
        return result
    })

    const handleSearchBoxKeyPress = (event) => {
        if(event.key === 'Enter') {
            fetchData();
        }
    }

    const deleteStatus = useSelector(state => state.products.deleteStatus);

    useEffect(() => {
      if(deleteStatus === 204) {
        toast.info('Xóa thành công')
        fetchData()
      }
    }, [deleteStatus])

    return (
        <div className="product-manager py-5">
            <div>
                <h2 className="text-3xl font-semibold py-5">Products</h2>
            </div>
            <div>
                <div className="flex rounded-lg p-4 shadow-sm">
                    <div className="flex-1 flex">
                        <div className="search-box w-96 flex rounded-lg border border-slate-300 text-black search-box items-center px-4 py-2">
                            <input
                                className="search-input text-sm w-full"
                                type="search"
                                placeholder="Search products"
                                aria-label="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={handleSearchBoxKeyPress}
                            />
                        </div>

                        {/* <SelectGroup
                            className={`text-gray-600 text-sm`} 
                            options={categories.map(category => category.name)}
                        /> */}
                    </div>
                    <div className="justify-items-end">
                        <button
                            className="inline-flex px-4 py-2 items-center text-sm text-white bg-blue-500 rounded-lg"
                            onClick={() => navigate('/admin/products/add')}
                        >
                            <svg
                                className="w-3 h-3 mr-2"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="plus"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                data-fa-i2svg=""
                            >
                                <path
                                    fill="currentColor"
                                    d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                                ></path>
                            </svg>
                            Add product
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <ProductList data={productList} isLoading={isLoading} loadingList={loadingList}/>

                <div className="grid grid-cols-3 p-5 rounded-lg mt-5 shadow-md">
                    <div className="text-sm flex items-center">
                        <label className="mb-0 mr-3">Row per page</label>
                        <select
                            className="border-none"
                            onChange={(e) =>
                                handleChangeLimitShow(e.target.value)
                            }
                        >
                            <option value="5" selected={limitShow === 5}>
                                5
                            </option>
                            <option value="10" selected={limitShow === 10}>
                                10
                            </option>
                            <option value="20" selected={limitShow === 20}>
                                20
                            </option>
                            <option value="30" selected={limitShow === 30}>
                                30
                            </option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        {/* <span className='text-sm'>{`${1 + (pagination?.current_page - 1) * pagination?.per_page} to ${(pagination.current_page - 1) * pagination.per_page + pagination.count} items of ${pagination.total}`}</span> */}
                    </div>
                    <div className="text-right">
                        <ReactPaginate
                            className="pagination"
                            breakLabel="..."
                            nextLabel={<i class="fa-solid fa-angle-right"></i>}
                            pageRangeDisplayed={5}
                            pageCount={pagination?.total_pages}
                            previousLabel={<i class="fa-solid fa-angle-left"></i>}
                            renderOnZeroPageCount={null}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManager;
