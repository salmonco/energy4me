import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BottomTabNav from "@components/bottomTabNav";
import Image from "next/image";
import useIntersect from "@hooks/useIntersect";

// 가전제품
export const SORT_MENU = [
  { idx: 0, label: "일반세탁기", path: "EEP_01_LIST" },
  { idx: 1, label: "드럼세탁기", path: "EEP_06_LIST" },
  { idx: 2, label: "냉장고", path: "EEP_20_LIST" },
  { idx: 3, label: "김치냉장고", path: "EEP_13_LIST" },
  { idx: 4, label: "진공청소기", path: "EEP_05_LIST" },
  { idx: 5, label: "공기청정기", path: "EEP_08_LIST" },
  { idx: 6, label: "제습기", path: "EEP_19_LIST" },
  { idx: 7, label: "전기밥솥", path: "EEP_11_LIST" },
];

// 에너지소비효율 등급
const FILTER_MENU = [
  { idx: 0, label: "1등급" },
  { idx: 1, label: "2등급" },
  { idx: 2, label: "3등급" },
  { idx: 3, label: "4등급" },
  { idx: 4, label: "5등급" },
];

// 공통: 업체명칭, 모델명, 출하예정일, 효율등급
export const PROP = [
  {
    idx: "EEP_01_LIST",
    data: [
      { label: "표준세탁용량", prop: "STANDARD_CAPA" },
      { label: "세탁 소비전력량", prop: "CONS_PWR", cnt: 60 },
      { label: "소비자효율등급지표", prop: "R" },
    ],
  },
  {
    idx: "EEP_06_LIST",
    data: [
      { label: "표준세탁용량", prop: "STANDARD_CAPA" },
      { label: "세탁 소비전력량", prop: "CONS_PWR", cnt: 60 },
      { label: "소비자효율등급지표", prop: "R" },
    ],
  },
  {
    idx: "EEP_20_LIST",
    data: [
      { label: "월간 소비전력량", prop: "MONTH_CONS_PWR", cnt: 12 },
      { label: "용량", prop: "CAPA" },
    ],
  },
  {
    idx: "EEP_13_LIST",
    data: [
      { label: "김치저장실 유효내용적", prop: "KIMCHI_AVAIL_CAPA" },
      { label: "월간 소비전력량", prop: "MONTH_CONS_PWR", cnt: 12 },
      { label: "소비자효율등급지표", prop: "R" },
    ],
  },
  {
    idx: "EEP_05_LIST",
    data: [
      { label: "측정소비전력", prop: "MEAS_CONS_PWR", cnt: 60 },
      { label: "최대흡입일률", prop: "MAX_CAPA" },
    ],
  },
  {
    idx: "EEP_08_LIST",
    data: [
      { label: "표준사용면적", prop: "STANDARD_CONS_AREA" },
      { label: "탈취효율", prop: "DEODORIZATION_EFFIC" },
      { label: "대기전력", prop: "WAIT_PWR", cnt: 60 },
      { label: "소비전력", prop: "CONS_PWR", cnt: 60 },
      { label: "최대무부하 모드소비전력", prop: "MAX_WAIT_CONS_PWR" },
    ],
  },
  {
    idx: "EEP_19_LIST",
    data: [
      { label: "제습효율", prop: "DHF_EFFIC" },
      { label: "정격제습능력", prop: "RATE_DHF_ABTY" },
      { label: "월간에너지비용", prop: "YEAR_COST" },
    ],
  },
  {
    idx: "EEP_11_LIST",
    data: [
      { label: "정격소비전력", prop: "PROP_CONS_PWR", cnt: 60 },
      { label: "최대가용인원", prop: "MAX_CAPA" },
      { label: "대기전력", prop: "WAIT_PWR", cnt: 60 },
    ],
  },
];

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const page = useRef(1);

  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(0);
  const sortIdx = useRef(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const filterIdx = useRef(null);
  const [isFilterApply, setIsFilterApply] = useState(false);

  const getData = async () => {
    try {
      setLoading(true); // 데이터 요청 시작 시 로딩 상태 설정
      const res = await fetch(
        `/public-api/B553530/eep/${SORT_MENU[selectedSort].path}?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&apiType=json&pageNo=${page.current}`
      );
      const json = await res.json();
      const item = json.response.body.items.item;
      setList((prev) => [...prev, ...item]);

      if (selectedFilter !== null) {
        const filteredList = item.filter(
          (v) => +v.GRADE === selectedFilter + 1
        );
        setFilteredList((prev) => [...prev, ...filteredList]);
      }
      if (item.length === 0) setIsLastPage(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // 데이터 요청 완료 시 로딩 상태 제거
    }
  };

  const initPage = () => {
    page.current = 1;
    setIsLastPage(false);
    setList([]);
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
      initPage();
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
  }, [filterOpen]);

  // useIntersect훅에 타겟 감지 시 실행해야할 콜백함수 전달
  const ref = useIntersect((entry, { threshold = 1 }) => {
    // 불러올 데이터가 더 이상 없는지 체크
    if (loading || isLastPage) return;
    page.current++;
    getData();
  });

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
        {(isFilterApply ? filteredList : list).length ? (
          (isFilterApply ? filteredList : list).map((item) => (
            <Link
              key={Math.random()}
              href={getSearchUrl(item.ENTE_TERM, item.MODEL_TERM)}
              target="blank"
            >
              <div className="p-[16px] rounded-[5px] bg-white flex flex-col gap-[8px]">
                <div className="flex gap-[8px] items-center font-[Pretendard-Medium]">
                  <span>{item.MODEL_TERM}</span>
                  <span>·</span>
                  <span>{item.ENTE_TERM}</span>
                  {/* <span>제조원: {item.MANUFAC_MAN_TERM}</span> */}
                </div>
                <div className="flex gap-[8px] items-center font-[Pretendard-Medium]">
                  <span
                    className={`${
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
                  <span>·</span>
                  <span className="text-[1.2rem] text-[#7F828C]">
                    {item.SHIP_PRARG_DD}
                  </span>
                </div>
                <div className="flex flex-col gap-[4px] text-[1.4rem]">
                  {PROP.find(
                    (p) => p.idx === SORT_MENU[selectedSort].path
                  ).data.map((v) => (
                    <div
                      key={Math.random()}
                      className="flex gap-[4px] items-center"
                    >
                      <span>
                        {v.label}: {item[v.prop]}
                      </span>
                      {v.cnt && (
                        <div className="flex gap-[4px] items-center">
                          <span>·</span>
                          <span className="font-[Pretendard-Medium]">
                            약{" "}
                            {Math.round(parseInt(String(item[v.prop])) * 0.1)}원
                          </span>
                          <span>·</span>
                          <span className="font-[Pretendard-Medium]">
                            연간{" "}
                            {Math.round(
                              parseInt(String(item[v.prop])) * 0.1 * v.cnt
                            )}
                            원
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="pt-[200px] flex justify-center items-center">
            <p className="leading-[3rem] text-[1.4rem] text-[#7F828C] text-center">
              제품 데이터가 없어요.
            </p>
          </div>
        )}
        <div className={`w-full flex justify-center`} ref={ref}>
          {loading && (
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand"></div>
          )}
        </div>
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
