/**
 * Input Component
 * props:
 * label
 * placeholder
 */

export default function Input({
  label,
  placeholder,
}) {
  return (
    <>
      <label>{label}</label>

      <input
        placeholder={placeholder}
      />
    </>
  );
}