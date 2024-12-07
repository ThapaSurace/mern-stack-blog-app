import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { Button } from "./ui/button";
import Image from "./Image";

const NavBar = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)
    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4 text-2xl font-bold">
                <Image
                    src="logo.png"
                    alt="logo"
                    w={32}
                    h={32}
                />
                <span>ZoroBlog</span>
            </div>
            {/* mobile menu */}
            <div className="md:hidden">
                {
                    !open ?
                        <RxHamburgerMenu
                            size={28}
                            className="cursor-pointer"
                            onClick={handleOpen}
                        /> :
                        <RxCross2
                            size={28}
                            className="cursor-pointer"
                            onClick={handleOpen}
                        />
                }

                <ul className={`w-full h-screen bg-[#e6e6ff] flex 
                    flex-col items-center justify-center gap-8 font-medium
                     text-lg absolute top-16 transition-all ease-in-out
                      ${open ? "-right-0" : "-right-[100%]"}
                     `
                }>
                    <li>Home</li>
                    <li>Trending</li>
                    <li>Most Popular</li>
                    <li>About</li>
                    <li>Login</li>
                </ul>
            </div>
            {/* desktop menu */}
            <ul className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <li>Home</li>
                <li>Trending</li>
                <li>Most Popular</li>
                <li>About</li>
                <li>
                    <Button>Login</Button>
                </li>
            </ul>
        </div>
    )
}
export default NavBar