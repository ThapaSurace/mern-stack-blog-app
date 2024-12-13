import { useInfiniteQuery } from "@tanstack/react-query"
import PostCard from "./PostCard"
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';

const fetchPosts = async (pageParams) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: {
            page: pageParams,
            limit: 5
        }
    })
    return res.data
}

const PostList = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) =>
            lastPage.hasMore ? pages.length + 1 : undefined,
    });


    if (isFetching) return <span>loading...</span>
    if (error) return <span>Something went wrong!!</span>

    /* 
  page 1 = [1,2]
  page 2 = [3,4]

  using flatmap = we get [1,2,3,4]
*/

    const allPosts = data?.pages.flatMap(page => page.posts) || []

    console.log(data);
    return (
        <InfiniteScroll
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading more posts...</h4>}
            endMessage={
                <p>
                    <b>All posts loaded!</b>
                </p>
            }
        >
            {
                allPosts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))
            }
        </InfiniteScroll>
    )
}
export default PostList