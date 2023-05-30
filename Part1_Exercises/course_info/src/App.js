const Header = (param) => {
  return (
    <>
      <h1>{param.course}</h1>
    </>
  )
}

const Content = (param) => {
  return (
    <div>
      <Part name={param.p_name1} num={param.e_num1}/>
      <Part name={param.p_name2} num={param.e_num2}/>
      <Part name={param.p_name3} num={param.e_num3}/>
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

const Total = (param) => {
  return (
    <>
      <p>Number of exercises {param.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p_name1={part1} p_name2={part2} p_name3={part3} e_num1={exercises1} e_num2={exercises2} e_num3={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App