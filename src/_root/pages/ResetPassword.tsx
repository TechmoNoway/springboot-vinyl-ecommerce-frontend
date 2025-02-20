const ResetPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-[450px]">
        {/* Reset Password Heading */}
        <h2 className="text-lg font-semibold mb-2">
          Lost your password?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter your username or email address. You will
          receive a link to create a new password via email.
        </p>

        {/* Username / Email Input */}
        <label className="block text-sm font-medium">
          Username or email
        </label>
        <input
          type="email"
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
        />

        {/* reCAPTCHA Placeholder */}
        <div className="border rounded-md p-4 mb-4 flex items-center justify-center">
          <span className="text-sm text-gray-500">[reCAPTCHA]</span>
        </div>

        {/* Reset Password Button */}
        <button className="bg-black text-white py-2 px-6 rounded-md w-full">
          RESET PASSWORD
        </button>

        {/* Back to Login Link */}
        <p className="text-sm text-gray-500 mt-3">
          <a href="/login" className="underline">
            Click here to login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
