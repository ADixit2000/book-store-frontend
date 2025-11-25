import React, { useEffect, useState, useRef } from "react";
import BookCard from "../books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
  "All Categories",
  "business",
  "fiction",
  "marketing",
  "Adventure",
];

const TopSellers = () => {
  // const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // useEffect(() => {
  //   fetch("books.json ")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  const { data } = useFetchAllBooksQuery();
  const books = data?.books ?? [];

  const filteredBooks =
    selectedCategory === "All Categories"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      {/* category filter */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-gray-100 hover:bg-gradient-to-b from-[#D0E4E4] to-[#3ECECE] border-green-800 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        freeMode={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
