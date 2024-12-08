import { Button } from "./ui/button";
import Comment from "./Comment";

const Comments = () => {
    return (
        <div>
            <h1 className="underline text-lg text-slate-800 mb-4">Comments</h1>
            <div className="flex gap-4 items-center">
                <textarea type="text" className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none" placeholder="Write something..." />
                <Button>Submit</Button>
            </div>


            <div className="mt-4 space-y-6">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
        </div>
    )
}
export default Comments