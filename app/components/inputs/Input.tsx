'use client';

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
    id: string;
    type?: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;

}
const Input: React.FC<InputProps> = ({
    id,
    type,
    label,
    disabled,
    required,
    register,
    errors
}) => {
    return ( 
        <div className="w-full relative">
            <input 
            autoComplete="off"
            disabled={disabled}
            id={id}
            placeholder=""
            type={type}
            {...register(id, { required })}
            className={`
            peer
            w-full
            p-4
            pt-6
            outline-none
            bg-white
            font-light
            border-2
            rounded-md
            transition
            disabled:opacity-70
            disabled:cursor-not-allowe
            ${errors[id] ?'border-rose-400' : 'border-slate-300'}
            ${errors[id] ?'focus:border-rose-400' : 'focus:border-slate-300'}
            `} />
            <label 
            className={`
            absolute
            cursor-text 
            text-md 
            duration-150 
            transform 
            -translate-y-3 
            top-5 
            z-10 
            origin-[0] 
            left-4 
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ?'text-rose-500' : 'text-slate-400'}
            `}
            htmlFor={id}
            >
                {label}
            </label>
        </div>
     );
}
 
export default Input;