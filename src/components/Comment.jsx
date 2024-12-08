import Image from '../components/Image'

const Comment = () => {
    return (
        <>
            <div className="flex gap-2 items-center">
                <div className='w-8 h-8 '>
                    <Image
                        src='zoro.jpg'
                        className='w-full h-full rounded-full object-cover object-center'
                    />

                </div>
                <div className="text-xs space-x-1">
                    <span className="font-medium">Zoro Senpai</span>
                    <span className="text-gray-400">2 days ago</span>
                </div>
            </div>
            <p className="mt-2 leading-relaxed tracking-wide text-slate-600 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos esse nostrum amet eaque. Error ipsam vitae, tempora vel ducimus esse.</p>
        </>
    )
}
export default Comment