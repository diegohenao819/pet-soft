import ContentBlock from "@/components/ContentBlock";
import { auth } from "@/lib/auth";

const Account = async () => {
  const session = await auth();
  return (
    <div className="h-full bg-white h-vh">
      <h1>Your Account</h1>
      <ContentBlock>
        <p className="h-[500px]">Logged in as {session?.user?.email} </p>
      </ContentBlock>
    </div>
  );
};

export default Account;
