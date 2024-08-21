import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AuthForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <div>

        <Label htmlFor="email"> Email</Label>
        <Input type="email" id="email" className="mt-2"/>
      </div>

        <div>
            <Label htmlFor="password"> Password</Label>
            <Input type="password" id="password" className="mt-2"/>
        </div>

        <Button type="submit">Login</Button>


    </form>
  );
};

export default AuthForm;
