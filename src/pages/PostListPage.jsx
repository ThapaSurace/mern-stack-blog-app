import PostList from '../components/PostList'

const filters = [
    {
        id: 1,
        label: "Newest",
        value: "newest"
    },
    {
        id: 2,
        label: "Most Popular",
        value: "popular"
    },
    {
        id: 3,
        label: "Trending",
        value: "trending"
    },
    {
        id: 4,
        label: "Oldest",
        value: "oldest"
    },
]


const PostListPage = () => {
    return (
        <div className="my-8">
            <h1 className='text-2xl lg:text-3xl font-bold text-slate-900 mb-10'>Development</h1>
            <div className='flex justify-between gap-4'>
                <div className='relative group cursor-pointer'>
                    <span className='group text-slate-800 font-medium border rounded-lg py-2 px-4'>Filter By</span>
                    <div
                        className='border rounded-lg shadow flex flex-col 
                                   gap-1 items-center p-2 w-[200px] absolute 
                                   z-30 bg-white top-8 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                        {
                            filters.map(item => (
                                <span className='hover:bg-slate-800 hover:text-white w-full text-center rounded-lg hover:scale-110 transition-all duration-300 ease-in-out' key={item.id}>{item.label}</span>
                            ))
                        }
                    </div>
                </div>
                <div className='relative group cursor-pointer'>
                    <span className='group text-slate-800 font-medium border rounded-lg py-2 px-4'>Filter By</span>
                    <div
                        className='border rounded-lg shadow flex flex-col 
                                   gap-1 items-center p-2 w-[200px] absolute 
                                   z-30 bg-white top-8 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                        {
                            filters.map(item => (
                                <span className='hover:bg-slate-800 hover:text-white w-full text-center rounded-lg hover:scale-110 transition-all duration-300 ease-in-out' key={item.id}>{item.label}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
            <hr className='my-8' />
            <div className='mt-8'>
                <PostList />
            </div>
        </div>
    )
}
export default PostListPage