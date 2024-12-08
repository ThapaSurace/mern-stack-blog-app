import { useUser } from "@clerk/clerk-react"
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from "react-quill-new"
import { Button } from '../components/ui/button'

const Write = () => {
    const { isLoaded, isSignedIn } = useUser()

    if (!isLoaded) return <div>loading...</div>

    if (!isSignedIn) return <div>You should login!</div>
    return (
        <div className="my-8 max-w-4xl mx-auto">
            <h1 className="text-xl mb-4 font-medium">Create a New Post</h1>
            <form className="flex flex-col gap-y-6">
                <button className="bg-gray-100 shadow p-2 rounded-xl w-fit">Add a cover image</button>
                <input
                    type="text"
                    placeholder="Tell your story"
                    className="px-4 py-2 rounded-xl focus:outline-none border border-gray-400 shadow w-full md:w-[400px]"
                />
                <div className="flex gap-4 items-center">
                    <label
                        htmlFor="cat"
                        className="font-medium"
                    >
                        Choose a category
                    </label>
                    <select
                        name="cat"
                        id="cat"
                        className="p-2 rounded-xl focus:outline-none border border-gray-400 shadow"
                    >
                        <option value="general">General</option>
                        <option value="web-design">Web Design</option>
                        <option value="development">Development</option>
                        <option value="seo">Search Engines</option>
                        <option value="marketing">Marketing</option>
                        <option value="ai">AI</option>
                    </select>
                </div>
                <textarea className="p-4 rounded-xl focus:outline-none border border-gray-400 shadow" name="desc" placeholder="Short Description..."></textarea>
                <div className="rounded-xl focus:outline-none border border-gray-400 shadow">
                    <ReactQuill
                        theme="snow"
                        className="h-60"
                    />
                </div>
                <Button className=''>Post</Button>
            </form>
        </div>
    )
}
export default Write