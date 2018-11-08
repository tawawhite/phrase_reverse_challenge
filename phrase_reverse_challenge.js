// https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex
//punctuation charactors
const PUNCT_RE = /([\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~])+/
const START_OF_WORD = 0
const END_OF_WORD = 1

const punctRecord = (idx,pos,punct)=> ({idx,pos,punct}) //punctuation placeholder

//Recursively processes the str input, which is substring of the phrase
//find words in the str delimited by punctuations in PUNCT_RE and collects them in striped_words array
//additionally tracks punctuations and how they relate to the words (idx in striped_words and if it is in the start or end of the word) 
//in order to rebuild reverse  
const process_string = (str, striped_words, punctuations) => {
  let punct = PUNCT_RE.exec(str)
  if(!punct) {
    striped_words.push(str)
  } else {
    let p = punct[0]
    let plen = p.length
    let word_idx = punct.index

    if(word_idx+plen === str.length) { //punctuation found at end of word 
      if(str!==p) { //word with punctuation (word!)
        punctuations.push(punctRecord(striped_words.length,END_OF_WORD,p+" "))
        striped_words.push(str.slice(0,word_idx))
      } else { //no word, just punctuation ( ! )
        if(punctuations.length === 0) { //start of phrase
          punctuations.push(punctRecord(striped_words.length,START_OF_WORD, p + " "))
        } else { //otherwise append new punct record to previous punct record
          last_punct_record = punctuations[punctuations.length-1]
          last_punct_record.punct += p + " "
        }
      }
    } else if(word_idx===0) { //punctuation found at start of word 
      
      punctuations.push(punctRecord(striped_words.length,START_OF_WORD,p))
      str = str.slice(plen)
      process_string(str, striped_words, punctuations)
    
    } else { //punctuation found between two words
      
      let first = str.slice(0,word_idx)
      
      punctuations.push(punctRecord(striped_words.length,END_OF_WORD,p))
      striped_words.push(first)

      process_string(str.slice(word_idx+plen), striped_words, punctuations)
    }
  }
}

//reverses the words in the phrase, while leaving punctuation intact
const reverse_phrase = (phrase_input) => {

  const striped_words = []
  const punctuations = []
  const unprocessed_substrings = phrase_input.split(" ") //initial words list
  
  //separate the words and punctuations into striped_words and punctuations
  unprocessed_substrings.forEach(str=>{
    //trim whitespace and ignore empty substrings
    str = str.trim()  
    if(str !== "") { 
      process_string(str, striped_words, punctuations)
    }
  })

  //reverse words
  striped_words.reverse()

  //rebuild phrase by injecting the punctuations around the reversed words 
  punctuations.forEach(r=>{
    let w = striped_words[r.idx]
    if(r.pos === START_OF_WORD) {
      striped_words[r.idx] = `${r.punct}${w? w: ""}`
    } else { //=== END_OF_WORD
      striped_words[r.idx] = `${w? w: ""}${r.punct}`
    }
  })
  return striped_words.join("").trim()
}

exports.reverse_phrase = reverse_phrase
