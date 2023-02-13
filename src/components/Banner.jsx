import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";

export default function Banner({ scroll }) {
  const [banner, SetBanner] = useState([]);

  useEffect(() => {
    fetch(`data/banner.json`)
      .then((res) => res.json())
      .then((data) => {
        SetBanner(data);
      });
    return () => {
      // data가 사라질 때 동작 작성
    };
  }, []);
  return <Slider data={banner} scroll={scroll} />;
}
