import ContentBlock from "@/components/ContentBlock";
import PetDetails from "@/components/PetDetails";
import PetList from "@/components/PetList";
import SearchForm from "@/components/SearchForm";

function Dashboard() {
  return (
    <main>
      <div className="flex justify-between mt-5">
        <section className="px-4 ">
          <h1 className="text-white text-3xl font-semibold">
            Pet<span className="font-bold">Soft</span>
          </h1>
          <p className="text-white/70">Manage your pet daycare with ease!</p>
        </section>

        <section className="text-center px-4">
          <p className="text-lg font-bold text-white">2</p>
          <p className="text-white/60">Current guests</p>
        </section>
      </div>

      {/* MAIN */}

      <section className="grid grid-rows-[45px_300px_500px] gap-4  md:grid-cols-3 md:grid-rows-[45px_1fr]  md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
