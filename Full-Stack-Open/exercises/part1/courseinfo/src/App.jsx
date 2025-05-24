const Header = ({course}) => <h1>{course}</h1>

const Content = (props) => {

    const Part = ({part, exercises}) => {
        return (
            <p>{part} {exercises}</p>
        )
    }

    return (
        <div>
            <Part part={props.part1} exercises={props.exercises1} />
            <Part part={props.part2} exercises={props.exercises2} />
            <Part part={props.part3} exercises={props.exercises3} />
        </div>
    )
}

const Total = ({x, y, z}) => <p>Number of exercises {x + y + z}</p>

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

  const part1 = course.parts[0]
  const part2 = course.parts[1]
  const part3 = course.parts[2]

  return (
    <div>
      <Header course={course.name} />
      <Content part1={part1.name} exercises1={part1.exercises} 
               part2={part2.name} exercises2={part2.exercises} 
               part3={part3.name} exercises3={part3.exercises} />
      <Total x={part1.exercises} 
             y={part2.exercises} 
             z={part3.exercises} />
    </div>
  )
}

export default App