export default function Card({ children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </div>
  );
}
