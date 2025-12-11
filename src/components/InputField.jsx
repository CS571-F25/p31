export default function InputField({ type, value, placeholder, onChange }) {
    return (
        <div className="input-container">
            <input
                type={type}
                className="input"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}
