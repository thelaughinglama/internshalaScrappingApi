const cheerio = require('cheerio'); // Basically jQuery for node.js
const rp=require('request-promise'); 
var options = {
    uri: 'https://internshala.com/internships/work-from-home-computer%20science-jobs-in-delhi/duration-1',
    transform: function (body) {
        return cheerio.load(body);
    },
   
};
hello().catch((err)=>{
    console.log(err)
});
 async function hello(){
var $=await rp(options);
let links=[],count=0;
$('.individual_internship').each(async function () {
// link=$(this).children('.button_container').children('a').attr('href');
// console.log(link)

var link= $(this).children('.button_container').children('a').attr('href');
var options1 = {
    uri: `https://internshala.com${link}`,
    transform: function (body) {
        return cheerio.load(body);
    },
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,ko;q=0.8",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
      }}
   rp(options1).then((selector)=>{
    console.log(selector('#skillNames').text())
   }).catch((err)=>{
    console.log(err);
    });

//    console.log(selector('#skillNames').text())
console.log(options1.uri)
count++;
}

)


console.log(count);
// console.log($.html())
 }
