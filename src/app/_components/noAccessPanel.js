import { Button } from "@/components/ui/button";

export const NoAccessPanel = ({ router }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#f9fafb] px-4">
      <img src="/favicon.ico" alt="Logo" className="w-20 h-20 mb-6" />

      <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Oops!</h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        You don’t have permission to access this page. If you believe this is an
        error, please contact the administrator.
      </p>

      <Button
        className="px-6 py-3 rounded-full font-semibold transition-colors duration-300 shadow-md"
        onClick={() => router.push("/")}
      >
        Go back to Home
      </Button>
    </div>
  );
};
