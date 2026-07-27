export default function InputField({
  label,
  type,
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="text-white/80">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/5
          px-4
          py-3
          text-white
          outline-none
          transition
          focus:border-violet-500
        "
      />
    </div>
  );
}