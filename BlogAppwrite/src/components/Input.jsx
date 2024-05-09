import { useId } from "react"
import { forwardRef } from "react";
function Input(
    {label,
    type = "text",
    placeholder = "Enter",
    className = "",
    ...props},
    ref
){
    const id = useId();
    return (
        <>
            {label && (
                <label
                htmlFor={id}
                >{label}</label>
            )}
            <input
            type = {type}
            className={`${className}`}
            placeholder={`${placeholder}`}
            {...props}
            id={id}
            ref={ref}
            />
        </>
    )
}

export default forwardRef(Input);