const Course = ({courses}) => {
    return (
        <div>
            {courses.map(course =>
            <div key= {course.id}>
            <Header course = {course.name}/>
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
            </div>
            )}
        </div>
)}


const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => {
                return (
                    <Part key={part.id} part={part}/>
                )
            }
            )} 
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
    <div>
        <p><strong>Total of {total} exercises</strong></p>
        <br/>
    </div>
    )
}

 export default Course