export default function FormWrapper({ title, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
