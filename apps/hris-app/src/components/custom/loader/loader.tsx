const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-sm z-50">
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 bg-primary rounded-full animate-ball-jump shadow-2xl relative z-10" />
        <div className="w-10 h-2 bg-black/20 rounded-[100%] absolute -bottom-8 animate-shadow-pulse blur-[2px]" />
      </div>
      <span className="mt-12 text-md font-medium text-primary animate-pulse tracking-widest uppercase">
        Please wait. While data is loading...
      </span>
    </div>
  )
}

export default Loader
