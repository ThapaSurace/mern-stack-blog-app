import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar/NavBar"

const MainLayout = () => {
    return (
        <div className="px-6 md:px-8 lg:px-32">
            <NavBar />
            <Outlet />
        </div>
    )
}
export default MainLayout