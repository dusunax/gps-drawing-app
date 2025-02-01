export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header>
      <nav className="h-nav bg-dark-surface px-6 flex items-center justify-between shadow-float">
        <h1 className="text-md font-semibold">GPS Drawing</h1>
        {children}
      </nav>
    </header>
  );
}
