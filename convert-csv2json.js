const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')


// Convert to json
const convertor = (csvFile) => {
    if(csvFile == undefined) return console.log('csvFile is required')

    const fileParts = csvFile.split('.')
    let fileExtension = fileParts[fileParts.length-1]
    let fileName = fileParts[fileParts.length-2]
    let jsonContent = []

    fs.readFile(path.join(__dirname, csvFile), (error, data)=>{
        if (error) console.error(csvFile + ' file is not readable!' + error.message)

        // Save file
        csv().fromString(data).on('json', (csvRow) => {
            jsonContent.push(csvRow)
        }).on('done', () => {
            fs.writeFileSync(`${fileName}.json`, JSON.stringify(jsonContent, null, 2), (error)=>{
                if(error) throw error
            })
            console.log(`${fileName} has been saved!`)
        })

    })
}


// Get CSV file from commandline
convertor(process.argv[2])
