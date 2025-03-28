import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { updateUserState } from "@/redux/authSlice";
import {
  updateUserInfo,
  changePassword,
} from "@/services/UserService";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUpdateUser, ICurrentUser } from "types";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<IUpdateUser>({
    id: 0,
    email: "",
    phone: "",
    gender: "",
    fullname: "",
    address: "",
    birthday: undefined,
  });
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const currentUser = useSelector(
    (state: ICurrentUser) => state.auth
  );
  const navigate = useNavigate();

  const hanldeUpdateUser = async () => {
    const response = await updateUserInfo(userProfile);

    if (response?.data.success === true) {
      dispatch(updateUserState(userProfile));
      toast({
        variant: "default",
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

  const handleChangePassword = async () => {
    if (
      changePasswordForm.newPassword !==
      changePasswordForm.confirmNewPassword
    ) {
      toast({
        variant: "destructive",
        title: "Opps! Something went wrong",
        description:
          "New password and confirm password do not match.",
      });
      return;
    }

    const requestForm = {
      userID: userProfile.id,
      currentPassword: changePasswordForm.currentPassword,
      newPassword: changePasswordForm.newPassword,
    };

    const response = await changePassword(requestForm);

    if (response?.data.success === true) {
      setChangePasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast({
        variant: "default",
        title: "Success!",
        description: "Change password successfully.",
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

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setUserProfile({ ...userProfile, [name]: value });
    }
  };

  const onPasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setChangePasswordForm({ ...changePasswordForm, [name]: value });
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
    <>
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
          name="phone"
          onChange={onPhoneChange}
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
          inputMode="numeric"
          pattern="[0-9]*"
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
                {userProfile.birthday ? (
                  format(new Date(userProfile.birthday), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}

                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                selected={
                  userProfile.birthday
                    ? new Date(userProfile.birthday)
                    : undefined
                }
                onDayClick={(date) =>
                  setUserProfile({
                    ...userProfile,
                    birthday: date,
                  })
                }
                mode="default"
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
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
            onValueChange={(value) => onSelectChange("gender", value)}
            value={userProfile.gender}
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

      <button
        onClick={hanldeUpdateUser}
        className="bg-black text-white py-2 px-6 rounded-md"
      >
        SAVE CHANGES
      </button>

      {/* Password Change Section */}
      <h3 className="font-semibold text-gray-700 mt-14 mb-2">
        PASSWORD CHANGE
      </h3>

      <div>
        <label className="block text-sm font-medium">
          Current Password (leave blank to leave unchanged)
        </label>
        <input
          type="password"
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
          name="currentPassword"
          value={changePasswordForm.currentPassword}
          onChange={onPasswordInputChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          New Password (leave blank to leave unchanged)
        </label>
        <input
          type="password"
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
          name="newPassword"
          value={changePasswordForm.newPassword}
          onChange={onPasswordInputChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Confirm New Password
        </label>
        <input
          type="password"
          className="w-full border rounded-md px-3 py-2 mt-1 mb-4 bg-white"
          name="confirmNewPassword"
          value={changePasswordForm.confirmNewPassword}
          onChange={onPasswordInputChange}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleChangePassword}
        className="bg-black text-white py-2 px-6 rounded-md"
      >
        SAVE PASSWORD
      </button>
    </>
  );
};

export default AccountDetails;
