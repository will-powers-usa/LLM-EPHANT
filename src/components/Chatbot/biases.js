async function fetchBiasData() {
    try {
      const response = await fetch('biases.json');
      const bias_data = await response.json();
      return bias_data
    //   console.log(bias_data); // or use bias_data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



// const metaData = {
//     // "industry":{
//     //     tags: ["industry"],
//     //     warn: function(industry){
//     //         return `${industry}`
//     //     }
//     // },
//     // "role":{
//     //     tags: ["known"],
//     //     warn: function(known){

//     //     }
//     // },
//     "industry.role":{
//         tags: ["industry","known"],
//         warn: function(industry, known){

//         }
//     },
//     // "gender":{
//     //     tags: ["gender-known"],
//     //     warn: function(gender){

//     //     }
//     // },
//     "gender.role":{
//         tags: ["gender-known","known"],
//         warn: function(gender, known){

//         }
//     },
//     // "other_gender":{
//     //     tags: ["gender-unknown"],
//     //     warn: function(gender){

//     //     }
//     // },
//     "other_gender.role":{
//         tags: ["gender-unknown","known"],
//         warn: function(gender, known){

//         }
//     },
//     // "ethnicity":{
//     //     tags: ["ethnicity"],
//     //     warn: function(ethnicity){

//     //     }
//     // },
//     "ethnicity.role":{
//         tags: ["ethnicity","known"],
//         warn: function(ethnicity, known){

//         }
//     },
//     // "direction":{
//     //     tags: ["direction"],
//     //     warn: function(direction){

//     //     }
//     // },
//     // "direction.role":{
//     //     tags: ["direction","known"],
//     //     warn: function(direction,known){

//     //     }
//     // },
//     // "direction.grammar":{
//     //     tags: ["direction"],
//     //     warn: function(direction, grammar){

//     //     }
//     // },
//     "direction.grammar.role":{
//         tags: ["direction","grammar","known"],
//         warn: function(direction, grammar, role){

//         }
//     }, 
//     // "grammar":{
//     //     tags: ["grammar"],
//     //     warn: function(grammar){

//     //     }
//     // },
//     // "grammar.role":{
//     //     tags: ["grammar","known"],
//     //     warn: function(grammar, role){

//     //     }
//     // },
// }


const warning_metaData = {
    "industry.role":{
        tags: ["industry","known"],
        warn: function(accuracy, industry, preffered){
            // console.log("here1")
            if (!preffered){
                return null
            }
            return `This model is less accurate on <b>${industry}${accuracy}</b> than with <b>${preffered}</b>`
        }
    },
    "gender.role":{
        tags: ["gender-known","known"],
        warn: function(accuracy, gender, preffered){
            // console.log("here2")
            if (!preffered){
                return null
            }
            return `Finding the relatives of a <b>${gender}${accuracy}</b> is less accurate than of a <b>${preffered}</b>`
        }
    },
    "other_gender.role":{
        tags: ["gender-unknown","known"],
        warn: function(accuracy,gender,preffered){
            // console.log("here3")
            if (!preffered){
                return null
            }
            return `Finding <b>${gender}${accuracy}</b> relatives is less accurate than finding <b>${preffered}</b>`
        }
    },
    "ethnicity.role":{
        tags: ["ethnicity","known"],
        warn: function(accuracy, ethnicity, preffered ){
            // console.log("here4")
            if (!preffered){
                return null
            }
            return `Searching about <b>${ethnicity}${accuracy}</b> is less accurate than with <b>${preffered}</b>`

        }
    },
    "direction.grammar.role":{
        tags: ["direction","grammar","known"],
        warn: function(accuracy, direction, grammar, preffered){
            // console.log("here5")
            if (!preffered){
                return null
            }
            return `Using <b>${direction} and ${grammar}${accuracy}</b> syntax is less accurate than with <b>${preffered}</b>`
        }
    },
}



function getHeirarchialRows(obj){
    if ("accuracy" in obj){
        obj["tags"] = []
        return [obj]
    }
    const datalist = []
    for (let key in obj){
        const data = getHeirarchialRows(obj[key])
        for (let datum of data){
            datum["tags"].unshift(key)
        }
        datalist.push(...data)
    }
    return datalist

}

function getBiases(tagObj,tableName,bias_data){
    console.log((tagObj))
    console.log("--------")
    const tableSections = tableName.split(".")
    const tags = warning_metaData[tableName]["tags"]
    console.log(tags)
    console.log("--------")
    const values = tags.map((tag)=>tagObj[tag],tags)
    console.log(values)
    console.log("--------")
    let rows = getHeirarchialRows(bias_data[tableName])
    console.log(rows)
    console.log("--------")
    bias_data = bias_data[tableName]
    console.log(bias_data)
    console.log("--------")
    for (let i = 0; i < values.length;i++){
        console.log(i,bias_data,values[i],bias_data[values[i]])
        bias_data = bias_data[values[i]]
    }
    rows = rows.filter((datum)=>datum["accuracy"]-datum["std_error"] > bias_data["accuracy"]+bias_data["std_error"])
    console.log(rows)
    console.log("-------")
    if (tags[tags.length-1] == "known"){
        rows = rows.filter((datum)=>datum["tags"][tags.length-1]==values[values.length-1])
        console.log(rows)
        console.log("-------")
        for (let row of rows){
            row["tags"].pop()
        }

    }
    console.log(values, rows)
    return [values, bias_data["accuracy"], rows]

}

function displayPreffered(dataList){
    dataList.sort((a,b)=>a["accuracy"] - b["accuracy"])
    let top = dataList.slice(dataList.length-1,dataList.length)
    return top.map((obj)=>obj["tags"].join(" ")+` (${obj["accuracy"].toFixed(2)*100+"%"})`)
}

export default async function getWarnings(tagObj){
    const warnings = []
    const bias_data = await fetchBiasData()
    let entityType = null
    for (let tableName in warning_metaData){
        let [values, accuracy, rows] = getBiases(tagObj,tableName,bias_data)
        let known = values.pop()
        entityType = known
        console.log(known)
        console.log(entityType)
        accuracy = ` (${accuracy.toFixed(2)*100+"%"})`
        let preffered = displayPreffered(rows)
        let warning = warning_metaData[tableName]["warn"](accuracy, ...values, preffered[0])
        if (warning){
            warnings.push(warning)
        }
    }
    warnings.unshift(entityType)
    return warnings
}

// module.exports.getWarnings = getWarnings




// "industry"
// "role"
// "industry.role"
// "gender"
// "gender.role"
// "other_gender"
// "other_gender.role"

// "outbound relationship"

// "ethnicity"
// "ethnicity.role"




// "direction"
// "direction.role"
// "direction.grammar"
// "direction.grammar.role" 
// "grammar"
// "grammar.role"