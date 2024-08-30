import ContentBlock from "@/components/ContentBlock";
import LogOutButton from "@/components/LogOutButton";
import { auth } from "@/lib/auth";

const Account = async () => {
  const session = await auth();
  
  return (
    <ContentBlock>
      <div className="h-[500PX] w-full h-vh flex flex-col justify-center align-center bg-green-300 text-center gap-4">
        <h1 className="text-2xl font-bold"
        >Your Account</h1>
        <p>Logged in as <strong> {session?.user?.email}</strong> </p>
        <LogOutButton />
      </div>
    </ContentBlock>
  );
};

export default Account;
