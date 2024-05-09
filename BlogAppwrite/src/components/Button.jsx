
function Button(
{    children,
    type= "button",
    className="",
    ...props
}){
    return (
        <button
        type={type}
        className={`${className}`}
        {...props}
        >{children}</button>
    )
}

export default Button;