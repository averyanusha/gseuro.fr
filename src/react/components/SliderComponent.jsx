    import React, { useEffect, useRef } from 'react';
    import { useKeenSlider } from 'keen-slider/react'; // Ensure keen-slider is installed

    export default function PartnerSlider() {
      const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        mode: 'free-snap',
        slides: {
          perView: 3,
          spacing: 10,
        },
        breakpoints: {
          '(min-width: 768px)': {
            slides: { perView: 4, spacing: 15 },
          },
          '(min-width: 1024px)': {
            slides: { perView: 5, spacing: 20 },
          },
        },
      });

      // Autoplay functionality (optional, can be removed if keen-slider's built-in autoplay is used)
      useEffect(() => {
        let interval;
        if (instanceRef.current) {
          interval = setInterval(() => {
            instanceRef.current.next();
          }, 2000); // Adjust interval for speed
        }
        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      }, [instanceRef]);

  const brands = [
    'img/kablo.png',
    'img/alcobre.png',
    'img/pramcro.png',
    'img/cpreylec-logo.PNG',
    'img/elydan.png'
  ]

  return (
        <div className="keen-slider">
          {brands.map((src, i) => (
            <div className="keen-slider__slide" key={i}>
              <img src={src} alt={`Brand ${i}`} />
            </div>
          ))}
        </div>
    );
}