
function Select(
    {options,
    className = "",
    ...props},
    ref
){
    return (
        <>
            <div>
                {
                    options?.map((option)=>{
                        <option ref={ref} key={option} className={`${className}`} {...props}>
                            {option}
                        </option>
                    })
                }
            </div>
        </>
    )
}

export default React.forwardRef(Select)