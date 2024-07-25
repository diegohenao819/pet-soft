"use client";

import { useSearchContext } from "@/lib/hooks";

const SearchForm = () => {
  const { searchQuery, handleSearchQueryChange} = useSearchContext();
  console.log(searchQuery);

  return (
    <form className="h-[45px] ">
      <input
        type="text"
        className="rounded p-2  w-full h-full text-black/70
      hover:bg-gray-200 hover:outline-1 outline-slate-400 focus:bg-gray-200 transition  "
        placeholder="Search for a pet"
        value={searchQuery}
        onChange={(e) => handleSearchQueryChange(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
