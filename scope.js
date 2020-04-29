const a = {
  data () {
    return {
      accept: true
    }
  },
  events: {
    HELO: (ctx) => {
      if (this.accept === true) {
        console.log(' IT WORKED!')
      } else {
        console.log('nnope', this)
      }
    },
    ELHO: (ctx) => {
      console.log(' ELHO', this.accept)
    }
  }
}

const instance = function () {
  const data = a.data()
  const i = {...data}
  const i = {...data, ...a.events}

  // Object.entries(a.events).forEach(([key, value]) => {
  //   i[key].bind()
  // })

  return i
}

const b = instance()
console.log(b)

b.HELO.call(b, 'asdf')
var c = b.HELO
c.bind(b)
c()


var obj = {name:"Niladri"};

var greeting = function(a,b,c){
    return "welcome "+this.name+" to "+a+" "+b+" in "+c;
};

console.log(greeting.call(obj,"Newtown","KOLKATA","WB"));