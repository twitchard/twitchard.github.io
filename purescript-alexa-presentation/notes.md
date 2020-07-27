# Using Purescript to help Alexa take over the world

## Richard Marmorstein

Twitter: @twitchard
Github: github.com/twitter

# Alexa and Purescript are the future
Specifically, they are the immediate future between now and the end of the meetup, because Purescript and Alexa are the subjects of my talk.

They are significant to the future of software beyond just this talk.

## Alexa is the future.
The research firm Gartner thinks that by 2020, 75% of US households will contain a "smart speaker" like the Amazon Echo. Another research firm thinks only 55% by 2021. Whatever, it's trending. Amazon is the market leader right now -- in 2017, Amazon was estimated to be about 70% of the market, while Google was 24%.

Apple has the HomePod
Harman Kardon makes the "invoke" speaker, with Microsoft's Cortana.
Facebook is working on a video-enabled smart speaker
Samsung is working on a smart speaker that's supposed to come out this year.
There's also an open source voice assistant "Mycroft".

Not as big a market as say, smartphones obviously. But I think smart speakers will get better, people will become more used to interacting with them, and more products will integrate with them. Right now, voice is still somewhat of a novelty. I don't think that will last for long. In a couple of years, I think most consumer-facing software companies will be building experiences for voice.

There are two reasons why that excites me:

### It's cool
Talking to your computer is super cool. It's like Star Trek. You can even change the wake word to "computer" if you want to. I've always had conversations with my computer, especially while trying to solve a hard or frustrating problem. But now, talking to your computer can be a normal thing.

### Accessibility
Accessibility. I think the voice ecosystem is really exciting in terms of accessibility. For most software, I feel like accessibility, if it isn't completely neglected, becomes an afterthought. In my experience, we web developers barely have the will to support good experiences for people using older browser versions than we use, let alone people who are using screen readers. With voice, though, visually impaired folks get largely a first-class experience.

And it's not just greater accessibility for the visually impaired. People with physical disabilities that make it difficult or inconvenient to sit down at a computer or flip around on a smart phone -- or people who just aren't particularly computer literate -- it can be a lot more natural to accomplish something via a conversation with Alexa.
    
I think the main qualm people have about is the privacy issue the smart speaker life is that it feels like it's "always listening," and there's just something that feels wrong about having a device connected to Amazon that is constantly recording audio. According to Amazon, they don't record anything you say unless Alexa thinks it hears the wake word. But if Alexa does think she hear the word, Amazon keeps the recordings and they can be subpoenaed by law enforcement. For me, the convenience and entertainment value outweighs the privacy concern. But from now on I won't be conspiring to commit a crime with anybody named Alexa.


## Purescript is the future.

I've made the case for why I think Alexa is the future. But why Purescript? Do I honestly think that Purescript is the future?

Isn't Purescript a close relative to Haskell -- whose motto is "avoid success at all costs"?

Isn't Purescript the language whose Wikipedia article keeps getting deleted because the powers that be have determined it isn't 'notable' enough to deserve a Wikipedia article all to itself?

Yes, both of these things are true -- but I believe that Purescript is the future for one reason:

The New York Purescript Meetup

You are brilliant individuals, each and every last one of you. I can tell just by standing here, being in your presense. And I sense that before each of lies a great destiny.

For some of you, your destiny is to be inspired by this talk. While I'm telling you about Alexa Skills, your imagination will alight and your brain will produce an idea for the greatest Alexa skill of all time. After the meetup is over, the first thing you will type into your terminal is `git clone purescript-alexa-template`, and you will make your idea into a reality. You will implement the greatest Alexa skill of all time in Purescript, and because of your enormous success, Purescript will become the language of choice for implementing Alexa skills, and thus Purescript itself will become the language of the future. Maybe my talk should have been titled, using Alexa to help Purescript take over the world.

For others of you, your destiny is to remain completely unmoved by this talk. While I am up here gabbing on about Alexa, you'll be zoning out and thinking about how much you'd rather be hearing about something else. And then your imagination will alight. The idea for that something else will come to you, and you will concoct the outline of the greatest Purescript talk of all time. After the meetup is over, the first thing you will do is contact Dustin and sign up to give the talk at the next Purescript meetup. Your talk will inspire dozens and dozens of Purescript developers to new heights of functional programming excellence, and change the face of software forever.

Whatever you destiny, the future starts now. Together, we will bring an end to the dark era of software, the era of mutability, partial functions and run-time exceptions, and we will bring in a golden age of strong types, purity, peace, and monads.

Disclaimer: Everything Richard says represents his own views and not those of his employer, friends, or anybody else associated with him in any way.

## Back to Earth

* Secret Word
  - Based off a game called Jotto.
  - You say "Alexa, open secret word"
  - Alexa randomly picks a five-letter English word, and doesn't tell you.
  - You guess a five-letter words.
  - Alexa tells you how many letters in your guess are also in the secret word.
  - You keep going until you guess the secret word, or you give up.

* Anatomy of an Alexa Skill
  * Invocation Name
    - You need to give your skill a name. Your skill name can be one word if it's a trademark, otherwise it must be at least two words, and they can't be 'the', 'a', or 'an'.
    - Users query your skill in two ways:
      - without an intent i.e. "LaunchRequest": Alexa, open secret word.
      - with an intent i.e. "IntentRequest": Alexa, tell secret word to start a new game.
  * Session
    - Once users have queried your skill, you can start a "session", and can keep interacting with your skill
    - After each interaction, you can persist "session attributes" to be passed in with the next interaction, to keep track of where the user is at in the conversation.
    - For example, the session for secret word looks like this
        ```
        type Session = Maybe SessionRec
        type SessionRec =
          { secretWord :: String
          , guesses :: Array String
          , status :: Status
          }
        data Status = Normal | GivingUp | Loading
        -- GivingUp = we just asked, are you sure you want to give up?
        -- Loading = we just asked, do you want to pick up from where we left off last time?
        ```

  * Intents
    - An intent is how you figure out what the user is saying to your skill.
    - You define the 'intents' that your skill supports.
      - For example, secret word defines a GuessIntent and a GiveUpIntent.
    - For each intent, you define "sample utterances"
    - Alexa learns from those to later classify what users say into the intents for your skill.
      - For example, the sample utterances for secret word's "GuessIntent" are:
        ```
        samples:
          [ "Guess {Word}"
          , "I guess {Word}"
          , "My guess is {Word}"
          , "How about {Word}"
          ]
        ```
    - Amazon supplies 'built-in' intents like AMAZON.HelpIntent, AMAZON.YesIntent, AMAZON.NoIntent.
    - AMAZON.HelpIntent, AMAZON.StopIntent, and AMAZON.CancelIntent are required for certification.

  * Slots
    - Each intent may define multiple slots
    - A slot is a placeholder for a value inside an utterance
    - You can use a slot to capture a variable part of a users input literally.
    - For example, in secret word, the {Word} in `I guess {Word}` represents a slot.

    - Slots have types, so you can clue Alexa to listen for certain values over others.
    - Alexa contains built-in slot types, like AMAZON.NUMBER, or AMAZON.DURATION
    - You can define your own slot type, with examples.
    - Slots are not guaranteed to always be present/contain a value, even if all sample utterances
      contain the slot.
    - Slot values are not confined to the enumerated values of the slot type.
      - If your user says "my favorite day of the week is pizza", Alexa probably will pass "pizza"
        to your skill even if your slot type is "AMAZON.DayOfWeek"

  * Speech output
    - Speech output is fairly simple. You give Alexa some text, and she says it.
    - If you decide you want to start/continue a session, the user has 8 seconds to respond.
    - You can set a "reprompt" and if the user doesn't respond, the reprompt will be delivered.
    - The user has another 8 seconds after that. If they say nothing, the session ends.

  * SSML
    - SSML is a markup language that gives Alexa hints on how to emphasize or pronounce text.
      ```
      <speak>
      You say, <phoneme alphabet="ipa" ph="pɪˈkɑːn">pecan</phoneme>. 
      I say, <phoneme alphabet="ipa" ph="ˈpi.kæn">pecan</phoneme>.
      </speak> 
    - SSML let's you make Alexa whisper.
      ```
        <speak>
            I want to tell you a secret. 
            <amazon:effect name="whispered">I am not a real human.</amazon:effect>.
            Can you believe it?
        </speak>
      ```
    - You can also embed mp3s shorter than 90 seconds.
      ```
      <speak>
        Welcome to Car-Fu. 
        <audio src="https://carfu.com/audio/carfu-welcome.mp3" /> 
        You can order a ride, or request a fare estimate. 
        Which will it be?
      </speak> 
      ```

  * Cards
    - A card is a visual marker for your skill to display
      - Inside the Alexa App on phones that are connected to a user's Alexa
      - On the screen of Alexa devices that have a screen, like the Alexa Show.
      - Cards have a title, text, and can contain images.
      - Cards don't have clickable hyperlinks.

  * Linking
    - You can enable users to do oauth and link their skill with an account with an external service.
    - It's actually possible to enable linking directly to a Facebook application without involving any
      server of your own. That's a handy option if you want to make your skill social. I'd love to add
      a "challenge a friend" feature to secret word.

  * AudioPlayer/VideoPlayer
    - Not an expert on this. If you wanted to make a music player or a video player
      you would use this.

  * Dialog Model
    - Not an expert on this, either.
    - You can have Alexa do some of the heavy lifting of state management for you.
    - Mostly, you can have Alexa reprompt or confirm specific slots.
    - Useful for e-commerce type stuff.

  * Skill Store
    - Your skill has a description, some examples, a title, usage examples, and instructions.
    - These are displayed in the skill store
    - They also are displayed in the Alexa App when users install your skill.
    - If your usage examples aren't up to snuff, your skill will fail certification.
    - https://www.amazon.com/dp/B078VJZ6F2

  * Deployment
    - You can run your skill on your own servers
      - You must accept and serve JSON over https
    - It's easier to run it as an AWS Lambda function
      - The free tier has my skill covered.
      - The skill you are destined to make, however, will certainly exceed it.
      - Amazon will probably give you developer credit if your skill becomes popular.
    
* Alexa Skill Tools
  * ask CLI tool
    - Your intents, slots, sample utterances, instructions, skill store description
      all live as .json files that you can keep in a version-controlled repository
      ... and that you can generate from type-checked purescript files!
    - Deploying your skill is as easy as
      ``` 
      ask deploy
      ```

  * Skill Simulator
    - https://developer.amazon.com/alexa/console/simulator/edw/amzn1.ask.skill.46ee761e-a8b2-403a-89fe-93dbb2a05c60/development/en_US/
  * Skill Dashboard
    - https://developer.amazon.com/edw/home.html#/analytics/amzn1.ask.skill.fe3eeb2f-f7eb-4be5-bcd6-076532ec60cb/live

* Why is Purescript a good choice for an Alexa Skill?
  * Algebraic Data Types
    - Allow you to "make invalid states unrepresentable"
    ```
    data Output
      = JustCard Card
      | JustSpeech
          { speech :: Speech
          , reprompt :: Maybe Speech
          }
      | SpeechAndCard
          { speech :: Speech
          , reprompt :: Maybe Speech
          , card :: Card
          }
    ```
    - Enums are better than magic strings.
    - Similarly, ADTs are better than untyped javascript objects.
  * Pattern matching
    - Allow you to conveniently select and handle each representable state.

    ```
    hasReprompt :: Output -> Boolean
    hasReprompt JustSpeech { reprompt : Just _ } = true
    hasReprompt SpeechAndCard { reprompt : Just _ } = true
    hasReprompt _ = false
    ```
    - If invalid states are unrepresentable, then handling all representable status
      is the same as handling all valid states.
    - Compiler will complain if you *don't* handle all representable states.
    - This enables "Fill-in-the-blank" development, i.e. "type-driven development"

  * Alexa Skills have a lot of corner cases:
    - What if a slot is missing or an unexpected value?
    - What if the user says "Pizza" in response to a yes or no question?
    - What if the user says "yes" not in response to a yes or no question?
    - What if the user invokes an intent before the session has been initialized?
    - The purescript compiler stops you from assuming something is present when it may not be.
    - Pattern matching lets you succinctly break the space of valid states into appropriate categories
      and handle each case appropriately.

  * An Alexa skill is a state machine. The 'Session' describes the state and the 'intents' and 'slots' describe potential actions, that may cause state transitions.

  * You want to be certain you've addressed every potential action in every potential state.
  * You could list all possible combination of states and actions in a table, but this table would be prohibitively large, especially if your state space is non-trivial.
  * Use pattern matching!
  ```
    runSkill (ErrorInput err) Nothing    = errorAndExit
    runSkill (ErrorInput err) sess       = errorAndContinue sess
    runSkill _ Nothing                   = beginOrRestoreGame
    runSkill Launch _                    = beginOrRestoreGame
    runSkill Stop _                      = exit
    runSkill Cancel _                    = exit
    
    runSkill No  (Just sess@{status : Loading}) = beginNewGame
    runSkill Yes (Just sess@{status : Loading}) = restoreGame sess
    runSkill _   (Just sess@{status : Loading}) = errorAndContinue sess
    
    runSkill Yes (Just sess@{status : GivingUp}) = playerLoses sess
    runSkill No  (Just sess@{status : GivingUp}) = promptForGuess sess
    runSkill _   (Just sess@{status : GivingUp}) = errorAndContinue sess
    
    runSkill Yes (Just sess)                     = errorAndContinue sess
    runSkill No (Just sess)                      = errorAndContinue sess
    
    runSkill Help          (Just sess) = readInstructionsAndContinue sess
    runSkill (Guess guess) (Just sess) = handleGuess guess sess
    runSkill Thinking      (Just sess) = handleThinking sess
    runSkill GiveUp        (Just sess) = confirmGivingUp sess
    runSkill SessionEnded  (Just sess) = persistSession sess
  ```


* What did I find delightful about Purescript?
  * Fast feedback loop.
    - The purescript compiler is incremental, and pretty fast.
    - With an expressive type system, compiler errors reveal
      more than just errors in your syntax. They reveal errors in your thought.
    - TDD can get you a similar feedback loop in a dynamic language -- but you don't have
      that feedback loop when you are writing the tests. And that's the hard part.
    - Less powerful languages have a compiler -- but often it's just a glorified linter.
  * Clear Milestones
    - When you've fully defined your data types, you know you are done when you write
      a function from type Input to type Output that compiles.
    - Break that function up into steps, or pattern match on the different inputs,
      and then you have smaller milestones along the way. That is *key* to keeping engaged.
    - TDD can set you up with similar incremental milestones -- but again, not while you're
      writing the tests -- and that's the hard part!
  * Demanding compiler.
    - My tendency is to be on the cowboy side. I'm not very disciplined and methodical in my approach to anything in life, not even programming -- so it's good to have a compiler that is.
    - You feel good after a refactor and things finally compile.
    - It's like receiving praise from a strict parent. They don't overpraise you and give you participation awards for every breath you take, but you know they have high standards so when they do give you praise, it actually means something.
  * Great tooling.
    - purs ide is great. Auto-import. Type wildcards. Function wildcards!

* What did I find hard about Purescript?
  * Vim plugin rough around the edges.
  * Steep learning curve
    - I've been devoting a substantial portion of my free time & mental effort to reading about &
      tinkering with Purescript, for a year and a half or so. It's only recently that I feel actually
      productive.
    - The Haskell Pyramid.
      - I'm a very hands-on person, I learn by doing.
      - I can't tell you what the monad laws are.
      - I can't tell you what functional dependencies (fundeps) are. (I can tell you what fundip is)
      - No idea what cofree comonads are.
  * Hard to get the intuition for effect rows
    - This was before I learned you could just put an underscore and be done!
    - They're going away soon!
  * Lack of concrete examples in the documentation for libraries -- lenses, for instance
    - For awhile I thought I wanted to use lenses. Lenses are a really cool tool that, I understand, are
      especially handy for working with complicated, deeply nested objects. But almost everything
      I read was focused on explaining the concept of lenses to me and how to understand the
      type signature. Also, I had to translate from the Haskell libraries (that use a language extension)
      into the purescript. When all I really wanted was some good examples of how to use them!
  * Code organization is tricky to figure out.
    - Specifically, how to deal with failure.
    - I kept having this problem where I had to deserialize the alexa event, then I had to deserialize the intent, then I had to deserialize the slots, then I had to deserialize the session, then I had to check the database for an existing session, deserialize THAT session -- basically there were a bunch of operations that could all fail. At first, I pattern matched on each failure manually and handled each individual failure, and the function I ended up with was kind of this deeply nested monster, with all this ugly failure-handling logic mixed in with the actual core logic of my skill. For a long time, I thought that the solution to my problems was to try and introduce something like the ExceptT monad transformer, and then I wasn't sure whether to put Aff inside of it, or it inside of Aff, and even when I got something that compiled I didn't end up liking it. At the end of the day, my problem went away when I stopped dealing with the complicated AlexaRequest and AlexaResponse types throughout the entire application. I introduced intermediate data types that represented the valid input and output of my skill in its purest -- I handled all the parsing at the beginning in the effort to produce a value of my Input type, and then wrote all the application logic in terms of my simpler types.
    - Anyway, that's a code organization issue that could have come up in any language, not just Purescript. The problem that's unique to Purescript is that there's all these shiny tools like Lenses and Monad Transformers that people get really excited about, and if you don't fully understand them you can start to think that they're the solution to your problems, but then 7 times out of 10 you don't actually need them and can solve your problem just with the basics, using better abstractions, and organizing your code a little better.
      
* `purescript-alexa` and `purescript-alexa-template`
  * There's not much in purescript-alexa.
    - Type definitions for
      * AlexaRequest (the input into your skill)
      * AlexaResponse (the output of your skill)
      * SkillManifest (defines invocation name, info for skill store)
      * LanguageModel (defines intents and slots)
      * The type definitions are incorrect
    - Helper for making the `exports.handler = function (event, context, callback) {...}`
    - Lenses
    - Sum type for built-in intents
  * `purescript-alexa-template` is much more useful
    - npm tasks to build, deploy 
    - demonstrates custom intents and slots

