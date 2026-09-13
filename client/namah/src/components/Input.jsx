
const Input = ({ type, value, placeholder, onChange}) => {
  return (
    <div>
        <label className="w-full p-2 rounded border border-gray-500">
            <input className="w-[20vw] outline-none" type={type} value={value} placeholder={placeholder} onChange={onChange} />
        </label>
    </div>
  )
}

export default Input
