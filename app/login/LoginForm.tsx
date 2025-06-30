'use client'

import { useState, useEffect } from "react";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../components/Button";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";


interface loginProps {
    currentUser: SafeUser | null
}
const LoginForm: React.FC<loginProps> = ({currentUser}) => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const router = useRouter()

    useEffect(() => {
        if (currentUser) {
            router.push("/")
            router.refresh()
        }
    },[])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn("credentials", {
            ...data,
            redirect: false
        }).then((callback) => {
            if (callback?.ok) {
                router.push("/cart")
                router.refresh()
                toast.success("Logged In")
            }

            if (callback?.error) {
                setServerError(callback.error)
                toast.error(callback.error)
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }

    if (currentUser) {
        return <p className="text-center">Logged in, Redirecting.....</p>
    }

    return (
        <>
            <div className="font-bold text-2xl">Sign In for E-shop</div>
            <hr className="bg-slate-300 w-full h-px" />
            <Button
                label="Continue with Github"
                outline
                icon={AiOutlineGithub}
                onClick={() => {signIn("github")}} />

            <Input
                id="email"
                label="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="password"
                label="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"

            />

            {/* <Input
        id="retype"
        label="retype password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        /> */}
            <p className="font-semibold text-red-700">{serverError && serverError}</p>
            <Button
                onClick={handleSubmit(onSubmit)}
                label={isLoading ? "Loading" : "Log In"}
            />

            <p className="text-sm">
                Do not have an Account? <Link className="underline text-slate-800" href="/register">Sign Up</Link>
            </p>

        </>
    );
}

export default LoginForm;