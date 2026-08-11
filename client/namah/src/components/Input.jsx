
const Input = ({ label, type, value, placeholder, onChange}) => {
  return (
    <div>
        <label>
            <p>{label}:</p>
            <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
        </label>
    </div>
  )
}

export default Input
