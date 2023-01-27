import { HeroBannerSection } from '../HeroBanner/HeroBannerSection';

export const AboutUsPage = () => {
  return (
    <section>
      <HeroBannerSection
        title=""
        imageSrc="https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/def8e638-4288-4482-51e5-08dad8591109/5a960059eed9440eb3c892738eef4ab1"
      >
        <div className="container rich-text text-xl space-y-10">
          <h1 className="text-center">The go-to source for sports news</h1>
          <p>
            An outstanding team of journalists is available 24/7 to ensure you never miss a
            performance of your favorite athlete. With us, you will discover many new items every
            day and make them available using the best and latest technology.
          </p>
          <p>
            Our goal is to provide interesting, current, and reliable information about sports. We
            are always on-site at the event and monitor it for you. It doesnt matter to us whether
            its a local tournament or a world championship. If your favorite team or athlete is in
            it, were there broadcasting for you.
          </p>
          <p>
            Every fan can find something for themselves: news, commentary, analysis, statistics, and
            interviews with some of the most interesting personalities in sports - athletes,
            coaches, and fans.
          </p>
          <p>
            Our services include providing packages of sports information categorized by topic and
            consisting of news, commentary, analysis, and live scores.
          </p>
        </div>
      </HeroBannerSection>
    </section>
  );
};
