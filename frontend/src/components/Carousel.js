import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import euro1 from '../images/euro1.jpg';
import euro2 from '../images/euro2.jpg';
import euro3 from '../images/euro3.jpg';
import './Carousel.css'; 

const items = [
  {
    src: euro1,
    altText: '',
    caption: 'Equipos de la fase final',
    key: 1,
  },
  {
    src: euro2,
    altText: 'Compuesta por un 92,5% de plata y el resto de cobre',
    caption: 'Copa de la Eurocopa',
    key: 2,
  },
  {
    src: euro3,
    altText: 'Campeona de la Eurocopa 2024',
    caption: 'Selección de España',
    key: 3,
  },
];

export default function CarouselComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} className="carousel-image"/>
        <CarouselCaption
          captionText={item.altText}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <div className="carousel-container"> 
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      fade={true} // Agregamos la propiedad fade
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
    </div>

  );
}

