const Header = ({ courseName }) => {
    return (
    <>
        <h1>{courseName}</h1>
    </>
    )
}

const Content = ({ parts })=> {
    return (
    <div>
        {parts.map( (part) => {
        return <Part key={part.id} name={part.name} num={part.exercises} />
        })}
    </div>
    )
}

const Part = (param) => {
    return (
    <>
        <p>{param.name} {param.num}</p>
    </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce( (sum, part) => {
    return sum + part.exercises
    }, 0)

    return (
    <>
        <p> 
        <b>
            total of {total} exercises
        </b>
        </p>
    </>
    )
}

const Course = ({ course }) => {
    return (
    <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    )
}

export default Course
