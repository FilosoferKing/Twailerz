//Create GLOBAL variable below here on line 2
var global_result;//global variable to check out the array
var tweets_array=[];//array used to store the text of the most recent tweets
var num_of_tweets_to_use = 3;//variable to designate the number of recent tweets we want to use
var search_tweets



/*****************
**Purpose: Use the search term to find the most recent matching tweets tweets
**Runs: On click of Movie title.  Saves movie title as search_tweets global variable
**Output: Specified Number of divs with twitter image and text of tweet
*****************/

$(document).ready(function(){
	$('button').click(function(){//make sure this targets the right button/buttons
		console.log('click initiated');
		$.ajax({ //grabs the twitter API
			dataType: 'json',
			url: "http://s-apis.learningfuze.com/hackathon/twitter/index.php",
			data: {search_term: search_tweets},//searches tweets for the global variable search_tweets
			crossDomain: true,
			//return: 'url'
			success: function(result)
				{
					global_result = result;//global_result is really just used to explore the original array
					console.log('loaded ' + result);
					tweet_statuses = result['tweets']['statuses']//saves the first part of array address to a variable for faster load times
					for(i=0; i < num_of_tweets_to_use; i++) //for loop that runs through the specified number of tweets to find the text
					{
						
						
						tweets_array[i]=tweet_statuses[i]['text']; //saves the array address of the tweet into a new array
						
						var send_tweets_img = $("<img>",{ //creates the twitter image to dynamically add to html
							src: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-twitter-48.png',							
						});

						var send_tweets_div = $("<div>",{//dynamically creates the div container to contain the tweet and image
							css: 'width:600px height: 40px',//the size and look of this need to eventually be adjusted
							class: 'add_tweet',
							'tweet_index': i,//each div will be assigned with a tweet_index equivalent to the array number
						});

						var send_tweets_text = $('<span>',{//dynamically creates the text from the most recent tweets
							text: tweet_statuses[i]['text'],
						});
						
						send_tweets_div.append(send_tweets_img,send_tweets_text)//does the appropriate appending
						$('#main').append(send_tweets_div);
					}

				
					


				}

				

			});


		});

		// $.ajax({
		// 	dataType: 'json'
		// 	url: "https://api.twitter.com/1.0/statuses/oembed.json?id="
		// })


	});


