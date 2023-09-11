import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../redux/slices/productsSlice";
import { fetchCategories } from "../../../../redux/slices/categoriesSlice";
import ProductCard from "../../../product-card/ProductCart";
import clsx from "clsx";
import Pagination from "../../../pagination/Pagination";

import './ProductFilters.scss';
import { useLocation } from "react-router-dom";

const sortOptions = [
    {
        value: 1,
        name: 'Tăng dần theo giá',
        sortBy: 'price',
        sortDirection: 'asc'
    },
    {
        value: 2,
        name: 'Giảm dần theo giá',
        sortBy: 'price',
        sortDirection: 'desc'
    },
    {
        value: 3,
        name: 'Tên từ A - Z',
        sortBy: 'name',
        sortDirection: 'asc'
    },
    {
        value: 4,
        name: 'Tên từ Z - A',
        sortBy: 'name',
        sortDirection: 'desc'
    }
]

const ProductFilters = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const searchKey = searchParams.get('key')

    const dispatch = useDispatch();
    const { products, pagination, loading, error } = useSelector(
        (state) => state.products
    );
    const { categories } = useSelector((state) => state.categories);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerRow, setItemsPerRow] = useState(12);

    const [sortOptionsPanelShow, setSortOptionsPanelShow] = useState(false);
    const [sortOptionSelected, setSortOptionSelected] = useState(-1);
    
    const [filterPanelShow, setFilterPanelShow] = useState(false);
    const [categoriesFilter, setCategoriesFilter] = useState([]);

    useEffect(() => {
        dispatch(
            fetchProducts({
                limit: itemsPerRow,
                page: currentPage,
                sortBy: (sortOptionSelected !== -1 ? sortOptions[sortOptionSelected].sortBy : undefined),
                sortDirection: (sortOptionSelected !== -1 ? sortOptions[sortOptionSelected].sortDirection : undefined),
                category_id: categoriesFilter,
                query: searchKey
            })
        );
    }, [sortOptionSelected, categoriesFilter, searchKey]);

    useEffect(() => {
        dispatch(
            fetchCategories({
                
            })
        );
    }, []);

    const loadingList = useMemo(() => {
        let result = []
        for(let i = 0; i < itemsPerRow; i++)
            result.push(<ProductCard key={i} isLoading={true}/>)
        return result
    }, [itemsPerRow])

    return (
        <>
            <div className="product-filters min-h-screen lg:flex">
                <div className={`product-filters-container container z-50 lg:block w-80 h-screen lg:h-auto overflow-y-auto py-5
                    fixed lg:static top-0 right-0 duration-300 shadow-lg
                    ${filterPanelShow ? '-translate-x-0' : 'translate-x-full lg:translate-x-0'}
                `}>
                    <div className="grid grid-cols-2 lg:grid-cols-1">
                        <span className="text-2xl font-bold">Filters</span>
                        <div className="text-right lg:hidden">
                            <button onClick={() => setFilterPanelShow(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="flex py-1">
                            <span className="w-full font-bold">Categories</span>
                            <div>
                                <i className="fa-solid fa-angle-up"></i>
                            </div>
                        </div>
                        <div className="h-0">
                            <ul>
                                {categories.map(category => (
                                    <li key={category.id}>
                                        <div 
                                            className="flex py-1 items-center"
                                            onClick={() => {
                                                let index = categoriesFilter.indexOf(category.id)

                                                if(index >= 0) {
                                                    categoriesFilter.splice(index, 1)
                                                    setCategoriesFilter([...categoriesFilter])
                                                }
                                                else
                                                    setCategoriesFilter([...categoriesFilter, category.id])
                                            }}    
                                        >
                                            {categoriesFilter.includes(category.id) 
                                                ? <i className="fa-solid fa-check"></i>
                                                : <i className="fa-regular fa-square"></i>
                                            }
                                            <label className="w-full flex ml-2">
                                                <span className="flex-1">
                                                    {category.name}
                                                </span>
                                                <span>
                                                    {category.products}
                                                </span>
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="lg:flex-1 container">
                    <div className="py-5 flex">
                        <div>
                            <button className="btn-view-list px-3 py-2 rounded-md mr-2">
                                <i className="fa-solid fa-list-ul"></i>
                            </button>
                            <button className="btn-view-grid px-3 py-2 rounded-md mr-2">
                                <i className="fa-regular fa-grid-2"></i>
                            </button>
                        </div>
                        <div className="flex-1">
                            <button 
                                className="btn-filter lg:hidden rounded-md py-2 px-3 ml-2 float-right"
                                onClick={() => setFilterPanelShow(true)}
                            >
                                <i className="fa-solid fa-filter"></i>
                            </button>

                            <div
                                className="sort-options flex relative min-w-[10rem] h-full text-sm font-semibold w-fit rounded-lg border px-4 py-2 items-center text-left float-right"
                                onClick={() => setSortOptionsPanelShow(!sortOptionsPanelShow)}
                            >
                                <label className="w-full">
                                    {sortOptionSelected === -1 && "Select option"}
                                    {sortOptionSelected !== -1 && sortOptions[sortOptionSelected].name}
                                </label>
                                <i className={clsx("fa-solid fa-angle-up ml-3 duration-200",
                                    {'rotate-180': sortOptionsPanelShow}
                                )}></i>
                                
                                <div
                                    className={clsx(
                                        'sort-options-panel',
                                        `absolute text-left min-w-[12rem] top-11 right-0 rounded-lg border py-3 z-50 cursor-pointer`,
                                        'duration-500',
                                        `${sortOptionsPanelShow ? '' : 'opacity-0 translate-y-4'}`
                                    )}
                                >
                                    <ul>
                                        {sortOptions.map((option, index) => (
                                            <li 
                                                key={index}
                                                className={clsx("sort-option-item",
                                                    {'selected': index === sortOptionSelected}
                                                )}
                                                onClick={() => setSortOptionSelected(index)}    
                                            >
                                                <div className="px-4 py-2">
                                                    {option.name}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                        {loading 
                            ? loadingList
                            : (products && products.length > 0 
                                ?
                                    products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            isLoading={loading}
                                        />
                                    ))
                                :
                                    (<div className="col-span-full py-14">
                                        <div className="text-2xl font-semibold text-center">
                                            <i className="fa-light fa-box text-6xl mb-3"></i>
                                            <p>Không tìm thấy sản phẩm phù hợp</p>
                                        </div>
                                    </div>) 
                        )}
                    </div>
                    <div className="py-5 grid grid-cols-1">
                        <div>

                        </div>
                        <div>

                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductFilters;