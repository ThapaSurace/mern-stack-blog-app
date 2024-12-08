import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { navLinks } from "../../constant";

const MobileMenu = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)
    return (
        <div className="lg:hidden">
            {
                !open ?
                    <RxHamburgerMenu
                        size={30}
                        className="cursor-pointer"
                        onClick={handleOpen}
                    /> :
                    <RxCross2
                        size={30}
                        className="cursor-pointer"
                        onClick={handleOpen}
                    />
            }

            <div className={`w-full h-screen bg-white flex 
    flex-col items-center justify-center gap-6 font-medium
     text-lg absolute top-16 transition-all ease-in-out z-50
      ${open ? "-right-0" : "-right-[100%]"}
     `
            }>
                {
                    navLinks.map(link => (
                        <Link key={link.id} to={link.path}>{link.name}</Link>
                    ))
                }
            </div>
        </div>
    )
}
export default MobileMenu