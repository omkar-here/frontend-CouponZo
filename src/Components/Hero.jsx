import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";

function Hero() {
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1 class="max-w-2xl mb-4 text-4xl text-left text-gray-700 font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            CouponZo
          </h1>
          <p class="max-w-2xl text-left mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            CouponZo headless promotion engine for generating coupon codes.This
            is an coupon generator platform that allows businesses of all sizes
            to create and distribute coupons easily and efficiently.
          </p>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <div className="flex flex-col w-full">
            <img
              src={pic1}
              alt="HeroImg"
              className="w-72 origin-bottom -rotate-12"
            />
            <img
              src={pic2}
              alt="HeroImg"
              className="w-72 origin-bottom rotate-12 self-end"
            />
            <img
              src={pic3}
              alt="HeroImg"
              className="w-72 origin-bottom -rotate-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
