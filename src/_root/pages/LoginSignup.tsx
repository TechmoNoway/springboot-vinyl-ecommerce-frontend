import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const LoginSignup = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center py-44 bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-[800px] flex">
        {/* Login Section */}
        <div className="w-1/2 pr-6 border-r">
          <h2 className="text-xl font-semibold mb-4">ĐĂNG NHẬP</h2>
          {/* Facebook Login Button */}
          <Button className="w-full flex items-center justify-center border border-black hover:border-black hover:bg-black hover:text-white rounded-md py-2 mb-4 bg-white text-black font-semibold">
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Continue with <span className="font-bold">Facebook</span>
          </Button>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>

          {/* Email Input */}
          <label className="block text-sm font-medium">
            Tên tài khoản hoặc địa chỉ email *
          </label>
          <Input
            type="email"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
          />

          {/* Password Input */}
          <label className="block text-sm font-medium">
            Mật khẩu *
          </label>
          <Input
            type="password"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
          />

          {/* reCAPTCHA Placeholder */}
          <div className="border rounded-md p-4 mb-4 flex items-center justify-center">
            <span className="text-sm text-gray-500">[reCAPTCHA]</span>
          </div>

          {/* Login Button & Remember Me */}
          <div className="flex items-center justify-between">
            <button className="bg-black text-white py-2 px-6 rounded-md">
              ĐĂNG NHẬP
            </button>
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Ghi nhớ mật khẩu
            </label>
          </div>

          {/* Forgot Password */}
          <p className="text-sm text-gray-500 mt-3 cursor-pointer">
            Quên mật khẩu?
          </p>
        </div>

        {/* Signup Section */}
        <div className="w-1/2 pl-6">
          <h2 className="text-xl font-semibold mb-4">ĐĂNG KÝ</h2>

          {/* Email Input */}
          <label className="block text-sm font-medium">
            Địa chỉ email *
          </label>
          <Input
            type="email"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
          />

          <p className="text-sm text-gray-500 mb-4">
            Một mật khẩu sẽ được gửi đến địa chỉ email của bạn.
          </p>

          {/* reCAPTCHA Placeholder */}
          <div className="border rounded-md p-4 mb-4 flex items-center justify-center">
            <span className="text-sm text-gray-500">[reCAPTCHA]</span>
          </div>

          {/* Signup Button */}
          <button className="bg-black text-white py-2 px-6 rounded-md w-full">
            ĐĂNG KÝ
          </button>

          {/* Privacy Policy Notice */}
          <p className="text-xs text-gray-500 mt-4">
            Thông tin cá nhân của bạn sẽ được sử dụng để tăng trải
            nghiệm sử dụng website, quản lý truy cập vào tài khoản của
            bạn, và cho các mục đích cụ thể khác được mô tả trong
            chính sách riêng tư.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
