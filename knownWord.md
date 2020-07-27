## Building an Alexa Skill in Purescript

This post takes some of the material from the [talk](https://www.meetup.com/ny-purescript/events/247385149) ([slides](http://twitchard.github.io/purescript-alexa-presentation/index.html), [notes](http://twitchard.github.io/purescript-alexa-presentation/notes.html)) I gave at the [New York Purescript Meetup](https://www.meetup.com/ny-purescript/) about my Alexa Skill [Secret Word](https://github.com/twitchard/secretword). In this post I will

1. Proselytize Purescript
2. Give a step-by-step walkthrough of creating a brand new Alexa Skill in purescript, "Known Word".

## Why Purescript

[Purescript](http://www.purescript.org/) is my favorite among the family of [pure functional languages](https://en.wikipedia.org/wiki/List_of_programming_languages_by_type#Pure) that compile to Javascript. I like these languages because they encourage a very *disciplined* style of programming. Record types and [ADTs](https://leanpub.com/purescript/read#leanpub-auto-algebraic-data-types) permit you to explicitly model the space of valid inputs to your program, and the compiler will force you to handle all possible cases unless you explicitly opt out. The path of least resistance is to be exhaustive, whereas in a more forgiving language, the path of least resistance is often to focus primarily on the "happy path" and neglect proper handling of "corner cases".

In writing an Alexa skill, or more generally in developing for a voice platform, being exhaustive is particularly important.

    In a [recent episode of the Alexa Dev Chat podcast](https://soundcloud.com/user-652822799/episode-019-looking-back-at-the-year-in-voice-and-whats-next), Dave Ibitski and Paul Cutsinger briefly discussed how voice or 'conversational' UX shifts the discovery of intent from the user to the application. In a graphical UX, the burden is typically on the user to discover how the developer intends the interface to be used, and the burden on the developer is to make sure the interface as unsurprising and unambiguous as possible. Voice UX is different. The user may choose to interact with a voice UX in a variety of ways, and it is up to the application to determine the user's intent and apply it appropriately. An interface that does not permit users to express their intent in a variety of ways this will seem rigid and unnatural.

I reason that this means the input to a voice application is a lot less predictable than other sorts of applications. A voice application has many "happy paths", and ostensible "corner cases" will adventure beyond the confines of the corner. I believe that in such an environment, discipline and exhaustivity of the sort encouraged by pure functional languages are doubly important. Thus Purescript is an excellent choice for Alexa Skill developers seriously interested in creating robust voice experiences.

### Prerequisites

Install purescript, bower, pulp, and the Alexa Skills Kit CLI.

```
npm install -g purescript bower pulp ask-cli.
```

Initialize ask-cli with your AWS credentials.

```
ask init
```

Now clone the purescript-alexa starter template -- rename the directory appropriately to your skill

```
git clone https://github.com/twitchard/purescript-alexa-template known-word
```

Install the prerequisites for the project.

```
bower install
```

Now open .ask/config and change the inner 'uri' property to be an appropriate name for your skill.

```
vim .ask/config
cat .ask/config
# {
#   "deploy_settings": {
#     "default": {
#       "skill_id": "",
#       "was_cloned": false,
#       "merge": {
#         "skillManifest": {
#           "apis": {
#             "custom": {
#               "endpoint": {
#                 "uri": "known-word"
#               }
#             }
#           }
#         }
#       }
#     }
#   }
# }
```

## Build and Deploy

Let's go ahead and build and deploy the template skill as it is to Amazon, just to kick the tires. First, let's compile it:

```
npm run build-all
npm run deploy-all
```

These commands generated and deployed three entities
1. An AWS lambda function named 'known-word' using the javascript created by the purescript compiler and put into the `output` directory. The entry point is the `handler` function defined in `src/Main.purs`.
2. An Alexa skill named "purescript template" with metadata defined in `skill.json`, which is generated from `src/Skill.purs`.
3. An American English "language model" defined in `models/en-US.json`, which is generated from `src/Model.purs`.

There's a couple of things we still need to do before we test it out.

1. Navigate to the [AWS Lambda console](https://console.aws.amazon.com/lambda), click on your newly-created lambda function, and change the value of the 'Handler' field to `Main/index.handler`, and hit 'Save'. By default, AWS lambda expects a function in the root of the output folder called index.js that contains the entry point, but our purescript compiler puts files underneath their module, in this case inside the `Main/` subfolder.

2. Navigate to the [Alexa dashboard](https://developer.amazon.com/alexa/console/ask), click 'edit' on your newly created skill, navigate to the 'test' tab, and make sure the 'Test is enabled for this skill' switch is toggled on. While you're here, you can go ahead and test out the skill. Enter something into the box.

## Creating "Known Word"

First let me explain the idea for the skill. I've already made a skill "Secret Word", where
1. Alexa picks a 5-letter word.
2. You guess 5-letter words.
3. Alexa tells you how many letters are shared between your guess and the secret word.
4. You try and use the information to figure out the word, but eventually just give up because it's too hard.

"Known word" will be the inverse of this:
1. You pick a 5-letter word.
2. Alexa guesses 5-letter words.
3. You tell Alexa how many letters are shared between her guess and your secret word.
4. Alexa guesses your word.

Let's start with the fun part:
