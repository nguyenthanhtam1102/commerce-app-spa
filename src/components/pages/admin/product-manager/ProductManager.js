import './ProductManager.scss';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from '../../../../redux/slices/productsSlice';
import ProductList from './product-list/ProductList';



const ProductManager = () => {
  const productList = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const isError = useSelector((state) => state.products.isError);
  const pagination = useSelector((state) => state.products.pagination);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [limitShow, setLimitShow] = useState(5);

  useEffect(() => {
    dispatch(fetchProducts({limit: limitShow, page: currentPage}));
  }, [currentPage, limitShow]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1)
  }

  const handleChangeLimitShow = (newLimitShow) => {
    setLimitShow(newLimitShow);
  }

//   const loadingList = useMemo(() => {
//     let result = [];
//     for(let i = 0 ; i < limitShow; i++)
//         result.push()
//     return [

//     ]
//   })

  return (
    <div className='product-manager'>
      <div>
        <h2 className="text-3xl font-semibold">Products</h2>
      </div>
      <div>
        <ul className="nav nav-links mb-3 mb-lg-2 mx-n3 flex gap-7">
          <li className="text-sm">
            <a className="nav-link active" aria-current="page" href="#">
              All <span className="text-700 fw-semi-bold">(68817)</span>
            </a>
          </li>
          <li className="text-sm">
            <a className="nav-link" href="#">
              Published <span className="text-700 fw-semi-bold">(70348)</span>
            </a>
          </li>
          <li className="text-sm">
            <a className="nav-link" href="#">
              Drafts <span className="text-700 fw-semi-bold">(17)</span>
            </a>
          </li>
          <li className="text-sm">
            <a className="nav-link" href="#">
              On discount <span className="text-700 fw-semi-bold">(810)</span>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="grid grid-flow-col auto-cols-max">
          <div className="col-auto">
            <div className="search-box">
              <form
                className="flex rounded-lg border border-slate-300 text-black search-box items-center px-4 py-2"
                data-bs-toggle="search"
                data-bs-display="static"
              >
                <input
                  className="search-input text-sm"
                  type="search"
                  placeholder="Search products"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div className="col-auto">
            <div className="inline-flex rounded-md" role="group">
              <div className="btn-group position-static text-nowrap">
                <button
                  className="px-4 py-2 text-sm border border-gray-200 rounded-l-lg inline-flex items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-boundary="window"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-bs-reference="parent"
                >
                  {" "}
                  Category
                  <svg
                    className="w-3 h-3 ml-2"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    ></path>
                  </svg>
                </button>

                <ul className="hidden dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
              <div className="btn-group position-static text-nowrap">
                <button
                  className="px-4 py-2 text-sm border border-t border-b border-gray-200 inline-flex items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-boundary="window"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-bs-reference="parent"
                >
                  {" "}
                  Vendor
                  <svg
                    className="w-3 h-3 ml-2"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="angle-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                    ></path>
                  </svg>
                </button>
                <ul className="hidden dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
              <button className="px-4 py-2 text-sm border border-gray-200 rounded-r-md">
                More filters
              </button>
            </div>
          </div>
          <div className="col-auto">
            <button className="btn btn-link text-900 me-4 px-0">
              <svg
                className="svg-inline--fa fa-file-export fs--1 me-2"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="file-export"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M192 312C192 298.8 202.8 288 216 288H384V160H256c-17.67 0-32-14.33-32-32L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48v-128H216C202.8 336 192 325.3 192 312zM256 0v128h128L256 0zM568.1 295l-80-80c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94L494.1 288H384v48h110.1l-39.03 39.03C450.3 379.7 448 385.8 448 392s2.344 12.28 7.031 16.97c9.375 9.375 24.56 9.375 33.94 0l80-80C578.3 319.6 578.3 304.4 568.1 295z"
                ></path>
              </svg>
              <span className="fa-solid fa-file-export fs--1 me-2"></span>
            </button>
            <button className="inline-flex px-4 py-2 items-center text-sm text-white bg-blue-500 rounded-lg" id="addBtn">
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
        
      <ProductList data={productList} isLoading={isLoading}/>

      <div className='grid grid-cols-3 bg-white p-5 rounded-t-lg mt-5 shadow-md'>
        <div className='text-sm flex items-center'>
            <label className='mb-0 mr-3'>Row per page</label>
            <select className='border-none' onChange={(e) => handleChangeLimitShow(e.target.value)}>
              <option value="5" selected={limitShow === 5}>5</option>
              <option value="10" selected={limitShow === 10}>10</option>
              <option value="20" selected={limitShow === 20}>20</option>
              <option value="30" selected={limitShow === 30}>30</option>
            </select>
        </div>
        <div className='flex items-center justify-center'>
          {/* <span className='text-sm'>{`${1 + (pagination?.current_page - 1) * pagination?.per_page} to ${(pagination.current_page - 1) * pagination.per_page + pagination.count} items of ${pagination.total}`}</span> */}
        </div>
        <div className='text-right'>
          {/* <ReactPaginate
            className='pagination'
              breakLabel="..."
              nextLabel=">"
              pageRangeDisplayed={5}
              pageCount={pagination?.total_pages}
              previousLabel="<"
              renderOnZeroPageCount={null}
              onPageChange={handlePageChange}
          /> */}
        </div>
      </div>

      



      </div>
    </div>
  );
};

export default ProductManager;
