import getWarnings from "./biases.js"

async function getTags(input){
    // Send Data to Tagging LLM
    console.log(input)
    return await fetch('http://localhost:9999/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      }).then(data=>data.json())
}

async function transfigure(input,known_tag){
    // Send Data to Tagging LLM
    console.log(input)
    return await fetch('http://localhost:9999/transfiguration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input, known_tag,known_tag  }),
      }).then(data=>data.text())
}

async function callChatbot(input){
    // Send Data to Tagging LLM
    console.log(input)
    return await fetch('http://localhost:9999/callChatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      }).then(data=>data.text())
}

async function warnUser(tags,setWarnings,setEntityType){
    let warnings = await getWarnings(tags)
    console.log(warnings)
    console.log("****")
    setWarnings(warnings.join("\n"))
}

async function transform_input(input,tags,setSuggestion){
    const suggestion = await transfigure(input,tags["known"])
    setSuggestion(suggestion)
}


function isGrammarOptimized(tags){
    let optimized_grammars = []
    if (tags["known"] == "celebrity"){
        console.log("unknown")
        optimized_grammars = [
            ["outbound relationship", "preposition Object Relation Subject"],
            ["inbound relationship", "possession Object Subject Relation"],
            ["inbound relationship", "possession Subject Relation Object"],
            ["inbound relationship", "preposition Relation Subject Object"],
        ]

    } else if (tags["known"] == "unknown"){
        console.log("unknown")
        optimized_grammars = [
            ["outbound relationship", "possession Subject Relation Object"],
        ]
    }
    for (let i in optimized_grammars){
        console.log(tags["direction"], optimized_grammars[i][0], tags["grammar"], optimized_grammars[i][1])
        if (tags["direction"] == optimized_grammars[i][0] && tags["grammar"] == optimized_grammars[i][1]){
            return true
        }
    }
    return false
}


export default async function process_data(input,setWarnings,setEntityType,setSuggestion,setInput,setMessages,setProcessing){
    console.log("setting processing")
    setProcessing(true)
    console.log("getting tags")
    const tags = await getTags(input)
    console.log("setting warnings")
    console.log(tags)
    await warnUser(tags,setWarnings,setEntityType)
    if (!isGrammarOptimized(tags)){
        console.log("unoptimized")
        const new_input = await transform_input(input,tags,setSuggestion)
    }else{
        console.log("optimized")
        const response = await callChatbot(input)
        const userMessage = { sender: 'user', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: response },
        ]);
        
        setProcessing(false)
        setInput('')
    }
}