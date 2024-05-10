import Link from "next/link";
import BottomTabNav from "@components/bottomTabNav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="pt-[28px] pb-[80px] px-[16px] overflow-y-auto flex flex-col gap-[60px]">
      <div className="pt-[30px] flex flex-col gap-[25px]">
        <Image
          alt=""
          src={require("@images/logo.svg")}
          width={200}
          height={200}
          className="h-auto"
        />
        <p className="font-[Pretendard-Bold] text-[2.2rem]">
          고효율 제품 검색은
          <br />
          <span className="text-brand">ENERGY4ME</span> 에서
        </p>
      </div>
      <div className="flex flex-col gap-[30px]">
        <p className="leading-[2.4rem] text-[1.4rem] break-keep">
          <span className="font-[Pretendard-bold]">에너지소비효율 등급</span>
          이란,
          <br />
          한국에너지공단의 에너지소비효율등급 표시제도에 따라,
          <br /> 가전 제품이나 전자 제품의 에너지 사용량이나 에너지 소비 효율을{" "}
          <span className="font-[Pretendard-bold]">1부터 5까지의 등급</span>
          으로 구분해 표시한 것입니다.
        </p>
        <p className="leading-[2.4rem] text-[1.4rem] break-keep">
          3등급 냉장고를 1등급 냉장고로 바꾸기만 하면 <br />
          평균{" "}
          <span className="font-[Pretendard-bold]">
            1시간 동안 약 80키로와트
          </span>
          를 절약할 수 있으며,
          <br />
          <span className="font-[Pretendard-bold]">
            가구당 약 21%의 에너지가 절감
          </span>
          됩니다.
        </p>
        <Link href={"https://en-ter.co.kr/support/main/main.do"} target="blank">
          <div className="font-[Pretendard-Medium] py-[7px] px-[10px] rounded-[10px] bg-[#E2FAE4]">
            한전 고효율 가전제품 구매비용 지원사업 바로가기 {">"}
          </div>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
