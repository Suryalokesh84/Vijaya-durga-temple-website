import  { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1; // Increment scroll position
        // If scroll reaches the end, reset to 0 (seamless effect)
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };
    const intervalId = setInterval(scroll, 10); // Adjust speed by changing interval

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <section className="sec1" ref={scrollRef}>
      <div className="image-container">
        {/* First set of images */}
        <img src="/images/temple1.jpg" alt="Temple Image 1" />
        <img src="/images/temple2.jpg" alt="Temple Image 2" />
        <img src="/images/temple3.jpg" alt="Temple Image 3" />
        <img src="/images/temple4.jpg" alt="Temple Image 4" />
        <img src="/images/temple5.jpg" alt="Temple Image 5" />
        <img src="/images/temple11.jpg" alt="Temple Image 6" />

        {/* Duplicate the images for seamless scrolling */}
        <img src="/images/temple1.jpg" alt="Temple Image 1" />
        <img src="/images/temple2.jpg" alt="Temple Image 2" />
        <img src="/images/temple3.jpg" alt="Temple Image 3" />
        <img src="/images/temple4.jpg" alt="Temple Image 4" />
        <img src="/images/temple5.jpg" alt="Temple Image 5" />
        <img src="/images/temple11.jpg" alt="Temple Image 6" />
      </div>
    </section>
  );
};

export default Home;
