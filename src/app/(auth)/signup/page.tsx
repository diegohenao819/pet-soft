import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const SignUp = () => {
  return (
    <div>
      <div className="flex justify-center mb-4">
        <h2 className="font-bold text-3xl ">Sign Up</h2>
      </div>
      <AuthForm type="signup" />
      <p className="text-sm text-slate-500 mt-3">
        Already an Account?{" "}
        <Link href="/login" className="text-slate-700 font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
