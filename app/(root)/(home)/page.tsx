const Home = () => {
  var today = new Date();
  const currentTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const todayDate = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  }).format(today);
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover p-8">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p11">
          <h2 className="glassmorphism max-w-[270px] rounded py-4 text-center text-base font-normal">
            Upcoming meeting at 12:30AM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className=" text-4xl font-extrabold lg:text-7xl">
              {`${currentTime || ""}`}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {todayDate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
