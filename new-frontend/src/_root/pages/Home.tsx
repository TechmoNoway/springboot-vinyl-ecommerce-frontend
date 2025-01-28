import { Button } from '@/components/ui/button';
import { FaGift, FaMusic, FaTree } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="w-full">
            <section className="w-full flex md:flex-row items-center justify-center bg-white">
                {/* New Vinyl Section */}
                <div className="w-1/2 flex flex-col flex-1 bg-white text-right items-end pt-12">
                    <div className="pr-5">
                        <h2 className="text-2xl font-bold uppercase hover:underline">Đĩa Mới &gt;</h2>
                        <p className="text-gray-700 mt-2">Đĩa than nguyên seal mới toanh của bạn và chỉ riêng bạn</p>

                        <div className="mt-4 flex flex-col items-end space-y-4">
                            <Button className="flex items-center justify-center bg-white hover:bg-white hover:border-black border-black px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] font-bold hover:underline">
                                <FaMusic className="" /> Đĩa Mới Có Sẵn
                            </Button>
                            <Button className="flex items-center justify-center bg-[#D9534f] px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black hover:border-black hover:bg-[#D9534f] hover:underline font-bold">
                                <FaTree className="" /> Đĩa Giáng Sinh
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
                        <h2 className="text-xl font-bold hover:underline uppercase">Đĩa Vintage &gt;</h2>
                        <p className="text-gray-700 mt-2">
                            Những chiếc đĩa than vượt năm tháng để đưa giai điệu nguyên bản tới đôi tai bạn
                        </p>

                        <div className="mt-5 space-y-5">
                            <Button className="flex items-center justify-center bg-white px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black font-bold hover:underline hover:border-black hover:bg-white">
                                <span className="">🇻🇳</span> Đĩa Than Việt Nam
                            </Button>
                            <Button className="flex items-center justify-center bg-[#308300] px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black font-bold hover:underline hover:border-black hover:bg-[#308300]">
                                <FaGift className="" /> Đĩa Vintage Có Sẵn
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

            <section className="w-full flex md:flex-row items-center justify-center bg-white">
                <div>
                    <div>
                        <Link to="/">
                            <span>&nbsp;TẠO MIXTAPE </span>
                        </Link>

                        <div>
                            <p>Âm thanh analog trên băng cát-xét</p>
                        </div>

                        <div>
                            <Link to="/">
                                <span>KHÁM PHÁ MIXTAPE</span>
                            </Link>
                        </div>

                        <div>
                            <img src="https://vocrecords.vn/wp-content/uploads/2022/07/Mask-group.png" alt="" />
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <Link to="/">
                            <span>MÂM ĐĨA </span>
                        </Link>

                        <div>
                            <Link to="/">Khám phá ngay</Link>
                        </div>

                        <div>
                            <img src="https://vocrecords.vn/wp-content/uploads/2022/07/Img-1-1.png" alt="" />
                        </div>

                        <div>
                            <img src="https://vocrecords.vn/wp-content/uploads/2022/07/Group-8.png" alt="" />
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <Link to="/">
                            <span>PHỤ KIỆN </span>
                        </Link>

                        <div>
                            <Link to="/">Khám phá ngay</Link>
                        </div>

                        <div>
                            <img src="https://vocrecords.vn/wp-content/uploads/2022/07/Img-3.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
