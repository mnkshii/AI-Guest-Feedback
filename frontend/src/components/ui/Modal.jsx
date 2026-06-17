/**
 * Modal Component
 */

export default function Modal({
  isOpen,
  title,
}) {
  if (!isOpen) return null;

  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}