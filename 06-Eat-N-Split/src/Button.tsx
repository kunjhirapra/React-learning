export function Button({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) {
  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
}
