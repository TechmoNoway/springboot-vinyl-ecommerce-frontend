const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20 lg:px-40 xl:px-80">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Logo & Slogan */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">
            <span className="text-white">VOC</span>
            <span className="text-yellow-400"> RECORDS</span>
          </h2>
          <p className="text-gray-400 text-sm">
            TRẢI NGHIỆM ÂM NHẠC TỐT HƠN
          </p>
        </div>

        {/* Middle Section - Information */}
        <div>
          <h3 className="text-lg font-bold uppercase border-b border-gray-600 pb-2">
            Thông Tin
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Newsletter
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Mixtape
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - Help */}
        <div>
          <h3 className="text-lg font-bold uppercase border-b border-gray-600 pb-2">
            Trợ Giúp
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Giao hàng
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Liên Hệ
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Thanh toán
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Hướng dẫn mua hàng
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        Copyright 2022 ©{" "}
        <span className="font-bold text-white">VOCRECORDS</span>.
        Powered by teks.info
      </div>
    </footer>
  );
};

export default Footer;
