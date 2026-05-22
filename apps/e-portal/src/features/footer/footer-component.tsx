const FooterComponent = () => {
  return (
    <div className="h-8 w-full bg-secondary bottom-0 fixed z-10">
      <p className="text-white text-center text-sm mt-2 font-sans">
        Copyright © {new Date().getFullYear()} Crossworld Marine Services Inc.,
        Employee Portal
      </p>
    </div>
  );
};

export default FooterComponent;
