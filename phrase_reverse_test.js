const assert = require("assert")
const {reverse_phrase} = require("./phrase_reverse_challenge")
//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const Reset = "\x1b[0m"
const FgGreen = "\x1b[32m"
const FgBlue = "\x1b[34m"


//list of input and expected output for the phrase reverse challenge  
const test_phrases = [
  [ "", 
    ""  ],
  [ "!", 
    "!" ],
  [ "one",
    "one" ],
  [ "one!",
    "one!"  ],
  [ "[one]",
    "[one]" ],
  [ "one,two", 
    "two,one" ],
  [ "one, two", 
    "two, one"  ],
  [ "one,[two]", 
    "two,[one]" ],
  [ "one,[two]!?",
    "two,[one]!?" ],
  [ "!one,two!", 
    "!two,one!" ],
  [ "one, two, three!", 
    "three, two, one!"  ],
  [ "one, two,three!", 
    "three, two,one!" ],
  [ "! one, two,three!", 
    "! three, two,one!" ],
  [ "one, two,three! !", 
    "three, two,one! !" ],
  [ "one, !? two,three!", 
    "three, !? two,one!" ],
  [ "{one: 'two,three!'}", 
    "{three: 'two,one!'}" ],
  [ "{one:   'two,three!'}", 
    "{three: 'two,one!'}" ],
]
const run = () => {
  test_phrases.forEach((arr,idx)=>{
    const reversed = reverse_phrase(arr[0])
    assert.equal(reversed, arr[1])
    console.log(`${FgGreen}Success.${Reset} ${idx} input=${FgBlue}${arr[0]}${Reset}; reversed=${FgBlue}${reversed}${Reset}; expected=${FgBlue}${arr[1]}${Reset};`)
  })
}
run()

