export default function WelcomeSection({ user }) {
  return (
    <div>
      <h1 className="text-5xl font-bold text-foreground">
        Dashboard
      </h1>

      <p className="mt-3 text-muted-foreground text-lg">
        Welcome Back,
        <span className="text-foreground font-semibold">
          {" "}
          {user.name}
        </span>
        👋
      </p>
    </div>
  );
}