const cheerio = require('cheerio');
const rp = require('request-promise');
const arg = process.argv.slice(2);
if (arg.length != 1) {
    console.log('Enter url correctly');
    console.log('Example: node scrapper2.js https://internshala.com/internships/xyz');
    process.exit();
}
var links = [];
var options = {
    uri: arg[0],
    transform: function (body) {
        return cheerio.load(body);
    },

};
//sleep funtion to delay the execution of next request
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

dataRetriever().catch((err) => {
    console.log(err)
});
// executes multiple requests to each of the  internship links 
async function dataRetriever() {
    var $ = await rp(options);
    var count = 0;
    $('.individual_internship').each(async function () {


        var link = $(this).children('.button_container').children('a').attr('href');
        links.push(link) //making array of all the  internship links on the page 
        count++;
    }
    )
    //sending requests on all the links 
    for (i = 0; i < count; i++) {
        console.log(`https://internshala.com${links[i]}`)


        await sleep(100) //delay of 0.1sec with each request 
        //request execution
        var options1 = {
            uri: `https://internshala.com${links[i]}`,
            transform: function (body) {
                return cheerio.load(body);
            },

        }
        await rp(options1).then(async ($) => {
            var res = $('#skillsContainer').text() 
            var res1 = $('.stipend_container_table_cell').text()
            console.log(res)
            console.log("Stipend : " + res1)            
        }).catch((err) => {
            console.log(err);
        });
    }
    console.log(count);
}

