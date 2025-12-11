export default function Input({ label, type, value, onChange }) {
    return (
        <div className = "flex flex-col gap-1">
            <label>{label}</label>
            <input
                className = "border p-2 rounded"
                type = {type}
                value = {value}
                onChange = {onChange}
            />
        </div>
    );
}