import { FaMusic, FaTree, FaGift } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Banner = () => {
    return (
        <>
            <section className="w-full flex md:flex-row items-center justify-center bg-white">
                {/* New Vinyl Section */}
                <div className="w-1/2 flex flex-col flex-1 bg-white text-right items-end pt-12">
                    <div className="pr-5">
                        <h2 className="text-2xl font-bold uppercase hover:underline">Đĩa Mới &gt;</h2>
                        <p className="text-gray-700 mt-2">Đĩa than nguyên seal mới toanh của bạn và chỉ riêng bạn</p>

                        <div className="mt-4 flex flex-col items-end space-y-5">
                            <Button className="flex items-center justify-center bg-white hover:bg-white hover:border-black border-black px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] font-bold hover:underline shadow-[4px_4px_0px_#000000]">
                                <FaMusic className="" /> Đĩa Mới Có Sẵn
                            </Button>
                            <Button className="flex items-center justify-center bg-[#D9534f] px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black hover:border-black hover:bg-[#D9534f] hover:underline font-bold shadow-[4px_4px_0px_#000000]">
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
                <div className="w-1/2 flex-1 bg-gray-200 pt-12 flex-col">
                    <div className="pl-5">
                        <h2 className="text-2xl font-bold hover:underline uppercase">Đĩa Vintage &gt;</h2>
                        <p className="text-gray-700 mt-2">
                            Những chiếc đĩa than vượt năm tháng để đưa giai điệu nguyên bản tới đôi tai bạn
                        </p>

                        <div className="mt-5 space-y-5">
                            <Button className="flex items-center justify-center bg-white px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black font-bold hover:underline hover:border-black hover:bg-white shadow-[4px_4px_0px_#000000]">
                                <span className="">🇻🇳</span> Đĩa Than Việt Nam
                            </Button>
                            <Button className="flex items-center justify-center bg-[#308300] px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black font-bold hover:underline hover:border-black hover:bg-[#308300] shadow-[4px_4px_0px_#000000]">
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

            <section className="w-full flex justify-center bg-white">
                <div className="flex flex-row-reverse w-1/2 bg-slate-100 pt-6 pr-8">
                    <div className="flex flex-col items-end">
                        <Link
                            to="/"
                            className="uppercase text-black font-bold text-2xl hover:underline hover:text-black"
                        >
                            <span>Cassette Zone </span>
                        </Link>

                        <p className="mt-4">Âm thanh analog trên băng cát-xét</p>

                        <div className="mt-5 flex flex-col items-end space-y-5">
                            <Button className="flex items-center justify-center bg-white px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black font-bold hover:underline hover:border-black hover:bg-white shadow-[4px_4px_0px_#000000]">
                                Thu băng cá nhân
                            </Button>
                            <Button className="flex items-center justify-center bg-[#f0ad4e] px-3 py-2 text-black uppercase w-full md:w-auto rounded-none border-[1px] border-black font-bold hover:underline hover:border-black hover:bg-[#f0ad4e] shadow-[4px_4px_0px_#000000]">
                                Mua băng gốc
                            </Button>
                        </div>
                    </div>

                    <img
                        src="https://vocrecords.vn/wp-content/uploads/2022/07/Mask-group.png"
                        alt=""
                        className="w-[265px] h-[176px] mt-20 mr-8"
                    />
                </div>

                <div className="w-1/2 flex flex-row">
                    <div className="relative w-1/2 pt-6 pl-5 flex flex-col">
                        <Link
                            to="/"
                            className="uppercase text-black font-bold text-2xl hover:underline hover:text-black"
                        >
                            <span>MÂM ĐĨA </span>
                        </Link>

                        <Link to="/" className="mt-4 text-black font-normal">
                            <p>Khám phá ngay</p>
                        </Link>

                        <img
                            src="https://vocrecords.vn/wp-content/uploads/2022/07/Img-1-1.png"
                            alt=""
                            className="w-[226px] h-[183px]"
                        />

                        <img
                            src="https://vocrecords.vn/wp-content/uploads/2022/07/Group-8.png"
                            alt=""
                            className="absolute top-3 right-3 w-[91px] h-[90px]"
                        />
                    </div>

                    <div className="w-1/2 pt-6 pl-5 flex flex-col bg-slate-100">
                        <Link
                            to="/"
                            className="uppercase text-black font-bold text-2xl hover:underline hover:text-black"
                        >
                            <span>PHỤ KIỆN </span>
                        </Link>

                        <Link to="/" className="mt-4 text-black font-normal">
                            <p>Khám phá ngay</p>
                        </Link>

                        <img
                            src="https://vocrecords.vn/wp-content/uploads/2022/07/Img-3.png"
                            alt=""
                            className="w-[200px] h-[119px] ml-5 mt-16"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-[url('https://vocrecords.vn/wp-content/uploads/2022/07/Disc-photo.png')] bg-[#21272A] bg-no-repeat bg-top w-full pb-12 flex flex-col items-center text-white">
                <h2 className="flex justify-center font-bold text-2xl text-white uppercase mt-16">
                    1001 nỗi trăn trở của
                </h2>

                <img
                    src="https://vocrecords.vn/wp-content/uploads/elementor/thumbs/Logo_ngang-resize-sat-pt01tz3zmsps5x7ng4h1zs82jrju1okgrnkruqs5n6.png"
                    alt=""
                    className="w-[318px] h-[53px] mt-4 flex items-center"
                />

                <p className="mt-24 font-semibold">"VỌC ƠI, CÒN ĐĨA NÀY HEM?"</p>

                <div className="w-full flex mt-20">
                    <div className="w-1/2 flex justify-end px-5 py-2">
                        <p className="text-sm">
                            Mỗi lần bạn hỏi câu này là Vọc lại bồn chồn ghê
                            <br /> gớm. Vọc muốn đĩa về nhanh nhanh để còn đem
                            <br /> ra khoe cho oách, nên có ngón gì về (hoặc sắp
                            <br /> về) là Vọc vác hết lên đây bày liền. Mời bạn vô
                            <br /> lựa nha!
                        </p>
                    </div>

                    <div className="w-1/2 flex px-10 border-l-[0.5px] py-2">
                        <p className="text-sm">
                            Nếu đĩa không sẵn hàng hoặc chưa có
                            <br /> trên web thì bạn cứ nhắn tin để Vọc báo
                            <br /> giá order riêng tư nha. Hứa danh dự sẽ rep
                            <br /> nhanh và đẹp trai nhất!!
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Banner;
