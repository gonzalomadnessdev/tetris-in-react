const Button = ({ children, type = 'primary', onClick = () => { }}: { children: string, type?: 'primary' | 'secondary', onClick?: () => void }) => {
    return (
        <button type="button" className={"btn btn-" + type} onClick={onClick}>{children}</button>
    )
}

export default Button