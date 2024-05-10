import BottomTabNav from "@components/bottomTabNav";

export default function Home() {
  return (
    <div className="overflow-y-auto">
      <span>하이~</span>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <BottomTabNav />
      </div>
    </div>
  );
}
