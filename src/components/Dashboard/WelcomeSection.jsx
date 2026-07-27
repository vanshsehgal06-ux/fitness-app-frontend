export default function WelcomeSection({ user }) {
  return (
    <div>
      <h1 className="text-5xl font-bold text-white">
        Dashboard
      </h1>

      <p className="mt-3 text-gray-400 text-lg">
        Welcome Back,
        <span className="text-white font-semibold">
          {" "}
          {user.name}
        </span>
        👋
      </p>
    </div>
  );
}