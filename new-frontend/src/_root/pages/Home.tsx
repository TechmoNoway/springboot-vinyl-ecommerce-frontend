import { Button } from '@/components/ui/button';
import { FaGift, FaMusic, FaTree } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="flex w-full">
            <section className="w-full flex flex-col md:flex-row items-center justify-center bg-white">
                {/* New Vinyl Section */}
                <div className="w-1/2 flex flex-col flex-1 bg-white text-right items-end pt-12">
                    <div className="pr-5">
                        <h2 className="text-xl font-bold uppercase">Đĩa Mới &gt;</h2>
                        <p className="text-gray-700 mt-2">Đĩa than nguyên seal mới toanh của bạn và chỉ riêng bạn</p>

                        <div className="mt-4 flex flex-col items-end space-y-3">
                            <Button className="flex items-center justify-center bg-white border-black px-4 py-2 text-black uppercase hover:text-white w-full md:w-auto rounded-none border-[1px] font-bold">
                                <FaMusic className="mr-2" /> Đĩa Mới Có Sẵn
                            </Button>
                            <Button className="flex items-center justify-center bg-red-600 px-4 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black font-bold">
                                <FaTree className="mr-2" /> Đĩa Giáng Sinh
                            </Button>
                        </div>
                    </div>

                    <img
                        src="https://vocrecords.vn/wp-content/uploads/2022/07/Photo-New-disc.png"
                        alt="Left Vinyl Box"
                        className="h-auto object-cover mt-5"
                    />
                </div>

                {/* Vintage Vinyl Section */}
                <div className="w-1/2 flex-1 bg-gray-100 pt-12">
                    <div className="pl-5">
                        <h2 className="text-xl font-bold uppercase">Đĩa Vintage &gt;</h2>
                        <p className="text-gray-700 mt-2">
                            Những chiếc đĩa than vượt năm tháng để đưa giai điệu nguyên bản tới đôi tai bạn
                        </p>

                        <div className="mt-4 space-y-3">
                            <Button className="flex items-center justify-center bg-white px-4 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black font-bold">
                                <span className="mr-2">🇻🇳</span> Đĩa Than Việt Nam
                            </Button>
                            <Button className="flex items-center justify-center bg-green-600 px-4 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] font-bold">
                                <FaGift className="mr-2" /> Đĩa Vintage Có Sẵn
                            </Button>
                        </div>
                    </div>

                    <img
                        src="https://vocrecords.vn/wp-content/uploads/2022/07/Photo-Vintage-disc.png"
                        alt="Right Vinyl Box"
                        className="h-auto object-cover mt-5"
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;
