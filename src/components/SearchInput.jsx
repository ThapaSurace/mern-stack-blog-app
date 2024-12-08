import { CiSearch } from "react-icons/ci";

const SearchInput = ({ className }) => {
    return (
        <div className={`relative h-full ${className}`}>
            <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
                type="text"
                placeholder="search..."
                className="p-2 pl-10 pr-2 w-full rounded-full border border-gray-300 focus:outline-none"
            />
        </div>
    )
}
export default SearchInput