import { logIn, signUp } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
  type: "login" | "signup";
};

const AuthForm = ({type}: AuthFormProps) => {
  return (
    <form className="flex flex-col gap-4"
    action={type === "login" ? logIn : signUp}
    >
      <div>
        <Label htmlFor="email"> Email</Label>
        <Input type="email" id="email" name="email" className="mt-2" required maxLength={100} />
      </div>

      <div>
        <Label htmlFor="password"> Password</Label>
        <Input type="password" id="password" name="password" className="mt-2" required maxLength={100} />
      </div>

      <Button type="submit">{type === "login" ? "Log in" : "Sign up"}</Button>
    </form>
  );
};

export default AuthForm;
