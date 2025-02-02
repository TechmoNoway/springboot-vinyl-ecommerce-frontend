import { FaFacebook, FaInstagram, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getReadyProducts } from '@/services/ProductService';
import { useEffect, useState } from 'react';
import { IProduct } from '../../../types/index';
import { Button } from '../ui/button';

const ReadyVinylList = () => {
    const [readyDiscList, setReadyDiscList] = useState<IProduct[]>([]);

    const fetchReadyDiscList = async () => {
        try {
            const response = await getReadyProducts();
            setReadyDiscList(response?.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchReadyDiscList();
    }, []);

    return (
        <>
            <section className="my-8 px-8 md:px-28 lg:px-28 xl:px-48 flex flex-col items-center">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="font-bold text-xl uppercase">ĐĨA THAN SẴN SÀNG</p>
                        <Link
                            to={'/'}
                            className="text-black font-normal hover:text-black uppercase bg-yellow-300 underline"
                        >
                            XEM ĐĨA ORDER
                        </Link>
                    </div>

                    <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                        {readyDiscList?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="w-full flex justify-center items-center mt-4 mb-20">
                        <Button className="flex items-center justify-center bg-white hover:bg-white hover:border-black border-black px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] font-bold hover:underline shadow-[4px_4px_0px_#000000]">
                            Đĩa Mới Có Sẵn
                        </Button>
                    </div>

                    <div className="flex justify-center items-center space-x-4">
                        <p>Theo dõi VỌC RECORDS trên:</p>

                        <a href="/" className="text-gray-400 text-xl pl-3">
                            <FaFacebook />
                        </a>
                        <a href="/" className="text-gray-400 text-xl">
                            <FaInstagram />
                        </a>
                        <a href="/" className="text-gray-400 text-xl">
                            <FaTiktok />
                        </a>
                        <a href="/" className="text-gray-400 text-xl">
                            <FaYoutube />
                        </a>
                        <a href="/" className="text-gray-400 text-xl">
                            <FaSpotify />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReadyVinylList;
