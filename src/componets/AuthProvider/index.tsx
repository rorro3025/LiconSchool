import { ReactNode } from "react";
import { LoginForm } from "../Login";
import { useStore } from "@/store/owners.slice";

interface Props {
    children: ReactNode;
}


function AuthProvider({ children }: Props) {
    const { isLogin } = useStore((s) => s)
    return (
        <>
            {
                isLogin ? <>{children}</> : <LoginForm />
            }
        </>

    )

}

export default AuthProvider;
