import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BottomTabNav from "@components/bottomTabNav";
import Image from "next/image";

export default function Search() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [sortOpen, setSortOpen] = useState(false);
  const SORT_MENU = [
    { idx: 0, label: "냉장고", path: "EEP_20_LIST" },
    { idx: 1, label: "김치냉장고", path: "EEP_13_LIST" },
    { idx: 2, label: "일반세탁기", path: "EEP_01_LIST" },
    { idx: 3, label: "드럼세탁기", path: "EEP_06_LIST" },
    { idx: 4, label: "진공청소기", path: "EEP_05_LIST" },
    { idx: 5, label: "공기청정기", path: "EEP_08_LIST" },
    { idx: 6, label: "제습기", path: "EEP_19_LIST" },
    { idx: 7, label: "전기밥솥", path: "EEP_11_LIST" },
  ];
  const [selectedSort, setSelectedSort] = useState(0);
  const sortIdx = useRef(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const FILTER_MENU = [
    { idx: 0, label: "1등급" },
    { idx: 1, label: "2등급" },
    { idx: 2, label: "3등급" },
    { idx: 3, label: "4등급" },
    { idx: 4, label: "5등급" },
  ];
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filterIdx = useRef(null);
  const [isFilterApply, setIsFilterApply] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch(
        `/public-api/B553530/eep/${SORT_MENU[selectedSort].path}?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&apiType=json`
      );
      const json = await res.json();
      const item = json.response.body.items.item;
      setList(item);

      if (selectedFilter !== null) {
        const filteredList = item.filter(
          (v) => +v.GRADE === selectedFilter + 1
        );
        setFilteredList(filteredList);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSearchUrl = (str, model) => {
    if (str === "LG전자(주)") {
      return `https://www.lge.co.kr/search/result?search=${model}`;
    }
    return "";
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const modalSort = document.querySelector("#modalSort");
    modalSort.addEventListener("click", (e) => {
      if (e.target === modalSort) {
        setSortOpen(false);
      }
    });

    const modalFilter = document.querySelector("#modalFilter");
    modalFilter.addEventListener("click", (e) => {
      if (e.target === modalFilter) {
        setFilterOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    if (sortOpen) return;
    const isOn = selectedSort !== sortIdx.current;
    if (isOn) {
      // initPage();
      getData();
      sortIdx.current = selectedSort;
    }
  }, [sortOpen]);

  useEffect(() => {
    if (filterOpen) return;
    const isOn =
      selectedFilter !== null && selectedFilter !== filterIdx.current;
    setIsFilterApply(isOn);

    if (isOn) {
      const prevList = [...list];
      const filteredList = prevList.filter(
        (v) => +v.GRADE === selectedFilter + 1
      );
      setFilteredList(filteredList);
    }
    // initPage();
  }, [filterOpen]);

  return (
    <div className="flex flex-col gap-[14px] pt-[28px] pb-[80px] px-[16px] bg-[#EFF1F4] overflow-y-auto">
      <div className="flex justify-between items-center">
        <button
          type="button"
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="w-[103px] h-[34px] p-[8px] flex gap-[10px] justify-between items-center bg-white rounded-[5px]"
          onClick={() => setSortOpen((prev) => !prev)}
        >
          <span className="text-[1.4rem] font-[Pretendard-Meidum]">
            {SORT_MENU[selectedSort].label}
          </span>
          <Image
            alt="toggle"
            src={require("@images/arrow_down-gray.svg")}
            width={16}
            height={16}
            priority
            className={`transition-all transform ${sortOpen && "-rotate-180"}`}
          />
        </button>
        <Image
          className="cursor-pointer"
          alt="filter"
          src={
            isFilterApply
              ? require("@images/filter-green.svg")
              : require("@images/filter-gray.svg")
          }
          width={24}
          height={24}
          priority
          onClick={() => setFilterOpen((prev) => !prev)}
        />
      </div>

      <div className="flex flex-col gap-[16px]">
        {(isFilterApply ? filteredList : list).map((item) => (
          <Link
            key={item.MODEL_TERM}
            href={getSearchUrl(item.ENTE_TERM, item.MODEL_TERM)}
            target="blank"
          >
            <div className="p-[16px] rounded-[5px] bg-white flex flex-col gap-[8px]">
              <div className="flex gap-[8px] items-center font-[Pretendard-Medium]">
                <span>{item.MODEL_TERM}</span>
                <span>·</span>
                <span>{item.ENTE_TERM}</span>
                {/* <span>제조원: {item.MANUFAC_MAN_TERM}</span> */}
                <span>·</span>
                <span className="text-[1.2rem] text-[#7F828C]">
                  {item.SHIP_PRARG_DD}
                </span>
              </div>
              <div className="flex flex-col gap-[4px] text-[1.4rem]">
                <span>표준세탁용량(kg): {item.STANDARD_CAPA}</span>
                <span>세탁시소비 전력량(1회)(wh): {item.CONS_PWR}</span>
                <span>
                  에너지소비효율 등급:{" "}
                  <span
                    className={`font-[Pretendard-Medium] ${
                      item.GRADE === 1
                        ? "text-[#8EC63F]"
                        : item.GRADE === 2
                        ? "text-[#D5E14D]"
                        : item.GRADE === 3
                        ? "text-[#FFF001]"
                        : item.GRADE === 4
                        ? "text-[#FAA634]"
                        : "text-[#EF3125]"
                    }`}
                  >
                    {item.GRADE}등급
                  </span>
                </span>
                <span>소비효율등급지표(WH/kg): {item.R}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        id="modalSort"
        className={`absolute top-0 left-0 w-full h-full z-20 bg-black/30 ${
          sortOpen || "hidden"
        }`}
      >
        <div id="dropdown" className="absolute bottom-0 left-0 w-full">
          <div className="flex flex-col gap-[16px] pt-[6px] pb-[14px] h-[272px] rounded-t-[20px] bg-white shadow-t-gray">
            <div className="self-center w-[53px] h-[4px] bg-[#D5D8DC] rounded-[2px]" />
            <ul
              aria-labelledby="dropdownDefaultButton"
              className="text-[1.4rem] font-[Pretendard-Medium] text-[#5A5E6A]"
            >
              <li className="py-[7.5px] px-[22px] text-[1.3rem] font-[Pretendard-Medium] text-[#9E9E9E]">
                가전제품
              </li>
              <div className="flex gap-[8px] flex-wrap px-[16px]">
                {SORT_MENU.map((v) => (
                  <li key={v.idx}>
                    <button
                      className={`shrink-0 min-w-[57px] h-[30px] px-[16px] rounded-full ${
                        selectedSort === v.idx
                          ? "text-white font-[Pretendard-Medium] bg-[#4FE45F]"
                          : "bg-[#E4E6EA] text-[#9DA0A8]"
                      }`}
                      type="button"
                      onClick={() => setSelectedSort(v.idx)}
                    >
                      {v.label}
                    </button>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div
        id="modalFilter"
        className={`absolute top-0 left-0 w-full h-full z-20 bg-black/30 ${
          filterOpen || "hidden"
        }`}
      >
        <div id="dropdown" className="absolute bottom-0 left-0 w-full">
          <div className="flex flex-col gap-[16px] pt-[6px] pb-[14px] h-[232px] rounded-t-[20px] bg-white shadow-t-gray">
            <div className="self-center w-[53px] h-[4px] bg-[#D5D8DC] rounded-[2px]" />
            <div className="flex flex-col gap-[8px] text-[1.4rem]">
              <span className="py-[7.5px] px-[22px] text-[1.3rem] font-[Pretendard-Medium] text-[#9E9E9E]">
                에너지소비효율 등급
              </span>
              <div className="flex gap-x-[8px] gap-y-[10px] flex-wrap px-[16px]">
                {FILTER_MENU.map((v) => (
                  <button
                    key={v.idx}
                    className={`shrink-0 min-w-[57px] h-[30px] px-[16px] rounded-full ${
                      selectedFilter === v.idx
                        ? "text-white font-[Pretendard-Medium] bg-[#4FE45F]"
                        : "bg-[#E4E6EA] text-[#9DA0A8]"
                    }`}
                    type="button"
                    onClick={() => {
                      if (selectedFilter === v.idx) {
                        setSelectedFilter(null);
                      } else {
                        setSelectedFilter(v.idx);
                      }
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
