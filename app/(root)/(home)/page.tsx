import MeetingTypeList from "@/components/Home/MeetingTypeList";
import TimeAndDate from "@/components/TimeAndDate";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover p-8">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p11">
          <h2 className="glassmorphism max-w-[270px] rounded py-4 text-center text-base font-normal">
            Upcoming meeting at 12:30AM
          </h2>
          <TimeAndDate />
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
