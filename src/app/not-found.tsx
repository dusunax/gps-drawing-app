import GoBackButton from "@/components/GoBackButton";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-center items-center mb-2">
        <GoBackButton />
        <span className="text-text-muted text-sm">뒤로가기</span>
      </div>

      <h2 className="text-3xl font-bold mb-4">404 Not Found</h2>
      <p className="text-text-secondary text-sm">요청하신 페이지를 찾을 수 없습니다.</p>
    </div>
  );
}
