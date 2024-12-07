import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { Button } from "./ui/button";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


const NavBar = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)
    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            {/* Logo */}
            <Link to='/' className="flex items-center gap-4 text-2xl font-bold">
                <Image
                    src="logo.png"
                    alt="logo"
                    w={32}
                    h={32}
                />
                <span>ZoroBlog</span>
            </Link>
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

                <div className={`w-full h-screen bg-[#e6e6ff] flex 
                    flex-col items-center justify-center gap-8 font-medium
                     text-lg absolute top-16 transition-all ease-in-out
                      ${open ? "-right-0" : "-right-[100%]"}
                     `
                }>
                    <Link to='/'>Home</Link>
                    <Link to='/'>Trending</Link>
                    <Link to='/'>Most Popular</Link>
                    <Link to='/'>About</Link>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
            {/* desktop menu */}
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
                <Link>Home</Link>
                <Link>Trending</Link>
                <Link>Most Popular</Link>
                <Link>About</Link>

                <SignedOut>
                    <Link to='/login'>
                        <Button>Login</Button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}
export default NavBar