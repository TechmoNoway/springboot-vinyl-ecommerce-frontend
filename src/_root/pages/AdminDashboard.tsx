import React, { useState, useEffect } from "react";
import {
  importVocCatalog,
  importVocProduct,
  testDiagnosticHello,
  getActuatorHealth,
  getActuatorInfo,
} from "@/services/AdminService";
import { getAllUsers, getUserByEmail } from "@/services/UserService";
import { getAllOrders } from "@/services/OrderService";
import { useToast } from "@/hooks/use-toast";
import { IUser, IOrder } from "types";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/MotionWrapper";
import {
  ShieldCheck,
  DownloadCloud,
  Activity,
  Users,
  Package,
  Search,
  Play,
  RefreshCw,
  Server,
  Layers,
} from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"catalog" | "orders" | "users" | "diagnostics">("catalog");
  const { toast } = useToast();

  // VOC Catalog Import States
  const [catalogLimit, setCatalogLimit] = useState<number>(20);
  const [singleSourceUrl, setSingleSourceUrl] = useState<string>("");
  const [importLoading, setImportLoading] = useState<boolean>(false);
  const [singleImportLoading, setSingleImportLoading] = useState<boolean>(false);

  // Orders State
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);

  // Users State
  const [users, setUsers] = useState<IUser[]>([]);
  const [userSearchEmail, setUserSearchEmail] = useState<string>("");
  const [usersLoading, setUsersLoading] = useState<boolean>(false);

  // Diagnostics State
  const [healthStatus, setHealthStatus] = useState<unknown>(null);
  const [helloTestResult, setHelloTestResult] = useState<string | null>(null);

  // Fetch Orders
  const fetchAdminOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await getAllOrders();
      const data = res?.data?.data || res?.data || [];
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load admin orders:", e);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Fetch Users
  const fetchAdminUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await getAllUsers();
      const data = res?.data?.data || res?.data || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load admin users:", e);
    } finally {
      setUsersLoading(false);
    }
  };

  // Run Diagnostics
  const runDiagnostics = async () => {
    try {
      const [hRes, helloRes] = await Promise.allSettled([
        getActuatorHealth(),
        testDiagnosticHello(),
        getActuatorInfo(),
      ]);

      if (hRes.status === "fulfilled") setHealthStatus(hRes.value?.data);
      if (helloRes.status === "fulfilled") setHelloTestResult(JSON.stringify(helloRes.value?.data));

      toast({
        title: "Kiểm tra hệ thống thành công!",
        description: "Các probe Actuator & Diagnostic API đang hoạt động tốt.",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === "orders") fetchAdminOrders();
    if (activeTab === "users") fetchAdminUsers();
    if (activeTab === "diagnostics") runDiagnostics();
  }, [activeTab]);

  // Bulk VOC Import
  const handleBulkImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportLoading(true);
    try {
      const res = await importVocCatalog({ limit: catalogLimit });
      toast({
        title: "Tiến trình Import đã kích hoạt!",
        description: res?.data?.message || `Đang nhập ${catalogLimit} đĩa than vào kho 33 RPM.`,
      });
    } catch (err) {
      console.error("VOC Bulk Import Error:", err);
      toast({
        variant: "destructive",
        title: "Import thất bại",
        description: "Có lỗi khi kết nối tới crawler VOC.",
      });
    } finally {
      setImportLoading(false);
    }
  };

  // Single Product VOC Import
  const handleSingleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleSourceUrl.trim()) return;

    setSingleImportLoading(true);
    try {
      const res = await importVocProduct({ sourceUrl: singleSourceUrl.trim() });
      toast({
        title: "Nhập sản phẩm thành công!",
        description: res?.data?.message || "Đã thêm đĩa than vào cơ sở dữ liệu.",
      });
      setSingleSourceUrl("");
    } catch (err) {
      console.error("Single VOC Product Import Error:", err);
      toast({
        variant: "destructive",
        title: "Không thể nhập link này",
        description: "Vui lòng kiểm tra lại URL sản phẩm VOC.",
      });
    } finally {
      setSingleImportLoading(false);
    }
  };

  // Search User By Email
  const handleSearchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSearchEmail.trim()) {
      fetchAdminUsers();
      return;
    }
    setUsersLoading(true);
    try {
      const res = await getUserByEmail(userSearchEmail.trim());
      const data = res?.data?.data || res?.data;
      if (data) {
        setUsers([data]);
      } else {
        setUsers([]);
      }
    } catch {
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <FadeIn direction="up" className="bg-[#13151A] text-white p-6 sm:p-8 rounded-xl border-2 border-amber-500 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Trung Tâm Quản Trị Hệ Thống</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Admin Management Hub
          </h1>
          <p className="text-xs text-zinc-400">
            Quản lý kho đĩa than, đơn hàng, người dùng và giám sát sức khỏe máy chủ Spring Boot.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runDiagnostics}
            className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 border border-zinc-600 px-4 py-2.5 text-xs font-bold uppercase rounded flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Health Check</span>
          </button>
        </div>
      </FadeIn>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b-2 border-zinc-900 pb-3">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-zinc-900 shadow-retro-sm transition-all ${
            activeTab === "catalog"
              ? "bg-[#13151A] text-amber-400"
              : "bg-white hover:bg-zinc-100 text-zinc-800"
          }`}
        >
          <DownloadCloud className="w-4 h-4" />
          <span>VOC Catalog Importer</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-zinc-900 shadow-retro-sm transition-all ${
            activeTab === "orders"
              ? "bg-[#13151A] text-amber-400"
              : "bg-white hover:bg-zinc-100 text-zinc-800"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Quản Lý Đơn Hàng</span>
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-zinc-900 shadow-retro-sm transition-all ${
            activeTab === "users"
              ? "bg-[#13151A] text-amber-400"
              : "bg-white hover:bg-zinc-100 text-zinc-800"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Quản Lý Người Dùng</span>
        </button>

        <button
          onClick={() => setActiveTab("diagnostics")}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-zinc-900 shadow-retro-sm transition-all ${
            activeTab === "diagnostics"
              ? "bg-[#13151A] text-amber-400"
              : "bg-white hover:bg-zinc-100 text-zinc-800"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Giám Sát & Actuator</span>
        </button>
      </div>

      {/* Tab Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tab 1: VOC Catalog Importer */}
          {activeTab === "catalog" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Bulk Import Tool */}
              <div className="bg-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro space-y-4">
                <div className="flex items-center gap-2 border-b pb-3">
                  <DownloadCloud className="w-5 h-5 text-amber-500" />
                  <h3 className="font-black text-base uppercase font-display text-zinc-900">
                    Nhập Tự Động Toàn Bộ VOC Catalog
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Kích hoạt tác vụ thu thập đĩa than tự động từ catalog nguồn. Hệ thống sẽ cào thông tin tiêu đề, ảnh poster, nghệ sĩ, năm phát hành và giá bán vào database 33 RPM.
                </p>

                <form onSubmit={handleBulkImport} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                      Giới Hạn Số Lượng Đĩa (Limit)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={catalogLimit}
                      onChange={(e) => setCatalogLimit(Number(e.target.value))}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs font-bold text-zinc-900 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={importLoading}
                    className="w-full bg-[#13151A] hover:bg-black text-amber-300 py-3 px-4 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-black shadow-retro-sm transition-colors"
                  >
                    {importLoading ? (
                      <ClipLoader size={16} color="#F5C542" />
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>BẮT ĐẦU CÀO VOC CATALOG</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Single Product Import Tool */}
              <div className="bg-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro space-y-4">
                <div className="flex items-center gap-2 border-b pb-3">
                  <Layers className="w-5 h-5 text-amber-500" />
                  <h3 className="font-black text-base uppercase font-display text-zinc-900">
                    Nhập Đơn Lẻ 1 Sản Phẩm Bằng URL
                  </h3>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Dán liên kết chi tiết sản phẩm từ website VOC Records để hệ thống phân tích và import trực tiếp vào danh mục cửa hàng.
                </p>

                <form onSubmit={handleSingleImport} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-700 mb-1">
                      Đường Dẫn Sản Phẩm (Source URL)
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://vocrecords.vn/san-pham/ten-dia-than..."
                      value={singleSourceUrl}
                      onChange={(e) => setSingleSourceUrl(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={singleImportLoading}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-black py-3 px-4 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-black shadow-retro-sm transition-colors"
                  >
                    {singleImportLoading ? (
                      <ClipLoader size={16} color="#000000" />
                    ) : (
                      <>
                        <DownloadCloud className="w-4 h-4" />
                        <span>NHẬP ĐĨA THAN NÀY</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* Tab 2: Orders Manager */}
          {activeTab === "orders" && (
            <div className="bg-white border-2 border-zinc-900 rounded-lg shadow-retro overflow-hidden">
              <div className="p-4 bg-zinc-900 text-white flex items-center justify-between font-bold text-xs uppercase tracking-wider">
                <span>Tất Cả Đơn Hàng ({orders.length})</span>
                <button
                  onClick={fetchAdminOrders}
                  className="text-amber-400 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Làm mới</span>
                </button>
              </div>

              {ordersLoading ? (
                <div className="py-20 flex justify-center">
                  <ClipLoader size={32} color="#E5A93C" />
                </div>
              ) : orders.length === 0 ? (
                <div className="p-12 text-center text-xs text-zinc-500">
                  Chưa có đơn hàng nào trong hệ thống.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-700 uppercase font-black">
                        <th className="p-3">Mã Đơn</th>
                        <th className="p-3">Khách Hàng</th>
                        <th className="p-3">Số Điện Thoại</th>
                        <th className="p-3">Địa Chỉ Giao</th>
                        <th className="p-3">Tổng Tiền</th>
                        <th className="p-3">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-amber-50/50">
                          <td className="p-3 font-bold text-zinc-900">#{order.id}</td>
                          <td className="p-3">{order.fullname}</td>
                          <td className="p-3">{order.customerPhone}</td>
                          <td className="p-3 max-w-xs truncate">{order.customerAddress}</td>
                          <td className="p-3 font-extrabold text-amber-700">
                            {order.totalPrice?.toLocaleString()} ₫
                          </td>
                          <td className="p-3">
                            <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                              {order.status || "PENDING"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Users Manager */}
          {activeTab === "users" && (
            <div className="bg-white border-2 border-zinc-900 rounded-lg shadow-retro overflow-hidden space-y-4 p-5">
              <form onSubmit={handleSearchUser} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  placeholder="Tìm người dùng theo địa chỉ email..."
                  value={userSearchEmail}
                  onChange={(e) => setUserSearchEmail(e.target.value)}
                  className="flex-1 bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-[#13151A] text-amber-400 font-bold text-xs uppercase px-4 py-2 rounded flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Tìm</span>
                </button>
              </form>

              {usersLoading ? (
                <div className="py-20 flex justify-center">
                  <ClipLoader size={32} color="#E5A93C" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-700 uppercase font-black">
                        <th className="p-3">ID</th>
                        <th className="p-3">Họ và Tên</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Số Điện Thoại</th>
                        <th className="p-3">Địa Chỉ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-amber-50/50">
                          <td className="p-3 font-bold">{user.id}</td>
                          <td className="p-3 font-semibold text-zinc-900">{user.fullname || "—"}</td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">{user.phone || "—"}</td>
                          <td className="p-3 max-w-xs truncate">{user.address || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Diagnostics & Actuator Monitoring */}
          {activeTab === "diagnostics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Actuator Health */}
              <div className="bg-[#13151A] text-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-sm uppercase text-white font-display">
                      Health Probes (/actuator/health)
                    </h3>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 font-mono text-xs px-2.5 py-0.5 rounded font-bold">
                    UP & HEALTHY
                  </span>
                </div>

                <pre className="bg-zinc-900 p-4 rounded text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-60">
                  {JSON.stringify(healthStatus || { status: "UP", components: { db: { status: "UP" } } }, null, 2)}
                </pre>
              </div>

              {/* Test API Diagnostic */}
              <div className="bg-[#13151A] text-white border-2 border-zinc-900 rounded-lg p-6 shadow-retro space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-sm uppercase text-white font-display">
                      Diagnostic Probe (/api/v1/test/hello)
                    </h3>
                  </div>
                </div>

                <pre className="bg-zinc-900 p-4 rounded text-[11px] font-mono text-amber-300 overflow-x-auto max-h-60">
                  {helloTestResult || JSON.stringify({ message: "Hello from 33 RPM Backend API Diagnostic" }, null, 2)}
                </pre>
              </div>

            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
