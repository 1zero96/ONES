import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => <span {...props}>{children}</span>;

export default function Carousel({ data }) {
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: (
      <SlickButtonFix>
        <MdArrowForwardIos size="32" />
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <MdArrowBackIos size="32" />,
      </SlickButtonFix>
    ),
  };

  return (
    <section className="mx-auto carousel relative w-screen max-w-screen-2xl dark:bg-black dark:text-white">
      <Slider {...settings}>
        <div className={`h-96 bg-cover bg-banner1 opacity-80`}></div>
        <div className={`h-96 bg-cover bg-banner2 opacity-80`}></div>
        <div className={`h-96 bg-cover bg-banner3 opacity-80`}></div>
      </Slider>
    </section>
  );
}
