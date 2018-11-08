# String Phrase Reverse Challenge
Reverses words in a phrase while keeping punctuation intact (refer to the challenge prompt below).

# Assumptions 

## Punctuations
Punctuations are charactors that are not letters, numbers or spaces. Specifically, any of the charactors that match this regex:
```js
/([\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~])+/
```
See: https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex

## Whitespace
Whitespace impacts that string parsing, word extraction, and output in the following ways
1. Extra whitespace in the phrase is removed (e.g., "a   b" is reduced to "a b")
2. Words can be separated by punctuation only (no whitespace) and whitespace is not added in these cases (e.g., "a,b" will be reversed to "b,a")
3. Punctuation surrounded by whitespace is handled appropriately and maintains it's position in the phrase (e.g., "a ! b c" is reversed to "c ! b a") 

# Running tests
These tests require a recent version of Node (> v6). For instance, I am running v10.8:
```sh
$ node -v
v10.8.0
```
To run the tests:
```sh
node phrase_reverse_test.js
```
## Expectect output:
```sh
Success. 0 input=; reversed=; expected=;
Success. 1 input=!; reversed=!; expected=!;
Success. 2 input=one; reversed=one; expected=one;
Success. 3 input=one!; reversed=one!; expected=one!;
Success. 4 input=[one]; reversed=[one]; expected=[one];
Success. 5 input=one,two; reversed=two,one; expected=two,one;
Success. 6 input=one, two; reversed=two, one; expected=two, one;
Success. 7 input=one,[two]; reversed=two,[one]; expected=two,[one];
Success. 8 input=one,[two]!?; reversed=two,[one]!?; expected=two,[one]!?;
Success. 9 input=!one,two!; reversed=!two,one!; expected=!two,one!;
Success. 10 input=one, two, three!; reversed=three, two, one!; expected=three, two, one!;
Success. 11 input=one, two,three!; reversed=three, two,one!; expected=three, two,one!;
Success. 12 input=! one, two,three!; reversed=! three, two,one!; expected=! three, two,one!;
Success. 13 input=one, two,three! !; reversed=three, two,one! !; expected=three, two,one! !;
Success. 14 input=one, !? two,three!; reversed=three, !? two,one!; expected=three, !? two,one!;
Success. 15 input={one: 'two,three!'}; reversed={three: 'two,one!'}; expected={three: 'two,one!'};
Success. 16 input={one:   'two,three!'}; reversed={three: 'two,one!'}; expected={three: 'two,one!'};
```

# Original Challenge Prompt
String Phrase Reversal Challenge

You may use your favorite programming language, platform and/or IDE
It must be committed and reachable on a source control platform: Github or Gitlab, etc.
It should compile without errors or exceptions.

Write an application that will take any given string as input and will output the reverse order of the string phrase. 

"Hello World" becomes "World Hello" and "Everybody Wants To Rule The World" becomes "World The Rule To Wants Everybody".

Punctuation should not be altered and should remain in place. 
For example, "Hello World!" would become "World Hello!"
"Everybody wants, to rule the world?" should become "world the, rule to wants Everybody?"
