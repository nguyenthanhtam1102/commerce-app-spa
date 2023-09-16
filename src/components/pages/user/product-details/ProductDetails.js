import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import TabPanel from "../../../tab-panel/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct } from '../../../../redux/slices/productsSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from "../../../product-card/ProductCart";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ImageSlide = ({ images, isLoading, handleImageSelected }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };
    
    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}
                    onClick={() => handleImageSelected(image)}
                >
                    <img src={image.url} alt={`Product Image ${index}`} />
                </div>
            ))}
        </Slider>
    );
}

const ProductSlide = ({ products, isLoading }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };
    
    return (
        <Slider {...settings}>
            {products.map((product, index) => {
                return (
                    <div key={index}>
                        <ProductCard product={product} isLoading={isLoading}/>
                    </div>
                )
            })}
        </Slider>
    );
}

const ProductDetails = () => {
    const { id } = useParams()

    console.log(id);

    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state) => state.products);
    const [imageSelected, setImageSelected] = useState(null)

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [id])

    return (
        <div className="product-details-container container py-5">
            <div className="breakscrum-container">

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="">
                    <img 
                        className="rounded-xl border w-full h-eqw"
                        src={imageSelected !== null ? imageSelected.url : product && product.assets.length > 0 ? product.assets[0].url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-y-IJN8glQlf1qoU01dEgGPUa0d1-sjfWg&usqp=CAU'}
                        alt=""
                    />
                    <div className="mt-5">
                        {product &&
                            <ImageSlide images={product.assets} isLoading={loading} handleImageSelected={setImageSelected}/>   
                        }
                    </div>
                </div>
                <div>
                    <p className="text-2xl font-bold">{product && product.name}</p>
                    <div className="flex items-center py-1">
                        <Rating
                            name="read-only"
                            value={5}
                        />
                        <span className="ml-3">Đã bán 2k</span>
                    </div>
                    <div className="py-1.5">
                        <label className="text-3xl font-bold mr-3">{product && product.price.formatted_with_code}</label>
                        <label className="text-2xl line-through mr-3">$1499.00</label>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                    <div className="py-1">
                        <button className="text-sm w-60 py-2 border rounded-full font-bold mr-3">
                            <i className="fa-sharp fa-regular fa-heart mr-2"></i>
                            Add to wishlist
                        </button>
                        <button className="text-sm w-60 py-2 border rounded-full font-bold mr-3">
                            <i className="fa-solid fa-cart-circle-plus mr-2"></i>
                            Add to cart
                        </button>
                    </div>
                </div>

            </div>
            <div className="mt-10">
                <div>
                    <TabPanel 
                        headers={[
                            <button className="p-2">Description</button>,
                            <button className="p-2">Reviews</button>
                        ]}
                        contents={[
                            <div className="text-lg">
                                <ReactQuill
                                    readOnly
                                    theme="bubble"
                                    value={product?.description}
                                />
                            </div>,
                            <div>Tab Reviews Content</div>
                        ]}
                    />
                </div>
            </div>
            <div className="related-products-container my-10">
                <span className="text-3xl font-bold">Related Products</span>
                <div className="mt-5">
                    {product?.related_products &&
                        <ProductSlide products={product.related_products} isLoading={loading}/>   
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;