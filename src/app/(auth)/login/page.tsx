import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <div className="flex justify-center mb-4">
        <h2 className="font-bold text-3xl ">Log In</h2>
      </div>
      <AuthForm type="login" />
      <p className="text-sm text-slate-500 mt-3">
        No account yet?{" "}
        <Link href="/signup" className="text-slate-700 font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  );
};



export default Login;
