import React from 'react';
import './BookOfTheWeek.css';
import { BookInformation } from '../../../book';

export const BookOfTheWeek: React.FC = () => {
    return (
        <div className="book-of-the-week">
            <h1>Book of the Week:</h1>
            <BookInformation
                book={{
                    _id: "1234",
                    barcode: "1234",
                    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1679700759i/123829884.jpg",
                    title: "Java: The Ultimate Beginner's Guide to Learn Java Quickly With no Prior Experience",
                    authors: ["Mark Reed"],
                    description: "Immerse yourself in the wealth of notions, exercises and practical examples made easily digestible for effortless learning and prompt gratification. You will be amazed at the rapid progress as you move forward through the book's contents toward total savvy.",
                    subjects: ["java", "learning"],
                    publicationDate: new Date("2020-01-01"),
                    publisher: "some publisher",
                    pages: 200,
                    genre: "Non-fiction",
                    records: []
                }}
            />
        </div>
    );
};
