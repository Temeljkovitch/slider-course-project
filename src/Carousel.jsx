import { useEffect, useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteLeft } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [currentPerson, setCurrentPerson] = useState(0);

  const nextSlide = () => {
    // Using modules
    setCurrentPerson((oldPerson) => {
      const newPerson = (oldPerson + 1) % people.length;
      return newPerson;
    });

    // # Option 2
    // setCurrentPerson(currentPerson + 1);
    // if (currentPerson >= people.length - 1) setCurrentPerson(0);
  };
  const prevSlide = () => {
    // Using modules
    setCurrentPerson((oldPerson) => {
      const newPerson = (oldPerson - 1 + people.length) % people.length;
      return newPerson;
    });

    // # Option 2
    // setCurrentPerson(currentPerson - 1);
    // if (currentPerson <= 0) setCurrentPerson(people.length - 1);
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(sliderId);
  }, [currentPerson]);

  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? "visible" : "hidden",
            }}
            key={id}
          >
            <img className="person-img" src={image} alt={name} />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteLeft className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
