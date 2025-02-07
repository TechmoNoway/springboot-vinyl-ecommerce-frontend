import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { Button } from '../ui/button';
import { IProduct } from 'types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Props {
    product: IProduct;
}

const ProductCard = ({ product }: Props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { cart, dispatch } = useCart();

    const addToCart = () => {
        if (product?.id) {
            const existingCartItem = cart.find((item) => item.id === product?.id);
            if (existingCartItem) {
                dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { ...existingCartItem, quantity: existingCartItem.quantity + 1 },
                });
            } else {
                dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
            }
        } else {
            console.error('Product ID is undefined');
        }
    };

    return (
        <>
            <div className="relative group w-64 my-3 text-center">
                <Link to={`/product/${product.title}`} className="block">
                    {/* Product Image */}
                    <div className="relative">
                        <img
                            src={product.posterUrl}
                            alt={product.title}
                            loading="lazy"
                            onLoad={() => setIsLoaded(true)}
                            className={`w-full rounded shadow-lg transition-opacity duration-500 ${
                                isLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    </div>
                </Link>

                {/* Hover Buttons */}
                <div className="absolute inset-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity mt-28 h-10">
                    <Button className="bg-white px-4 flex items-center space-x-2 hover:bg-gray-100 rounded-none border-[1px] border-black hover:border-black shadow-[4px_4px_0px_#000000]">
                        <FaHeart className="text-gray-600" />
                    </Button>

                    <Button
                        onClick={addToCart}
                        className="bg-[#FFF27E] hover:bg-[#FFF27E] border-[1px] border-black hover:border-black px-2 flex items-center rounded-none shadow-[4px_4px_0px_#000000]"
                    >
                        <FaShoppingBag className="text-black" />
                        <span className="text-black text-[10px]" onClick={() => console.log('Added to cart')}>
                            THÊM VÀO GIỎ HÀNG
                        </span>
                    </Button>
                </div>

                {/* Product Details */}
                <div className="my-10">
                    <Link to={`/product/${product.title}`}>
                        <p className="text-gray-500 font-normal">{product.title}</p> {/* Album Name */}
                        <h3 className="text-lg text-black">{product.artist}</h3> {/* Artist */}
                        <p className="text-xl font-bold text-gray-900">{product.price.toLocaleString('en-US')} ₫</p>
                        {/* Price */}
                        {/* Stock & Size */}
                        <div className="flex justify-center mt-2 space-x-2">
                            <span
                                className="text-green-600 rounded-none text-[10px] px-2 py-1 uppercase"
                                style={{
                                    background:
                                        'linear-gradient(0deg, rgba(40, 168, 32, 0.15), rgba(40, 168, 32, 0.15)), #FFFFFF',
                                }}
                            >
                                Còn hàng
                            </span>
                            <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded-none">
                                {product.status}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
