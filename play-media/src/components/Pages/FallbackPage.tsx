import { Loader } from '../Common/Loader';

export const FallbackPage = () => {
  return (
    <section className="flex flex-col justify-center items-center w-full h-[80vh]">
      <Loader />
      <h2>Loading page data...</h2>
    </section>
  );
};
