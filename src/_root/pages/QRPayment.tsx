import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createQRPayment } from "@/services/PaymentService";
import { Loader } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QRPayment = () => {
  const param = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [QRImageUrl, setQRImageUrl] = useState("");
  const [countdown, setCountdown] = useState(() => {
    const savedCountdown = localStorage.getItem("countdown");
    return savedCountdown ? parseInt(savedCountdown, 10) : 300; // 5 minutes in seconds
  });

  const generateQR = async () => {
    console.log(typeof param.amount);

    const response = await createQRPayment(param.amount || "");
    console.log(response);

    if (response?.data.data.data.qrDataURL) {
      setQRImageUrl(response.data.data.data.qrDataURL);
    } else {
      toast({
        variant: "destructive",
        title: "Failed to generate QR code",
        description: "Turning back to the checkout page",
        duration: 5000,
      });
    }
  };

  useMemo(() => {
    generateQR();
  }, [param.amount]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          localStorage.removeItem("countdown");
          setQRImageUrl(""); // Clear the QR code
          navigate("/");
          return 0;
        }
        const newCountdown = prevCountdown - 1;
        localStorage.setItem("countdown", newCountdown.toString());
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const handleNavigateToCheckout = () => {
    localStorage.removeItem("countdown");
    navigate("/checkout");
  };

  const handleCancelPayment = () => {
    localStorage.removeItem("countdown");
    navigate("/");
  };

  return (
    <div className="w-full items-center flex flex-col justify-center space-y-3">
      <div className="bg-black px-8 py-6 rounded-md">
        <img
          src="https://vocrecords.vn/wp-content/uploads/2020/10/Logo_ngang.png"
          alt=""
          className="w-[151x] h-[25px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex flex-col space-y-4">
          <AlertDialog>
            <AlertDialogTrigger className="p-0">
              <Button className="text-xl px-11 py-8 w-full">
                Hủy thanh toán
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn sẽ hủy thanh toán hiện tại khi nhấn continue
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancelPayment}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            onClick={handleNavigateToCheckout}
            className="text-xl px-11 py-8"
          >
            Quay về trang thanh toán
          </Button>
        </div>
        {QRImageUrl ? (
          <img src={QRImageUrl} alt="QR Code" />
        ) : (
          <>
            <Loader className="ml-4" />
          </>
        )}
      </div>
      <div className="mt-4 text-xl font-bold text-center">
        Thời gian còn lại: {formatTime(countdown)}
      </div>
    </div>
  );
};

export default QRPayment;
