type PageFrameProps = {
  title: string;
  description?: string;
  afterDescription?: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
};

export function PageFrame({
  title,
  description,
  afterDescription,
  children,
  wide = false,
}: PageFrameProps) {
  return (
    <div
      className={`mx-auto px-4 py-8 sm:px-6 sm:py-10 ${wide ? "max-w-6xl" : "max-w-4xl"}`}
    >
      <header className="mb-8 pb-1">
        <h1 className="font-display text-2xl font-semibold text-primary sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {afterDescription}
      </header>
      {children}
    </div>
  );
}
