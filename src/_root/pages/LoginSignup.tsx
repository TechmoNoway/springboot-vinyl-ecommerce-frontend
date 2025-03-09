import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CSSProperties, useState } from "react";
import { login, register } from "@/services/AuthService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 10 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginSignup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState("#ffffff");
  const [registeringEmail, setRegisteringEmail] =
    useState<string>("");

  const handleRegisterEmail = async (email: string) => {
    const response = await register(email);

    if (response?.data.success === true) {
      toast({
        variant: "success",
        title: "Success!",
        description: "Please check your email for the password.",
      });
      navigate("/profile");
    } else {
      toast({
        variant: "destructive",
        title: "Opps! Something went wrong",
        description: "Please try again.",
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await login({
      email: values.email,
      password: values.password,
    });

    if (response?.data.success === true) {
      setLoading(true);
      localStorage.setItem(
        "access_token",
        response.data.data.accessToken
      );
      setTimeout(() => {
        setLoading(false);
        navigate("/profile");
        toast({
          variant: "success",
          title: "Success!",
          description: "Please check your email for the password.",
        });
      }, 3000);
    } else {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Opps! Wrong credential",
        description: "Please try again.",
      });
    }
  }

  return (
    <div className="flex justify-center items-center pt-24 pb-44 bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-3xl flex flex-col md:flex-row">
        {/* Login Section */}
        <div className="w-full md:w-1/2 md:pr-6 md:border-r mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">ĐĂNG NHẬP</h2>
          {/* Facebook Login Button */}
          <Button className="flex items-center justify-center border border-black hover:border-black hover:bg-black hover:text-white rounded-md py-2 mb-4 bg-white text-black font-semibold">
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
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="abc@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* reCAPTCHA Placeholder */}
              <div className="border rounded-md p-4 mb-4 flex items-center justify-center">
                <span className="text-sm text-gray-500">
                  [reCAPTCHA]
                </span>
              </div>

              {/* Login Button & Remember Me */}
              <div className="flex items-center justify-between">
                {loading ? (
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-6 rounded-md hover:bg-white hover:border-black hover:text-black"
                  >
                    <ClipLoader
                      color={color}
                      loading={loading}
                      cssOverride={override}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                      speedMultiplier={1}
                    />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-6 rounded-md hover:bg-white hover:border-black hover:text-black"
                  >
                    ĐĂNG NHẬP
                  </button>
                )}

                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Ghi nhớ mật khẩu
                </label>
              </div>

              {/* Forgot Password */}
              <p className="text-sm text-gray-500 mt-3 cursor-pointer">
                Quên mật khẩu?
              </p>
            </form>
          </Form>
        </div>

        {/* Signup Section */}
        <div className="w-full md:w-1/2 md:pl-6">
          <h2 className="text-xl font-semibold mb-4">ĐĂNG KÝ</h2>

          {/* Email Input */}
          <label className="block text-sm font-medium">
            Địa chỉ email *
          </label>
          <Input
            value={registeringEmail}
            onChange={(e) => setRegisteringEmail(e.target.value)}
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
          <Button
            onClick={() => handleRegisterEmail(registeringEmail)}
            className="bg-black text-white py-2 px-6 rounded-md w-full hover:bg-white hover:border-black hover:text-black"
          >
            ĐĂNG KÝ
          </Button>

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
