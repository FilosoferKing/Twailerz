//Create GLOBAL variable below here on line 2
var global_result;
var tweets_array=[];





$(document).ready(function(){
	$('button').click(function(){
		console.log('click initiated');
		$.ajax({
			dataType: 'json',
			url: "http://s-apis.learningfuze.com/hackathon/twitter/index.php",
			data: {search_term: 'Straight Outta Compton'},
			crossDomain: true,
			//return: 'url'
			success: function(result)
				{
					global_result = result;
					console.log('loaded ' + result);

					for(i=0; i < 15; i++)
					{
						// var add_tweet=;
						
						tweets_array[i]=global_result['tweets']['statuses'][i]['text'];
						
						var send_tweets_img = $("<img>",{
							src: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-twitter-48.png',
							
						});
						var send_tweets_div = $("<div>",{
							css: 'width:600px height: 40px',
							class: 'add_tweet',
						});
						var send_tweets_text = $('<span>',{
							text: global_result['tweets']['statuses'][i]['text'],
						});
						//$('#main').append("<div class='add_tweet' style='width: auto; height: 40px; margin-bottom: 10px'><img src='https://cdn1.iconfinder.com/data/icons/logotypes/32/square-twitter-48.png'></div>");
						send_tweets_div.append(send_tweets_img,send_tweets_text)
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


