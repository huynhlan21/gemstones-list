import Button from "@mui/material/Button";

export const MuiButton = ({className, title, variant="contained", ...props})=> {
  return (
    <Button 
        className={className} 
        variant={variant}
        size="medium"
        {...props}
    >
        {title}
    </Button>
  )
}