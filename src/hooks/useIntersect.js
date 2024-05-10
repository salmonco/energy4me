import { useCallback, useEffect, useRef } from "react";

const useIntersect = (onIntersect, options) => {
  const observerRef = useRef(null); // IntersectionObserver를 저장할 ref
  const targetRef = useRef(null); // 감시할 대상을 저장할 ref

  // IntersectionObserver의 콜백 함수
  const callback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer); // 교차되는 요소가 있으면 콜백 함수 호출
        }
      });
    },
    [onIntersect]
  );

  // targetRef가 변경될 때마다 IntersectionObserver를 생성하고 관찰 시작
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetRef.current); // 대상 요소를 감시

    // 이전 Observer가 존재한다면 제거
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = observer; // 생성된 Observer를 저장

    return () => {
      // 컴포넌트가 언마운트되거나 대상 요소가 변경될 때 이전 Observer를 제거
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [targetRef, callback, options]); // ref나 콜백, 옵션 값이 변경될 때마다 재실행

  return targetRef;
};

export default useIntersect;
