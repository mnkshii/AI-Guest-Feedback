/**
 * Button Component
 * props:
 * children
 * onClick
 * type
 */

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-glow login-btn ${className}`}
    >
      {children}
    </button>
  );
}