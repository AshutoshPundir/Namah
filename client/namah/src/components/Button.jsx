
const Button = ({button,type = "button" , onClick}) => {
  return (
    <div>
      <button type={type} onClick={onClick}>{button}</button>
    </div>
  )
}

export default Button
