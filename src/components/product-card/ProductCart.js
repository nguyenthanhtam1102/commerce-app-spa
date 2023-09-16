import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isLoading = false }) => {
    if(isLoading) {
        return (
            <div className="relative animate-pulse">
                <div className="rounded-xl border w-full bg-gray-200">
                    <img
                        className="w-full h-eqw opacity-0"
                        src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                        alt=""
                    />
                </div>
                <div className="card-body py-4">
                    <div className="w-full h-3.5 rounded-full bg-gray-200"></div>
                    <div className="w-7/12 h-3.5 rounded-full bg-gray-200 mt-2"></div>
                    <div className="w-9/12 h-3.5 rounded-full bg-gray-200 mt-4"></div>
                    <div className="w-1/3 h-9 rounded-full bg-gray-200 mt-4"></div>
                </div>
            </div>
        )
    }
    
    const { id, name, price, image } = product;

    return (
        <Link to={`/products/${id}`}>
            <div className="relative text-left">
                <img
                    className="rounded-xl border w-full h-eqw object-cover"
                    src={
                        image
                            ? image.url
                            : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                    }
                    alt=""
                />
                <div className="card-body p-4">
                    <h3 className="font-bold line-clamp-3 text-lg">
                        {name}
                    </h3>
                    <div className="inline-flex items-center">
                        <Rating
                            name="read-only"
                            value={3}
                            size="small"
                            readOnly
                        />
                        <span className="text-500 text-sm m-0 ml-2 font-semibold">
                            Đã bán 1k
                        </span>
                    </div>
                    <div>
                        <span className="text-900 line-through mr-2 text-lg">
                            $89.00
                        </span>
                        <span className="text-1100 font-bold text-2xl">
                            {price.formatted_with_symbol}
                        </span>
                    </div>
                </div>
                <div className="hidden absolute rounded-md py-0.5 px-1.5 top-3 right-3 bg-orange-600 text-white ">
                    <label>-10%</label>
                </div>
                <div className="hidden absolute rounded-md py-0.5 px-1.5 top-3 left-3 bg-blue-500 text-white ">
                    <label>HOT</label>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
