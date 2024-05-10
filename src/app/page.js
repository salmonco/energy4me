import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black flex flex-col justify-around p-[42px]">
      <div className="flex flex-col gap-[12px]">
        <Image
          alt=""
          src={require("@images/logo-black.svg")}
          width={200}
          height={200}
          className="h-auto"
        />
        <p className="font-[Pretendard-Bold] text-[2.2rem] text-[#F9FAFC]">
          고효율 제품 검색
          <br />
          에너지포미
        </p>
      </div>
      <div className="flex flex-col gap-[8px] items-center">
        <div className="w-full flex flex-col gap-[18px] items-center">
          {/* <Link className="w-full" href="/login">
            <button className="bg-white shadow-gray-sm w-full text-[1.4rem] font-m h-[42px] rounded-[5px]">
              <span className="text-[#3B3F4A]">로그인</span>
            </button>
          </Link>
          <Link className="w-full" href="/signup">
            <button className="bg-[#464343] shadow-gray-sm w-full text-[1.4rem] font-m h-[42px] rounded-[5px]">
              <span className="text-white">회원가입</span>
            </button>
          </Link> */}
          <Link className="w-full" href="/home">
            <button className="bg-[#464343] shadow-gray-sm w-full text-[1.4rem] font-m h-[42px] rounded-[5px]">
              <span className="text-white">시작하기</span>
            </button>
          </Link>
        </div>
        {/* <Link href="/privacy" target="blank">
          <span className="font-b text-[1.3rem] text-[#3B3F4A]">
            개인정보처리방침
          </span>
        </Link> */}
      </div>
    </main>
  );
}
