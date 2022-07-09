import React, { useEffect, useState} from "react";
import ValueFinder from "../apis/ValueFinder";
import axios from "axios";

const EditPage = ()=>{
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response = await ValueFinder.post("/AddBook",{
                book_name: name,
                author: author
            })
            console.log(response)
        }catch(err){}
    }
    
    const handleDelete = async(id)=>{
        try{
            const response = await ValueFinder.delete(`/DeleteStudent/${id}`)
            console.log(response)
            }
        catch(err){}
    }

    const handleBookDelete = async(id)=>{
        try{
            console.log(id)
            const response = await ValueFinder.delete(`/DeleteBook/${id}`)
            console.log(response)
            }
        catch(err){}
    }

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleAdd = async(e)=>{
        e.preventDefault()
        try{
            const response = await ValueFinder.post("/AddStudent",{
                first_name: firstName,
                last_name: lastName
            })
            console.log(response)
        }catch(err){}
    }


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
    <div className="font-weight-light display-1 text-center">Edit Page</div>
    <div className="mb-5">
        <form action="">
            <div className="form-row">
                <div className="col">
                    <input value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control" placeholder="Book Name"/>
                </div>
                <div className="col">
                    <input value={author} onChange={e=>setAuthor(e.target.value)} className="form-control" type="text" placeholder="Author"/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
            </div>
        </form>
    </div>
    <div className="mb-5">
        <form action="">
            <div className="form-row">
                <div className="col">
                    <input value={firstName} onChange={e=>setFirstName(e.target.value)} type="text" className="form-control" placeholder="First Name"/>
                </div>
                <div className="col">
                    <input value={lastName} onChange={e=>setLastName(e.target.value)} className="form-control" type="text" placeholder="Last Name"/>
                </div>
                <button onClick={handleAdd} type="submit" className="btn btn-primary">Add</button>
            </div>
        </form>
    </div>
    <div className="list-group">
        <div className="font-weight-light display-4 text-center">
        List of Students
        </div>
            <table className="table Table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student=>{
                        return (
                        <tr>
                            <td>{student.first_name}</td>
                            <td>{student.last_name}</td>
                            <td><button className="btn btn-warning">Update</button></td>
                            <td><button onClick={()=>handleDelete(student.std_id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        ) 
                    })}
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
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
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
                            <td><button className="btn btn-warning">Update</button></td>
                            <td><button onClick={()=>handleBookDelete(book.book_id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        ) 
                    })}
                </tbody>
            </table>
        </div>

    {/* <div className="list-group">
            <table className="table Table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jordan</td>
                        <td>Peterson</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                </tbody>
            </table>
    </div> */}
    </div>
}

export default EditPage