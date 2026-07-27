export default function GradientButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`
        w-full
        rounded-xl
        bg-gradient-to-r
        from-violet-600
        to-fuchsia-600
        py-3
        font-semibold
        text-white
        transition
        duration-300
        hover:scale-105
        hover:shadow-[0_0_30px_rgba(168,85,247,.5)]
        ${className}
      `}
    >
      {children}
    </button>
  );
}