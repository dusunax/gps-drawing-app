const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header>
      <nav className="h-nav bg-dark-surface px-6 flex items-center justify-between shadow-float">
        <h1 className="text-md font-semibold">GPS Drawing</h1>
        {children}
      </nav>
    </header>
  );
};

const NavBox = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-1">{children}</div>
  );
};

Header.NavBox = NavBox;

export default Header;
