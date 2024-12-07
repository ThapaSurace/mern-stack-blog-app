import { Link } from "react-router-dom"
import MainCategoryList from "../components/MainCategoryList"

const Home = () => {
    return (
        <div className="mt-4 space-y-4">
            {/* breadcrumb */}
            <div className="flex gap-4">
                <Link to="/">Home</Link>
                <span>&gt;</span>
                <span className="text-blue-800">Blogs and Articles</span>
            </div>
            {/* titles */}
            <div className="">
                <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </h1>
                <p className="mt-8 text-md md:text-xl">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
                    rerum accusantium.
                </p>
            </div>
            {/* category lists */}
            <MainCategoryList />
        </div>
    )
}
export default Home