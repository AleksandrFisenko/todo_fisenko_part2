// const arr = [{x: 1}, {x: 2}, {x: 3}, {x: 4}]
// const a = {x: 3}

// // сумма значений
// console.log("Sum: ", arr.reduce((acc, element) => {return acc+element.x}, 0))
// // сумма четных значений
// console.log("Sum2: ", arr.reduce(
//   (acc, element) => 
//     {
//       return ((element.x % 2 == 0) ? acc+element.x : acc + 0)
//     }
//   , 0)
// )
// // найти а в arr
// console.log( arr.find(element => element.x === a.x) )
// // (*3)
// console.log( arr.map(elem => { return {x:elem.x * 3} }) )









// const div = document.createElement("div")
// const a = document.createElement(`a`)
// // div.innerHTML = `<a href="ya.ru">MyLink</a>`
// a.href = "ya.ru"
// a.innerHTML = "MyLonk"
// div.append(a)
// document.body.append(div)







// const arr = [1, 2, 3]
// const sumElements = (array, acc = 0) => {
//   if(array.length){
//     acc += array.pop()
//     return sumElements(array, acc)
//   }else {
//     return acc
//   }
// }
// console.log(sumElements(arr, 0))


const arr = [1, 2, 3]
const sumElements = (array, acc = 0) => {
  const elem = array.pop()
  if(elem !== undefined){
    acc += elem
    return sumElements(array, acc)
  }else return acc;
}
console.log(sumElements(arr))








































// #1
// let a =1, b=1
// let c = ++a
// let d = b++
// console.log(a)
// console.log(b)
// console.log(c)
// console.log(d)

// #2
// let a =1, d=3
// let c = ++a
// let p = d++
// let e = 3 + ++a
// let f = d++ + p++
// console.log(a)
// console.log(d)
// console.log(c)
// console.log(p)
// console.log(e)
// console.log(f)

// #3
// let a = 2
// let x = 1 + (a*=2)
// console.log(a)
// console.log(x)

// #4
// console.log(""+1+0)
// console.log(""-1+0)
// console.log(true + false)
// console.log(6/"3")
// console.log("2"*"3")
// console.log(4+5+"px")
// console.log("$"+4+5)
// console.log("4"-2)
// console.log("4px"-2)
// console.log(7/0)
// console.log(" -9 "+5)
// console.log(" -9 "-5)
// console.log(null + 1)
// console.log(undefined + 1)
// console.log("\t\n"-2)

// #5
// const one = (false || {} || null)
// const two = (null || false || "")
// const three = ([] || 0 || true)
// console.log(one,two,three)

// #6
// console.log(5>4)
// console.log("ананас">"яблоко")
// console.log("2">"12")
// console.log(undefined == null)
// console.log(undefined === null)
// console.log(null == "\n0\n")
// console.log(null === +"\n0\n")
// console.log(true == "true")

// #7
// alert(null || 2 || undefined)

// #8
// let a = [1,2,3]
// let b = a
// b.push(4)
// console.log(a)

// #9
// let a = ['pxp','ruby']
// a.length = 0
// a.push('java')
// console.log(a)

// #10
// console.log(parseInt("A", 16))
// console.log(parseInt('123abc'))
// console.log(parseInt('abc123'))
// console.log(parseInt('a123bc'))
// console.log(parseInt('1234.568p'))
// console.log(parseFloat('A.22', 16))
// console.log(parseFloat('123abc'))
// console.log(parseFloat('123.45.67'))
// console.log(2.16.toFixed(1))
// console.log(1.15.toFixed(1))
// console.log(1.toFixed(1))

// #11
// let a = 0.123 + (0.4567.toFixed(3))
// console.log(a)

// #12
// let fruits = ['z','t','a']
// let shoppingCart = fruits
// shoppingCart.push('banano')
// console.log(fruits.length)

// #13
// const arr1 = [0, -1, 5, 3, 0, 10, 0, -7]
// const arr2 = [1, -5, -3, -10, 0, 7]
// function replaceArrayElementa(){
//   arr1.length = 0
//   arr2.forEach((item) => {
//     arr1.push(item)
//   })
// }
// replaceArrayElementa()
// arr1.push(111111)
// console.log(arr1)
// console.log(arr2)

// #14
// var foo = 1
// function bar(){
//   if(!foo){
//     var foo = 10
//   }
//   console.log(foo)
// }
// bar()

// #15
// function sayHi(){
//   console.log(name)
//   console.log(age)
//   var name = 'Lydia'
//   let age = 21
// }
// sayHi()

// #16

// #17
// console.log(true && 2 && 0)
// console.log(true && 2 && 258)
// console.log("qwe" && 2 && undefined)
// console.log(null || 2 && undefined)
// console.log(false || (2||"hi") && null || (2 || true))
// console.log("qwer" || 2 && false || null)
// console.log(null || "fgh" || undef)
// console.log(true && null && 258)
// console.log(null || "fgh" || 2)

// #18
// let a = {b:1}
// let b = a
// console.log({b:1} === a)
// console.log({b:1} === {b:1})
// console.log({} === {})
// console.log(a === a)
// console.log(a === b)

// #19
// console.log(null + 1)
// console.log(null + "прпрп")
// console.log(undefined + 1)
// console.log(undefined + "abc")
// console.log()
// console.log()
// console.log()
// console.log()

// #20
// let arr = [{value: 1},{value: 2}]
// console.log(arr.reduce((acc,item) => {return acc + item.value}))
// console.log(arr.reduce((acc,item) => {return acc + item.value}, ""))
// console.log(arr.reduce((acc,item) => {return acc + item.value}, 0))

// let arr1 = [1,2]
// console.log(arr1.reduce((acc,item) => {return acc + item}))

// #21
// console.log(!!null)
// console.log(!!"")
// console.log(!!undefined)
// console.log(!![])
// console.log(!!{})
// console.log(!!NaN)
// console.log(!!5)
// console.log(!!0)

// #22
// console.log(0/0)
// console.log(15/0)
// console.log(-15/0)

// #23
// const apple = 5
// apple = 10

// const apple
// apple = 10

// const apple = {b:5}
// apple = {b:10}

// function test(){
//   alert(window)
//   var window = 5
//   alert(window)
// }
// test()

// function test(){
//   alert(window)
//   let window = 5
//   alert(window)
// }
// test()

// var f = function g() {return 23;};
// console.log(typeof g())
// console.log(typeof f())
// console.log(typeof f)

// #24
// console.log(NaN === NaN)
// console.log((0.1+0.2) === 0.3)
// console.log(null == null)
// console.log(undefined == undefined)
// console.log(undefined == null)
// console.log(undefined === null)
// console.log('2'>'44')
// console.log('a'>'A')
// console.log('a'>'1')
// console.log('A'>'1')
// console.log('A'>'Z')
// console.log(true == 'true')
// console.log('true' == true)
// console.log([0] == 0)
// console.log([2,2] == '2,2')
// console.log('2'>'14')

// #25
// console.log('number'+5+1)
// console.log(5+1+'number')
// console.log('five' + + 'two')
// console.log(undefined+1)
// console.log(-Infinity + Infinity)

// #26
// let a = {b:5}
// let b = {n:1}
// c = b
// x = 84
// a.z = b.n
// a.e = {a:b}
// a.e.m = {v:8}
// console.log(a)

// #27
// let x = {y:5}
// let y = x
// let z = y
// x.z = 84
// let f = x.z
// let e = {a:z}
// e.a.z.f = {y:8}
// console.log(e)
// console.log(e.a)
// console.log(x)


















// tests
// let arr = [{a: 1}, {a: 2}, {a: 3}];
// let index = arr.findIndex(obj => obj.a === 3);
// console.log(index);

// let arr = ["gerg", "ergerg", "egeg", "gegeg"]
// console.log(arr.join())

// let now = Date.now()
// console.log(now)


// function myFunction() {
//   console.log("Функция вызвана через 10,5 секунд");
// }

// setTimeout(myFunction, 10500);

//let arr = [242, 353, 21, 54, 34534, 433, 345, 2, 2000]
// console.log(arr.sort((a,b)=>{if(a>b)return 1; if(a==b)return 0; if(a<b)return -1;}))

// console.log(arr.find(element => element >= 2000))
// console.log(arr.filter(element => element >= 2000))

// console.log(arr.some(element => element >= 2000000))
// console.log(arr.every(element => element >= 2000))

// console.log([].reduce((acc, element) => {return acc+element}))


//console.log(arr)

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// console.log(arr.forEach(element => { console.log(element) }))
// console.log(arr)

// console.log()


// let obj1 = {
//   a:44,
//   b:"fwfew",
//   c:{
//     agg:"ff",
//     ggggg:234
//   }
// }
// console.log(obj1)
// obj1 = JSON.stringify(obj1)
// console.log(obj1)
// obj1 = JSON.parse(obj1)
// console.log(obj1)


// const a = 33
// try{
//   a = 34
// }catch(e){
//   console.log(e.name)
// } finally{
//   console.log(a)
// }


// Последовательность Фибоначчи
// const ggg = (num) => {
//   //if(num < 2) return num;
//   //return ggg(num-1) + ggg(num - 2)
//   return (num < 2) ? num : ggg(num-1) + ggg(num - 2)
// }

// const gggg = (num) => (num < 2) ? num : gggg(num-1) + gggg(num - 2)
// gggg(9);
// let arrFib = []
// for(let i = 0; i<10; i++) arrFib.push(ggg(i));
// console.log(arrFib)

// const rofol = function r(obj) {
//   for(const key in obj){
//     if(typeof(obj[key]) === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
//       r(obj[key])
//     }else{
//       console.log(obj[key])
//     }
//   }
// }

// const rofol2 = function r(obj) {
//   if(typeof(Object.values(obj)[0]) === 'object' && Object.values(obj)[0] !== null && !Array.isArray(Object.values(obj)[0])) {
//     r(Object.values(obj)[0])
//   }else{
//     console.log(Object.values(obj)[0])
//   }
// }


// const a = {
//   x:{
//     y:{
//       z:5
//     }
//   }
// }

// const b = {
//   a:{
//     c:[1,2]
//   }
// }

// const c = {
//   x:{
//     y:null
//   }
// }

// const d = {
//   x:[]
// }

// rofol2(a)
// rofol2(b)
// rofol2(c)
// rofol2(d)


// console.log(Object.keys(a)[0])
// console.log(Object.values(a)[0])


// let srt = "hoo ho ho hehe"
// console.log(srt.slice(0,1) + "5" + srt.slice(2,srt.length))
// console.log(srt.substr(0,1) + "5" + srt.substr(2,srt.length))
// console.log(srt.substring(0,1) + "5" + srt.substring(2))

// const str = "egesrgesgegesg egerg ergheh"
// console.log(str.split(' ').join(" "))


// const obj1 = {
//   x:{
//     y:{
//       z:5
//     }
//   }
// }

// console.log(JSON.stringify(obj1))
// console.log( JSON.parse(JSON.stringify(obj1)) )

// const arr = [{x: 1}, {x: 2}, {x: 3}, {x: 4}]
// const a = {x: 3}

// // сумма значений
// console.log("Sum: ", arr.reduce((acc, element) => {return acc+element.x}, 0))
// // сумма четных значений
// console.log("Sum2: ", arr.reduce(
//   (acc, element) => 
//     {
//       return ((element.x % 2 == 0) ? acc+element.x : acc + 0)
//     }
//   , 0)
// )
// // найти а в arr
// console.log( arr.find(element => element.x === a.x) )
// // (*3)
// console.log( arr.map(elem => { return {x:elem.x * 3} }) )