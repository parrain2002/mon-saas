export default function Input({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true
}) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          marginBottom: "5px",
          fontWeight: "600",
        }}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete="on"
        aria-label={label}
        style={{
          width: "100%",
          padding: "10px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          fontSize: "15px",
        }}
      />
    </div>
  );
}
