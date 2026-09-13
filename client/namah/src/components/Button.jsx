
const Button = ({button,type = "button" , onClick}) => {
  return (
    <div className="bg-black text-white rounded-lg focus:border-white">
      <button type={type} onClick={onClick} className="p-2 px-6">{button}</button>
    </div>
  )
}

export default Button
