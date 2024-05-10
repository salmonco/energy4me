import BottomTabNav from "@components/bottomTabNav";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROP } from "./search";
import useIntersect from "@hooks/useIntersect";

/*
에너지소비효율
[1등급]
- 냉장고 : EEP_12_LIST (상업용, 보류), EEP_20_LIST
- 김치냉장고 : EEP_13_LIST
- 드럼세탁기 : EEP_06_LIST
- 벽걸이 에어컨
- 냉온수기 : EEP_16_LIST, EEP_30_LIST (순간식) (보류)
- 전기밭솥 : EEP_11_LIST
- 공기청정기 : EEP_08_LIST
- TV
- 제습기 : EEP_19_LIST
- 의류건조기

[1~2등급]
- 일반세탁기 : EEP_01_LIST

[1~3등급]
- 벽걸이 외 에어컨
- 진공청소기 : EEP_05_LIST
*/
const POWER_GRADE = {
  EEP_06_LIST: [1],
  EEP_11_LIST: [1],
  EEP_20_LIST: [1],
  EEP_13_LIST: [1],
  EEP_08_LIST: [1],
  EEP_19_LIST: [1],
  EEP_01_LIST: [1, 2],
  EEP_05_LIST: [1, 2, 3],
};

export default function Power() {
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const page = useRef(1);

  const [list, setList] = useState([]);

  const [sortOpen, setSortOpen] = useState(false);
  const SORT_MENU = [
    { idx: 2, label: "일반세탁기", path: "EEP_01_LIST" },
    { idx: 3, label: "드럼세탁기", path: "EEP_06_LIST" },
    { idx: 0, label: "냉장고", path: "EEP_20_LIST" },
    { idx: 1, label: "김치냉장고", path: "EEP_13_LIST" },
    { idx: 4, label: "진공청소기", path: "EEP_05_LIST" },
    { idx: 5, label: "공기청정기", path: "EEP_08_LIST" },
    { idx: 6, label: "제습기", path: "EEP_19_LIST" },
    { idx: 7, label: "전기밥솥", path: "EEP_11_LIST" },
  ];
  const [selectedSort, setSelectedSort] = useState(0);
  const sortIdx = useRef(null);

  const getData = async () => {
    try {
      setLoading(true); // 데이터 요청 시작 시 로딩 상태 설정
      const res = await fetch(
        `/public-api/B553530/eep/${SORT_MENU[selectedSort].path}?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&apiType=json`
      );
      const json = await res.json();
      const item = json.response.body.items.item;
      const filteredList = item.filter((v) =>
        POWER_GRADE[SORT_MENU[selectedSort].path].includes(+v.GRADE)
      );
      setList((prev) => [...prev, ...filteredList]);
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
      </div>

      <div className="flex flex-col gap-[16px]">
        {list.length ? (
          list.map((item) => (
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
                              parseInt(String(item[v.prop])) * 0.1 * cnt
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

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
