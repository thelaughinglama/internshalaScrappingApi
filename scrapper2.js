const cheerio = require('cheerio');
const rp = require('request-promise');
var links = [];
var options = {
    uri: 'https://internshala.com/internships/work-from-home-computer%20science-jobs-in-delhi/duration-4',
    transform: function (body) {
        return cheerio.load(body);
    },

};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
hello().catch((err) => {
    console.log(err)
});
async function hello() {
    var $ = await rp(options);
    var count = 0;
    $('.individual_internship').each(async function () {


        var link = $(this).children('.button_container').children('a').attr('href');
        links.push(link)
        count++;
    }
    )
    for (i = 0; i < count; i++) {
        console.log(`https://internshala.com${links[i]}`)


        await sleep(2000)
        var options1 = {
            uri: `https://internshala.com${links[i]}`,
            transform: function (body) {
                return cheerio.load(body);
            },

        }
        await rp(options1).then(async (selector) => {
            var res = selector('#skillsContainer').text()
            console.log(res)
        }).catch((err) => {
            console.log(err);
        });
    }
   console.log(count);
}

