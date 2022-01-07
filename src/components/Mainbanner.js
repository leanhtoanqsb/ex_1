import { useState, useEffect, useRef } from "react";
import styles from "./Mainbanner.module.css";
import banner_1 from "assets/images/banner-1.png";
import banner_2 from "assets/images/banner-2.png";
import banner_3 from "assets/images/banner-3.png";
import banner_4 from "assets/images/banner-4.png";
import banner_5 from "assets/images/banner-5.png";

function Mainbanner() {
  const images = [
    { id: 1, src: banner_1 },
    { id: 2, src: banner_2 },
    { id: 3, src: banner_3 },
    { id: 4, src: banner_4 },
    { id: 5, src: banner_5 },
  ];
  const delay = 3000;

  const [index, setIndex] = useState([1, 0]);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => {
        return [
          prevIndex[0] === images.length ? 1 : prevIndex[0] + 1,
          prevIndex[0],
        ];
      });
    }, delay);
  }, [index, images.length]);

  const mainBannerSlideshow = images.map((image) => {
    return (
      <div
        key={image.id}
        className={styles.banner_big_inner}
        style={image.id == index[0] ? {opacity: 1} : {opacity: 0}}
      >
        <a href="/#">
          <img src={image.src} alt=""></img>
        </a>
      </div>
    );
  });
  /*  */
  let num = [];
  for (let i = 0; i < images.length; i++) {
    num.push(
      <a
        href="/#"
        key={images[i].id}
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: ` ${i + 1 === index[0] ? "black" : "white"}`,
          borderRadius: "50%",
          display: "inline-block",
          margin: "5px",
        }}
        onClick={(e) => {
          // clearTimeout(timeoutRef.current);
          e.preventDefault();
          setIndex((prevIndex) => {
            return [i + 1, prevIndex[0]];
          });
        }}
      >
        <span style={{ display: "none" }}>{i}</span>
      </a>
    );
  }
  return (
    <div
      className={styles.main_banner_wrap}
    >
      <div className={styles.main_banner_inner}>
        <div className={styles.main_banner_big}>{mainBannerSlideshow}</div>
        <div className={styles.main_banner_paging}>{num}</div>
      </div>
    </div>
  );
}

export default Mainbanner;
