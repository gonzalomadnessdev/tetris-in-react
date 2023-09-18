import { ReactNode } from "react"

const Alert = ({children} : {children : ReactNode}) => {
    return (
        <div className="alert alert-primary" role="alert">
            {children}
        </div>
    )
}

export default Alert