"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaChevronLeft } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    router.push("/sign-up");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();

      localStorage.setItem("token", data.token);
      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center gap-20 pl-40">
      <div className="flex flex-col w-sm h-fit">
        <Button
          variant={`outline`}
          className="w-9 mb-4"
          onClick={() => router.back()}
        >
          <FaChevronLeft className="size-4" />
        </Button>
        <form onSubmit={handleLogin}>
          <h1 className="text-2xl font-semibold">Log in</h1>
          <p className="text-[#71717A] font-medium mb-6">
            Log in to enjoy your favorite dishes.
          </p>
          <Input
            placeholder="Enter your email address"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type={isChecked ? "password" : "text"}
            placeholder="Enter your password"
            className="mt-4"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-between">
            <Button variant={`link`} className="px-0 mt-2">
              Forget password?
            </Button>
            <div className="flex gap-2.5 items-center">
              <Checkbox
                id="show-password"
                onClick={() => setIsChecked(!isChecked)}
              />
              <Label htmlFor="show-password">Show password</Label>
            </div>
          </div>
          <Button
            type="submit"
            className={`w-full mt-4 ${error ? "bg-gray-600" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <div className="w-full flex justify-center items-center mt-6 gap-2 text-[#71717A]">
          <span className="text-base">Don’t have an account?</span>
          <Button
            variant={`link`}
            className="p-0 m-0 text-base text-[#2563EB] h-fit"
            onClick={handleClick}
          >
            Sign up
          </Button>
        </div>
      </div>
      <div className="h-[96%] w-2/3 rounded-2xl">
        <img
          src="/login-signup-Image.png"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
