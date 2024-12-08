import { Link } from "react-router-dom"
import MainCategoryList from "../components/MainCategoryList"
import PostList from "../components/PostList"


const Home = () => {
    return (
        <div className="mt-8">

            {/* titles */}
            {/* <div className="">
                <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </h1>
                <p className="mt-8 text-md md:text-xl">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
                    rerum accusantium.
                </p>
            </div> */}
            {/* category lists */}
            <MainCategoryList />
            {/* recent posts */}
            <div className="mt-10">
                <h1 className="text-2xl font-semibold mb-4 text-slate-800">Recent Posts</h1>
                <PostList />
            </div>
        </div>
    )
}
export default Home