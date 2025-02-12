import { getAllProducts } from '@/services/ProductService';
import { useEffect, useState } from 'react';
import { IProduct } from 'types';
import ProductCard from './ProductCard';

interface Props {
    type: string;
    listSize: number;
    category: string | null;
    platform: string | null;
    stockStatus: string | null;
    studio: string | null;
    manufactureYear: string | null;
    status: string | null;
}

const ProductList = ({ type, listSize }: Props) => {
    const [productList, setProductList] = useState<IProduct[]>([]);

    const fetchProductList = async () => {
        try {
            const response = await getAllProducts();
            setProductList(response?.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductList();
    }, []);

    return (
        <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols- xl:grid-cols-5 mt-6">
                {productList?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};

export default ProductList;
