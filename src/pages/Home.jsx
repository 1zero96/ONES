import Banner from "../components/Banner";
import Products from "../components/Products";

export default function Home() {
  return (
    <div className="w-full h-full dark:bg-black dark:text-white">
      <Banner />
      <div className="text-lg pt-16 mx-0 text-center">
        <p>NEW ARRIVAL</p>
      </div>
      <Products category={"NEW"} />
    </div>
  );
}
