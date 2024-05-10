import { useEffect, useState } from "react";
import Link from "next/link";
import BottomTabNav from "@components/bottomTabNav";

export default function Search() {
  const [list1, setList1] = useState([]);
  const get1 = async () => {
    try {
      const res = await fetch(
        `/public-api/B553530/eep/EEP_01_LIST?serviceKey=${process.env.NEXT_PUBLIC_API_KEY}&apiType=json`
      );
      const json = await res.json();
      const item = json.response.body.items.item;
      setList1(item);
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
    get1();
  }, []);

  return (
    <div className="overflow-y-auto bg-[#EFF1F4] p-[16px]">
      <div className="flex flex-col gap-[16px]">
        {list1.map((item) => (
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

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
