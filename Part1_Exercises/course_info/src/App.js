/*
// Exercise 1.3
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content p_name1={part1['name']} p_name2={part2['name']} p_name3={part3['name']} e_num1={part1['exercises']} e_num2={part2['exercises']} e_num3={part3['exercises']} />
      <Total total={part1['exercises'] + part2['exercises'] + part3['exercises']} />
    </div>
  )
}

*/
/*

// Exercise 1.4
const Header = (course) => {
  return (
    <>
      <p>{course[0]}</p>
    </>
  )
}

const Content = (holder) => {
  console.log(holder.parts[0].name);
  return (
    <div>
      <Part name={holder.parts[0]['name']} num={holder.parts[0]['exercises']} />
      <Part name={holder.parts[1]['name']} num={holder.parts[1]['exercises']} />
      <Part name={holder.parts[2]['name']} num={holder.parts[2]['exercises']} />
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

const Total = (holder) => {
  return (
    <>
      <p>Number of exercises {holder.parts[0]['exercises'] + holder.parts[1]['exercises'] + holder.parts[2]['exercises']}</p>
    </>
  )
}

const App = () => {
  const course = ['Half Stack application development']
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

*/


// Exercise 1.5
const Header = (course) => {
  return (
    <>
      <p>{course[0]}</p>
    </>
  )
}

const Content = (holder) => {
  console.log(holder.parts[0].name);
  return (
    <div>
      <Part name={holder.parts[0]['name']} num={holder.parts[0]['exercises']} />
      <Part name={holder.parts[1]['name']} num={holder.parts[1]['exercises']} />
      <Part name={holder.parts[2]['name']} num={holder.parts[2]['exercises']} />
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

const Total = (holder) => {
  return (
    <>
      <p>Number of exercises {holder.parts[0]['exercises'] + holder.parts[1]['exercises'] + holder.parts[2]['exercises']}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App