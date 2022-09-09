const axios = require("axios"); 
const cheerio = require("cheerio"); 
const prompt = require('prompt-sync')();
baseUrl ='https://timkiem.vnexpress.net/?q=' 
queryUrl = encodeURIComponent(prompt('Searching for: '));
endingUrl='&media_type=all&fromdate=0&todate=0&cate_code=&search_f=title,tag_list&date_format=all&latest=on'
// $.html();
// console.log(pageData)
finalUrl = baseUrl+queryUrl+endingUrl
// console.log(queryUrl)
// console.log(finalUrl)
async function doGetRequest() {
    nameArr = []; priceArr=[]; resultArr =[];
    res = await axios.get(finalUrl);  
    pageData = res.data;
	$ = cheerio.load(pageData);
	a= $('.button-page input').attr('max-page')
	numberOfPage = parseInt(a)
	// console.log(numberOfPage>0)
	if (numberOfPage>0)	{
		for (let i = 0; i < numberOfPage; i++) {
			let pageNumber = i+1;
			url = finalUrl+'&page='+ pageNumber
			res = await axios.get(url);  
			pageData = res.data;
			$ = cheerio.load(pageData);
			$('.title-news a').each((_,e)=>{
				let resultObj = {
					Headlines:$(e).attr('title')
					// $(e).parent().children().last().text()]
				
				}
				resultArr.push(resultObj)
				}
			);		
		}
		console.log(`Number of pages: ${numberOfPage}`)

 
	} else {
		$('.title-news a').each((_,e)=>{
			let resultObj = {
				Headlines:$(e).attr('title')
				// $(e).parent().children().last().text()]
			
			}
			resultArr.push(resultObj)
			}
		);	
		console.log('Number of pages: 1')

	}
    console.log(resultArr);

  }
  
  doGetRequest();
