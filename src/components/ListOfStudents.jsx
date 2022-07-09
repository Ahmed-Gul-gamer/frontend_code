import axios from "axios";
import React, { useEffect, useState } from "react";

const ListOfStudents = ()=>{
    const [students, setStudents] = useState([])
    const [books, setBooks] = useState([])

    const fetchData = async()=>{
        const getStudents = await axios.get("http://localhost:5000/listOfStudents")
        const getBooks = await axios.get("http://localhost:5000/listOfBooks")
        axios.all([getStudents, getBooks]).then(
            axios.spread((...allData) =>{
                const allStudents = allData[0].data
                const allBooks = allData[1].data

                setStudents(allStudents)
                setBooks(allBooks)
            })
        )}
        useEffect(()=>{
            fetchData()
        },[])

    return <div className="container">    
        <div className="list-group">
        <div className="font-weight-light display-4 text-center">
        List of Students
        </div>
            <table className="table Table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student=>{
                        return (
                        <tr>
                            <td>{student.first_name}</td>
                            <td>{student.last_name}</td>
                        </tr>
                        ) 
                    })}
                    {/* <tr>
                        <td>Jordan</td>
                        <td>Peterson</td>
                    </tr> */}
                </tbody>
            </table>
            <div className="font-weight-light display-4 text-center">
            List of Books
            </div>
            <table className="table Table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Book Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Borrowed By</th>
                        <th scope="col">Date of Borrow</th>
                        <th scope="col">Date of Return</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>{
                        return (
                        <tr>
                            <td>{book.book_name}</td>
                            <td>{book.author}</td>
                            <td>{book.borrowed_by}</td>
                            <td>{book.date_of_borrow}</td>
                            <td>{book.date_of_return}</td>
                        </tr>
                        ) 
                    })}
                    {/* <tr>
                        <td>The Shining</td>
                        <td>J Peterson</td>
                        <td>Mike Tyson</td>
                        <td>2022-07-10</td>
                        <td>2022-08-11</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    </div>
}

export default ListOfStudents