import { Loader } from '../Common/Loader';

export const FallbackPage = () => {
  return (
    <section className="flex justify-center align-middle w-full">
      <Loader />
      <h2 className="mt-5">Loading page data...</h2>
    </section>
  );
};
