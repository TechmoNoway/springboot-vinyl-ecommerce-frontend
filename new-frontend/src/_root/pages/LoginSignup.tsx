const LoginSignup = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md p-8 rounded-lg w-[800px] flex">
                {/* Login Section */}
                <div className="w-1/2 pr-6 border-r">
                    <h2 className="text-xl font-semibold mb-4">ĐĂNG NHẬP</h2>
                    {/* Facebook Login Button */}
                    <button className="w-full flex items-center justify-center border rounded-md py-2 mb-4 text-black font-semibold">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                            alt="Facebook"
                            className="w-5 h-5 mr-2"
                        />
                        Continue with <span className="font-bold ml-1">Facebook</span>
                    </button>

                    {/* Email Input */}
                    <label className="block text-sm font-medium">Tên tài khoản hoặc địa chỉ email *</label>
                    <input type="text" className="w-full border rounded-md px-3 py-2 mt-1 mb-4" />

                    {/* Password Input */}
                    <label className="block text-sm font-medium">Mật khẩu *</label>
                    <input type="password" className="w-full border rounded-md px-3 py-2 mt-1 mb-4" />

                    {/* reCAPTCHA Placeholder */}
                    <div className="border rounded-md p-4 mb-4 flex items-center justify-center">
                        <span className="text-sm text-gray-500">[reCAPTCHA]</span>
                    </div>

                    {/* Login Button & Remember Me */}
                    <div className="flex items-center justify-between">
                        <button className="bg-black text-white py-2 px-6 rounded-md">ĐĂNG NHẬP</button>
                        <label className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2" />
                            Ghi nhớ mật khẩu
                        </label>
                    </div>

                    {/* Forgot Password */}
                    <p className="text-sm text-gray-500 mt-3 cursor-pointer">Quên mật khẩu?</p>
                </div>

                {/* Signup Section */}
                <div className="w-1/2 pl-6">
                    <h2 className="text-xl font-semibold mb-4">ĐĂNG KÝ</h2>

                    {/* Email Input */}
                    <label className="block text-sm font-medium">Địa chỉ email *</label>
                    <input type="email" className="w-full border rounded-md px-3 py-2 mt-1 mb-4" />

                    <p className="text-sm text-gray-500 mb-4">Một mật khẩu sẽ được gửi đến địa chỉ email của bạn.</p>

                    {/* reCAPTCHA Placeholder */}
                    <div className="border rounded-md p-4 mb-4 flex items-center justify-center">
                        <span className="text-sm text-gray-500">[reCAPTCHA]</span>
                    </div>

                    {/* Signup Button */}
                    <button className="bg-black text-white py-2 px-6 rounded-md w-full">ĐĂNG KÝ</button>

                    {/* Privacy Policy Notice */}
                    <p className="text-xs text-gray-500 mt-4">
                        Thông tin cá nhân của bạn sẽ được sử dụng để tăng trải nghiệm sử dụng website, quản lý truy cập
                        vào tài khoản của bạn, và cho các mục đích cụ thể khác được mô tả trong chính sách riêng tư.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
