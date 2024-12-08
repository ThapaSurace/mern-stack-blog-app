import { mainCat } from "../constant"
import { Link } from "react-router-dom"

const MainCategoryList = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-wrap gap-x-8 gap-y-4 whitespace-nowrap">
                {
                    mainCat.map(cat => (
                        <Link
                            key={cat.id}
                            to={cat.path}
                            className="text-sm md:text-base font-medium text-slate-700 bg-gray-50/90 hover:bg-gray-100 p-2 rounded-2xl"
                        >
                            {cat.name}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default MainCategoryList