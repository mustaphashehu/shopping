'use client'

import { useState, useEffect } from "react";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../components/Button";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";
import axios from 'axios'
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";


interface loginProps {
    currentUser: SafeUser | null
}

const RegisterForm: React.FC<loginProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{errors, isSubmitting, isSubmitSuccessful}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
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

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data).then(() => {
            toast.success('Account created')

            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback) => {
                if (callback?.ok) {
                    router.push("/cart")
                    router.refresh()
                    toast.success("Logged In")
                }

                if (callback?.error) {
                    toast.error(callback.error)
                }
            })
        }).catch(() => toast.error("something went wrong")).finally(() => {
            setIsLoading(false)
        })
    }

    if (currentUser) {
        return <p className="text-center">Logged in, Redirecting.....</p>
    }

    return (
        <>
        <div className="font-bold text-2xl">Sign Up for E-shop</div>
        <hr  className="bg-slate-300 w-full h-px"/>
        <Button 
        label="Sign Up with Github"
        outline
        icon={AiOutlineGithub}
        onClick={() => {signIn("github")}} />
        <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />

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

        <Button
        onClick={handleSubmit(onSubmit)}
        label={isLoading ? "Loading" : "Sign Up"}
        disabled={isLoading}
        />
        
        <p className="text-sm">
            Already have an Account? <Link className="underline text-slate-800" href="/login">Log In</Link>
        </p>
        
        </>
    );
}
 
export default RegisterForm;