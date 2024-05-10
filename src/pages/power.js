import BottomTabNav from "@components/bottomTabNav";

/*
에너지소비효율
[1등급]
- 냉장고 : EEP_12_LIST (상업용), EEP_20_LIST
- 김치냉장고 : EEP_13_LIST
- 드럼세탁기 : EEP_06_LIST
- 벽걸이 에어컨
- 냉온수기 : EEP_16_LIST, EEP_30_LIST (순간식)
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
export default function Power() {
  return (
    <div className="overflow-y-auto">
      <span>슈퍼파워~</span>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
