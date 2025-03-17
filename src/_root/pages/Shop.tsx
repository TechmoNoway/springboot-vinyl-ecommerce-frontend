import ProductList from "@/components/shared/ProductList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/services/CategoryService";
import { getAllProductsFilteredAndSorted } from "@/services/ProductService";
import { useCallback, useEffect, useState } from "react";
import { ICategoryList } from "types";

const STUDIO_NAMES = [
  "SONY_MUSIC",
  "HANSA",
  "MUSIC ON VINYL",
  "EVOSOUND",
  "CLEOPATRA",
  "COLUMBIA",
  "ISLAND RECORDS",
  "UNIVERSAL MUSIC GROUP",
];

const MANUFACTURE_YEARS = [
  2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
  2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
  1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989,
  1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978,
  1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967,
  1966, 1965, 1964, 1963, 1962, 1961, 1960,
];

const STOCK_STATUS = [
  "HẾT HÀNG",
  "PREORDER",
  "CÒN HÀNG",
  "LIÊN HỆ",
  "ĐANG VỀ",
];

const PLATFORMS = [
  "CASSETTE",
  "7INCH SINGLE",
  "ĐĨA VINTAGE",
  "ĐĨA MỚI",
];

const Shop = () => {
  const [state, setState] = useState({
    priceRange: [0, 10000000],
    currentPage: 1,
    itemsPerPage: 15,
    products: [],
    title: "",
    category: "",
    platform: "",
    stockStatus: "",
    studioName: "",
    manufactureYear: "",
    status: "",
    sortType: "DEFAULT",
    categories: [],
    totalPages: 0,
  });

  const handleGetProducts = useCallback(async () => {
    const response = await getAllProductsFilteredAndSorted(
      state.title,
      state.category,
      state.platform,
      state.stockStatus,
      state.studioName,
      state.manufactureYear,
      state.status,
      state.sortType
    );

    const currentProducts = response?.data.data.slice(
      (state.currentPage - 1) * state.itemsPerPage,
      state.currentPage * state.itemsPerPage
    );

    console.log(currentProducts);

    setState((prevState) => ({
      ...prevState,
      products: currentProducts,
      totalPages: Math.ceil(
        response?.data.data.length / state.itemsPerPage
      ),
    }));
  }, [
    state.title,
    state.category,
    state.platform,
    state.stockStatus,
    state.studioName,
    state.manufactureYear,
    state.status,
    state.sortType,
    state.currentPage,
    state.itemsPerPage,
  ]);

  const handleGetCategories = async () => {
    const response = await getAllCategories();
    console.log(response);

    setState((prevState) => ({
      ...prevState,
      categories: response?.data.data,
    }));
  };

  const handlePageChange = (page: number) => {
    setState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const handleStateItemChange = (
    stateItem: string,
    stateValue: string | number | boolean
  ) => {
    setState((prevState) => ({
      ...prevState,
      [stateItem]: stateValue,
      currentPage: 1, // Reset to first page when category changes
    }));
  };

  useEffect(() => {
    handleGetProducts();
  }, [
    handleGetProducts,
    state.currentPage,
    state.itemsPerPage,
    state.sortType,
    state.title,
    state.category,
    state.platform,
    state.stockStatus,
    state.studioName,
    state.manufactureYear,
    state.status,
  ]);

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-8 border-b pb-3 text-lg font-bold">
        <span className="border-b-4 border-gray-800 pb-2">
          ĐĨA THAN
        </span>
        <span className="text-gray-500">MÂM ĐĨA</span>
        <span className="text-gray-500">MÁY CASSETTE</span>
        <span className="text-gray-500">PHỤ KIỆN</span>
      </div>

      {/* Banner Section */}
      <div className="bg-gray-300 h-40 flex items-center justify-center text-2xl font-bold mt-4">
        ĐĨA THAN
      </div>

      {/* Filter Section */}
      <div className="mt-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {/* Filter Category Selects */}
        <Select
          onValueChange={(value) =>
            handleStateItemChange("category", value)
          }
        >
          <SelectTrigger className="px-3 py-6 border w-full rounded-none">
            <SelectValue placeholder="THỂ LOẠI" />
          </SelectTrigger>
          <SelectContent>
            {state.categories.map((item: ICategoryList, index) => (
              <SelectItem value={item.name} key={index}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Platform Selects */}
        <Select
          onValueChange={(value) =>
            handleStateItemChange("platform", value)
          }
        >
          <SelectTrigger className="px-3 py-6 border w-full rounded-none">
            <SelectValue placeholder="ĐỊNH DẠNG" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORMS.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Manufacture Year */}
        <Select
          onValueChange={(value) =>
            handleStateItemChange("manufactureYear", value)
          }
        >
          <SelectTrigger className="px-3 py-6 border w-full rounded-none">
            <SelectValue placeholder="THỜI KỲ" />
          </SelectTrigger>
          <SelectContent>
            {MANUFACTURE_YEARS.map((item, index) => (
              <SelectItem key={index} value={item.toString()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Stock Status */}
        <Select
          onValueChange={(value) =>
            handleStateItemChange("stockStatus", value)
          }
        >
          <SelectTrigger className="px-3 py-6 border w-full rounded-none">
            <SelectValue placeholder="TÌNH TRẠNG KHO" />
          </SelectTrigger>
          <SelectContent>
            {STOCK_STATUS.map((item, index) => (
              <SelectItem key={index} value={item.toString()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Studio Name */}
        <Select
          onValueChange={(value) =>
            handleStateItemChange("studioName", value)
          }
        >
          <SelectTrigger className="px-3 py-6 border w-full rounded-none">
            <SelectValue placeholder="HÃNG PHÁT HÀNH" />
          </SelectTrigger>
          <SelectContent>
            {STUDIO_NAMES.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="px-3 py-6 border w-full rounded-none">
            <SelectValue placeholder="TÂM TRẠNG" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="px-3 py-6 border w-full rounded-none">
            <SelectValue placeholder="PHÁT HÀNH" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="px-3 py-6 border w-full rounded-none">
            <SelectValue placeholder="TÌNH TRẠNG ĐĨA" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
      </div>

      {/* Price Range Slider */}
      <div className="mt-4 flex items-center space-x-4">
        <span className="font-bold">KHOẢNG GIÁ</span>
        <input
          type="range"
          min="0"
          max="10000000"
          value={state.priceRange[1]}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              priceRange: [0, Number(e.target.value)],
            }))
          }
          className="w-[700px] accent-yellow-500"
        />

        <span className="font-bold">
          {state.priceRange[1].toLocaleString()} đ
        </span>
      </div>

      {/* Sorting and View Controls */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center">
          <p className="font-semibold w-44 text-sm">SẮP XẾP BỞI:</p>
          <Select
            onValueChange={(value) =>
              handleStateItemChange("sortType", value)
            }
          >
            <SelectTrigger className="py-2 border border-black hover:border-black rounded-none">
              <SelectValue placeholder="THỨ TỰ MẶC ĐỊNH" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DEFAULT">THỨ TỰ MẶC ĐỊNH</SelectItem>
              <SelectItem value="ASC">GIÁ (TĂNG DẦN)</SelectItem>
              <SelectItem value="DESC">GIÁ (GIẢM DẦN)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-semibold w-16">
            HIỂN THỊ:
          </span>
          <Select
            onValueChange={(value) =>
              handleStateItemChange("itemsPerPage", value)
            }
            defaultValue="15"
          >
            <SelectTrigger className="border w-16 border-black hover:border-black rounded-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectContent>
          </Select>
          <button className="border p-2 bg-gray-200">🔲</button>
        </div>
      </div>

      {/* Product Grid */}
      <ProductList products={state.products} type="Horizontal" />

      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="text-base"
              onClick={() =>
                handlePageChange(Math.max(state.currentPage - 1, 1))
              }
            />
          </PaginationItem>
          {[...Array(state.totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                className="text-base"
                isActive={index + 1 === state.currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              className="text-base"
              onClick={() =>
                handlePageChange(
                  Math.min(state.currentPage + 1, state.totalPages)
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Shop;
