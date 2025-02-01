import { FaFacebook, FaInstagram, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getReadyProducts } from '@/services/ProductService';
import { useEffect, useState } from 'react';
import { IProduct } from '../../../types/index';

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
            <section className="px-40">
                <div>
                    <div>
                        <span>ĐĨA THAN SẴN SÀNG</span>
                        <span>XEM ĐĨA GIẢM GIÁ</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {readyDiscList?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div>
                        <div>
                            <div>
                                <Link to="/">KHÁM PHÁ DANH SÁCH ĐĨA THAN CỦA SOLEIL</Link>
                            </div>
                        </div>

                        <div>
                            <span>
                                <span>Theo dõi SOLEIL RECORDS trên:</span>
                            </span>

                            <span>
                                <div>
                                    <a href="/">
                                        <FaFacebook />
                                    </a>
                                    <a href="/">
                                        <FaInstagram />
                                    </a>
                                    <a href="/">
                                        <FaTiktok />
                                    </a>
                                    <a href="/">
                                        <FaYoutube />
                                    </a>
                                    <a href="/">
                                        <FaSpotify />
                                    </a>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReadyVinylList;
