import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import BookCard from "../books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Recommended = () => {
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   fetch("books.json ")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  const { data } = useFetchAllBooksQuery();
  const books = data?.books ?? [];
  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        freeMode={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.slice(8, 18).map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
