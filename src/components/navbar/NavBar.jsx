
import { Button } from "../ui/button";
import Image from "../Image";
import { Link } from "react-router-dom";
import {
    SignedIn,
    SignedOut,
    useAuth,
    UserButton
} from "@clerk/clerk-react";
import SearchInput from "../SearchInput";
import MobileMenu from "./MobileMenu";
import { navLinks } from "../../constant";
import { useEffect } from "react";


const NavBar = () => {
    const { getToken } = useAuth()

    useEffect(() => {
        getToken().then(token => console.log(token))
    }, [])

    return (
        <>
            <div className="w-full h-16 md:h-20 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <MobileMenu />
                    {/* Logo */}
                    <div className="flex gap-4">
                        <Link to='/' className="flex items-center gap-4 text-2xl font-bold">
                            <Image
                                src="logo.png"
                                alt="logo"
                                className="w-6 h-6 lg:w-8 lg:h-8"
                            />
                            <span>ZoroBlog</span>
                        </Link>
                        <SearchInput className='w-[300px] lg:w-[400px] hidden md:block' />
                    </div>
                </div>

                {/* desktop menu */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-8 font-medium">
                    {
                        navLinks.map(link => (
                            <Link key={link.id} to={link.path}>{link.name}</Link>
                        ))
                    }

                </div>
                <div>
                    <SignedOut>
                        <Link className="mr-4" to='/login'>
                            <Link to='/register'>
                                <Button variant='ghost'>Register</Button>
                            </Link>
                            <Button>Login</Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
            <SearchInput className='mt-3 md:hidden' />
        </>
    )
}
export default NavBar