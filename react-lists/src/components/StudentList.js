function StudentList() {
    const students = ["Marc","Lucy","Anna"];

    return (
        <div className="list">
        <h2>Student List</h2>

        {students.map((name, index)=> {
            return <p key={index}>{ name }</p>
        })}
        </div>
    )

}

export default StudentList