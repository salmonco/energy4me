import Link from "next/link";
import BottomTabNav from "@components/bottomTabNav";

export default function Home() {
  return (
    <div className="pt-[28px] pb-[80px] px-[16px] overflow-y-auto">
      <div>
        <p className="leading-[3rem] text-[1.4rem]">
          에너지소비효율 등급이란,
          <br />
          한국에너지공단의 에너지소비효율등급 표시제도에 따라, 가전 제품이나
          전자 제품의 에너지 사용량이나 에너지 소비 효율을 1부터 5까지의
          등급으로 구분해 표시한 것입니다.
        </p>
        <Link href={"https://en-ter.co.kr/support/main/main.do"} target="blank">
          <div className="py-[5px] px-[10px] rounded-[10px] bg-[#E2FAE4]">
            한전 고효율 가전제품
            <br />
            구매비용 지원사업 바로가기
          </div>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
