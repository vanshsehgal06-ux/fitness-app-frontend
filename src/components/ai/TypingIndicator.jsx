export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[80%] gap-3">

        {/* AI Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          🤖
        </div>

        {/* Typing Bubble */}
        <div className="rounded-2xl rounded-bl-md border border-border bg-card px-5 py-4">
          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-muted-foreground" />

          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            AI Coach is typing...
          </p>
        </div>

      </div>
    </div>
  );
}