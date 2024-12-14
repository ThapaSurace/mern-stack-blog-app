import { useInfiniteQuery } from "@tanstack/react-query"
import PostCard from "./PostCard"
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPosts } from "../services/postService";

const PostList = () => {
    const {
        data: posts,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) =>
            lastPage.hasMore ? pages.length + 1 : undefined,
    });


    if (isFetching) return <span>loading...</span>
    if (error) return <span>Something went wrong!!</span>
    if (!posts) return <span>No post found!</span>

    /* 
  page 1 = [1,2]
  page 2 = [3,4]

  using flatmap = we get [1,2,3,4]
*/

    const allPosts = posts?.pages.flatMap(page => page.posts) || []

    return (
        <InfiniteScroll
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading more posts...</h4>}
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