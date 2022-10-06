export const Heading = ({className, type, title, ...props}) => {
    switch (type) {
        case "sub-heading":
            return (
                <h3 className={className} {...props}>{title}</h3>
            )
        default:
            return (
                <h1 className={className} {...props}>{title}</h1>
            )
    }
}