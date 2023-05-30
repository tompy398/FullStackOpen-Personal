const x = 1
let y = 5
console.log(x, y)
y += 10
console.log(x, y)
y = 'sometext'
console.log(x, y)
//x = 4

const t = [1, -1, 3]
t.push(5)
console.log(t.length)
console.log("Some value", t[1])
t[1] = 5
console.log("Some changed value", t[1])
console.log("While this is okay to do, it is discouraged?")
console.log("So apparently, to follow the React standard we want to create new arrays every time")
console.log("The primary reason being that React does a lot of things based on state changes so it would be best to use functions.")
t.forEach(value => {
    console.log(value)
})

const t1 = [1, -1, 3]
const t2 = t1.concat(5)
console.log(t1)
console.log(t2)

console.log("To add new properties that have a space in between their name it must be in brackets")