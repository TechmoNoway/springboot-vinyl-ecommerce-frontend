import { IProduct } from 'types';
import ProductCard from './ProductCard';

interface Props {
    type: string;
    products: IProduct[];
}

const ProductList = ({ type, products }: Props) => {
    return (
        <>
            <div className={`mt-4 ${type === 'Horizontal' ? 'grid grid-cols-3 gap-4' : 'grid grid-cols-1 gap-4'}`}>
                {products?.map((product: IProduct) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};

export default ProductList;
