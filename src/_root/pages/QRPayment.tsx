import React, { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { getPaymentStatus } from "@/services/PaymentService";
import { useToast } from "@/hooks/use-toast";
import {
  Copy,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Disc3,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const DEFAULT_BANK_INFO = {
  bankName: "MBBank (Ngân Hàng Quân Đội)",
  accountNumber: "0901338619",
  accountHolder: "CONG TY TNHH VOC RECORDS VIETNAM",
  branch: "Chi nhánh Đống Đa - Hà Nội",
};

const QRPayment: React.FC = () => {
  const { amount } = useParams<{ amount: string }>();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-RECENT";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [countdown, setCountdown] = useState<number>(300); // 5 minutes
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const numericAmount = amount ? parseInt(amount, 10) : 500000;
  const transferContent = `VOC ${orderId}`;

  // Generate dynamic VietQR URL (MB Bank / Standard Quicklink)
  const qrUrl = `https://img.vietqr.io/image/MB-0901338619-compact2.png?amount=${numericAmount}&addInfo=${encodeURIComponent(
    transferContent
  )}&accountName=${encodeURIComponent(DEFAULT_BANK_INFO.accountHolder)}`;

  // Poll Payment Status
  const checkStatus = useCallback(async () => {
    if (!orderId || isPaid) return;
    try {
      const res = await getPaymentStatus(orderId);
      const data = res?.data?.data || res?.data;
      if (data && (data.status === "PAID" || data.status === "SUCCESS")) {
        setIsPaid(true);
        toast({
          title: "Thanh toán thành công! 🎉",
          description: "Đơn hàng của bạn đã được ghi nhận thanh toán.",
        });
        setTimeout(() => {
          navigate(`/order-details/${orderId}`);
        }, 3000);
      }
    } catch {
      // Ignored polling errors
    }
  }, [orderId, isPaid, navigate, toast]);

  useEffect(() => {
    const pollInterval = setInterval(checkStatus, 3000);
    return () => clearInterval(pollInterval);
  }, [checkStatus]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0 || isPaid) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, isPaid]);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast({
      title: "Đã sao chép!",
      description: `${fieldName}: ${text}`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#121316] text-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      
      {/* Brand Header */}
      <div className="text-center space-y-2 mb-8">
        <Link to="/" className="inline-flex items-center gap-2">
          <Disc3 className="w-8 h-8 text-amber-400 animate-spin-slow" />
          <span className="text-2xl font-black font-display text-white">
            VOC <span className="text-amber-400">RECORDS</span>
          </span>
        </Link>
        <p className="text-xs text-zinc-400 uppercase tracking-widest">
          Cổng Thanh Toán VietQR Tự Động 24/7
        </p>
      </div>

      <div className="w-full max-w-3xl bg-[#1A1D24] border border-zinc-700 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
        
        {isPaid ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-black font-display text-white">
              Thanh Toán Thành Công!
            </h2>
            <p className="text-sm text-zinc-300 max-w-md mx-auto">
              Cảm ơn bạn đã đặt hàng tại Vọc Records. Hệ thống đang chuyển hướng tới trang chi tiết đơn hàng #{orderId}...
            </p>
            <ClipLoader size={24} color="#10B981" />
          </div>
        ) : (
          <>
            {/* Countdown Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-zinc-900/90 border border-zinc-800 p-4 rounded-xl gap-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
                    Thời gian giữ đơn & mã QR còn:
                  </p>
                  <p className="text-xl font-black text-amber-400 font-mono">
                    {formatTimer(countdown)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-zinc-400">Số tiền cần chuyển:</span>
                <p className="text-2xl font-black text-white font-display">
                  {numericAmount.toLocaleString()} ₫
                </p>
              </div>
            </div>

            {/* QR Code and Bank Details 2-Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* QR Image Box */}
              <div className="bg-white p-4 rounded-xl border-4 border-amber-400/80 shadow-2xl flex flex-col items-center justify-center space-y-3">
                <img
                  src={qrUrl}
                  alt="Mã VietQR"
                  className="w-full max-w-[260px] aspect-square object-contain rounded"
                />
                <p className="text-[11px] font-bold text-zinc-800 text-center uppercase tracking-wider">
                  Quét mã qua mọi App Ngân hàng hoặc MoMo
                </p>
              </div>

              {/* Manual Transfer Information */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-400">Ngân hàng thụ hưởng:</span>
                  <p className="font-bold text-white text-sm mt-0.5">{DEFAULT_BANK_INFO.bankName}</p>
                </div>

                <div>
                  <span className="text-zinc-400">Chủ tài khoản:</span>
                  <p className="font-bold text-white text-sm mt-0.5">{DEFAULT_BANK_INFO.accountHolder}</p>
                </div>

                <div className="flex items-center justify-between bg-zinc-900 p-3 rounded border border-zinc-800">
                  <div>
                    <span className="text-zinc-400">Số tài khoản:</span>
                    <p className="font-mono font-bold text-amber-400 text-base">
                      {DEFAULT_BANK_INFO.accountNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(DEFAULT_BANK_INFO.accountNumber, "Số tài khoản")}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded font-bold text-xs flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedField === "Số tài khoản" ? "Đã chép" : "Sao chép"}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between bg-zinc-900 p-3 rounded border border-zinc-800">
                  <div>
                    <span className="text-zinc-400">Nội dung chuyển khoản (Bắt buộc):</span>
                    <p className="font-mono font-bold text-amber-400 text-base">
                      {transferContent}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(transferContent, "Nội dung")}
                    className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded font-bold text-xs flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedField === "Nội dung" ? "Đã chép" : "Sao chép"}</span>
                  </button>
                </div>

                <div className="text-[11px] text-zinc-400 space-y-1 bg-amber-950/20 border border-amber-500/20 p-3 rounded">
                  <p className="font-bold text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Lưu ý quan trọng:
                  </p>
                  <p>
                    Vui lòng giữ nguyên nội dung chuyển khoản <b>{transferContent}</b> để hệ thống tự động kích hoạt đơn hàng trong 1-2 phút.
                  </p>
                </div>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <Link
                to="/checkout"
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay về chỉnh sửa thông tin</span>
              </Link>

              <button
                onClick={() => navigate(`/order-details/${orderId}`)}
                className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-none font-bold text-xs uppercase"
              >
                Tôi đã chuyển khoản xong &gt;
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default QRPayment;
