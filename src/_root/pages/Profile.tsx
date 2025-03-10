import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/UserService";
import { IUpdateUser } from "types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface RootState {
  auth: {
    id: number;
    email: string;
    avatarUrl: string;
    phone: string;
    gender: string;
    fullname: string;
    address: string;
    birthday: string;
  };
}

const Profile = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<IUpdateUser>({
    id: 0,
    email: "",
    avatarUrl: "",
    phone: "",
    gender: "",
    fullname: "",
    address: "",
    birthday: "",
  });
  const currentUser = useSelector((state: RootState) => state.auth);
  const { logoutWithNavigate } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutWithNavigate();
  };

  const hanldeUpdateUser = async () => {
    const response = await updateUser(userProfile);

    if (response?.data.success === true) {
      updateUser(userProfile);
      toast({
        variant: "success",
        title: "Success!",
        description: "Update user successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Opps! Something went wrong",
        description: "Please try again.",
      });
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const onSelectChange = (name: string, value: string) => {
    setUserProfile({ ...userProfile, [name]: value });
  };

  useEffect(() => {
    setUserProfile(currentUser);
  }, [currentUser.email !== ""]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token === "" || token === null) {
      navigate("/login-signup");
    }
  }, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-10">
      <div className="flex w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {/* Sidebar */}
        <div className="w-1/3 border-r pr-6">
          <ul className="text-gray-600">
            <li className="font-semibold text-gray-700 cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2">
              THÔNG TIN TÀI KHOẢN
            </li>
            <li className="hover:text-black cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2">
              WISHLIST
            </li>
            <li className="hover:text-black cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2">
              THEO DÕI ĐƠN HÀNG
            </li>
            <li className="hover:text-black cursor-pointer border-b-[1px] border-gray-300 py-4 hover:bg-zinc-200 px-2">
              ĐỊA CHỈ NHẬN HÀNG
            </li>
            <li
              onClick={handleLogout}
              className="hover:text-black cursor-pointer py-4 hover:bg-zinc-200 px-2"
            >
              THOÁT
            </li>
          </ul>
        </div>

        {/* Profile Form */}
        <div className="w-2/3 pl-6">
          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Fullname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={userProfile?.fullname || ""}
                name="fullname"
                onChange={onInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={userProfile?.email || ""}
                name="email"
                onChange={onInputChange}
                className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={userProfile?.address || ""}
              name="address"
              onChange={onInputChange}
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={userProfile?.phone || ""}
              name="address"
              onChange={onInputChange}
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
            />
          </div>

          {/* Birthdate and gender */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Birthdate <span className="text-red-500">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild className="">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
                    )}
                  >
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}

                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={date}
                    onDayClick={setDate}
                    mode="default"
                    disabled={(date) =>
                      date > new Date() ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Gender <span className="text-red-500">*</span>
              </label>
              <Select
                onValueChange={(value) =>
                  onSelectChange("gender", value)
                }
                defaultValue={userProfile.gender}
              >
                <SelectTrigger className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Password Change Section */}
          <h3 className="font-semibold text-gray-700 mt-6 mb-2">
            PASSWORD CHANGE
          </h3>

          <div>
            <label className="block text-sm font-medium">
              Current Password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              New Password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={hanldeUpdateUser}
            className="bg-black text-white py-2 px-6 rounded-md"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
