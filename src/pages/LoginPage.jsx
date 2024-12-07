import { SignIn } from "@clerk/clerk-react"

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center mt-10">
            <SignIn signUpUrl="/register" />
        </div>
    )
}
export default LoginPage