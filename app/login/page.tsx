import LoginForm from "./loginForm";

const LoginPage = () => {
    return (
        <>
        <div className="absolute w-screen h-screen top-0 left-0 flex flex-col items-center justify-between">
            <div></div>
            <LoginForm/>
            <div></div>
        </div>
        </>
    );
};

export default LoginPage;