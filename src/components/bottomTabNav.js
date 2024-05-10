import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BottomTabNav() {
  const router = useRouter();
  const MENU = [
    {
      label: "홈",
      imageOff: "/images/bottomTabNav/home-gray.svg",
      imageOn: "/images/bottomTabNav/home-green.svg",
      paths: ["/home"],
    },
    {
      label: "검색",
      imageOff: "/images/bottomTabNav/search-gray.svg",
      imageOn: "/images/bottomTabNav/search-green.svg",
      paths: ["/search"],
    },
    {
      label: "고효율",
      imageOff: "/images/bottomTabNav/power-gray.svg",
      imageOn: "/images/bottomTabNav/power-green.svg",
      paths: ["/power"],
    },
  ];

  return (
    <div className="py-[10px] px-[20px] flex gap-[24px] justify-between bg-white border-t border-t-[#EFF1F4]">
      {MENU.map((v) => (
        <Link
          href={v.paths[0]}
          key={v.label}
          className="flex flex-col gap-[2px] items-center w-full cursor-pointer"
        >
          <Image
            alt={v.label}
            src={v.paths.includes(router.pathname) ? v.imageOn : v.imageOff}
            width={24}
            height={24}
            priority
            className="w-[24px] h-[24px]"
          />
          <span
            className={`font-[Pretendard-Medium] text-[1.2rem] ${
              v.paths.includes(router.pathname)
                ? "text-[#5AED69]"
                : "text-[#9DA0A8]"
            }`}
          >
            {v.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
