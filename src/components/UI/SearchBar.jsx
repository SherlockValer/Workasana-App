import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  return (
    <div>
      <section className="h-9 flex justify-center align-middle border-1 border-slate-300  hover:shadow-sm rounded-md">
        <input
          type="text"
          placeholder="Search"
          className="grow w-9/10 px-3 placeholder:text-gray-500 placeholder:text-sm focus:outline-none"
        />
        <button className="px-3 py-2 bg-gray-200 border-l-1 border-slate-300 ">
          <BsSearch />
        </button>
      </section>
    </div>
  );
};

export default SearchBar;
