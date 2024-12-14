import { useAuth, useUser } from "@clerk/clerk-react"
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from "react-quill-new"
import { Button } from '../components/ui/button'
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { FaImage, FaFileVideo } from "react-icons/fa";
import Upload from "../components/Upload"

const Write = () => {
    const { isLoaded, isSignedIn } = useUser()
    const { getToken } = useAuth()

    const [content, setContent] = useState("")
    const [cover, setCover] = useState("")
    const [img, setImg] = useState("")
    const [video, setVideo] = useState("")
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        img && setContent(prev => prev + `<p><image src="${img.url}" /></p>`)
    }, [img])

    useEffect(() => {
        video && setContent(prev => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`)
    }, [video])



    const navigate = useNavigate()

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: (res) => {
            toast.success("Post has been created sucessfully!")
            navigate(`/${res.data.slug}`)
        }
    })

    if (!isLoaded) return <div>loading...</div>

    if (!isSignedIn) return <div>You should login!</div>


    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            cover: cover.filePath || "",
            title: formData.get("title"),
            category: formData.get("category"),
            desc: formData.get("desc"),
            content: content,
        }
        mutate(data)
    }

    return (
        <div className="my-8 max-w-4xl mx-auto">
            <h1 className="text-xl mb-4 font-medium">Create a New Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                <Upload
                    type='image'
                    setProgress={setProgress}
                    setData={setCover}
                >
                    <button
                        type="button"
                        className="bg-gray-100 shadow p-2 rounded-xl w-fit">
                        Add a cover image
                    </button>
                </Upload>
                <input
                    type="text"
                    placeholder="Tell your story"
                    className="px-4 py-2 rounded-xl focus:outline-none border border-gray-400 shadow w-full md:w-[400px]"
                    name="title"
                />
                <div className="flex gap-4 items-center">
                    <label
                        htmlFor="cat"
                        className="font-medium"
                    >
                        Choose a category
                    </label>
                    <select
                        name="category"
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
                <textarea name='desc'
                    className="p-4 rounded-xl focus:outline-none border border-gray-400 shadow"
                    placeholder="Short Description..." />
                <div className="flex gap-4">

                    <div className="flex-1 rounded-xl relative focus:outline-none border border-gray-400 shadow">
                        <ReactQuill
                            theme="snow"
                            className="min-h-60"
                            value={content}
                            onChange={setContent}
                            readOnly={0 < progress && progress < 100}
                        />
                        <div className="space-y-2 absolute -top-1 right-[280px] flex gap-1">
                            <Upload
                                type='image'
                                setProgress={setProgress}
                                setData={setImg}
                            >
                                <div className="p-2 rounded-md text-slate-900 cursor-pointer hover:bg-slate-100">
                                    <FaImage size={18} />
                                </div>
                            </Upload>
                            <Upload
                                type='video'
                                setProgress={setProgress}
                                setData={setVideo}
                            >
                                <div className="p-2 rounded-md text-slate-900 cursor-pointer hover:bg-slate-100">
                                    <FaFileVideo size={18} />
                                </div>
                            </Upload>
                        </div>
                    </div>
                </div>
                <Button
                    disabled={isPending || 0 < progress && progress < 100}
                    className="disabled:cursor-not-allowed"
                >
                    {
                        isPending ? "loading..." : "Post"
                    }
                </Button>
                {"Progress:" + progress}
                {isError && error.message}
            </form>
        </div>
    )
}
export default Write