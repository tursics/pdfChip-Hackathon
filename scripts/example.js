//-----------------------------------------------------------------------
// Example JavaScript document
//---------
// Copyright: © 2014 - David van Driessche, Four Pees, and some more
//-----------------------------------------------------------------------

function insertPage( wikipediaURL, callbackFn)
{
//	getWikipediaWikitext( wikipediaURL, function( title, content) {
	getWikipediaHTML( wikipediaURL, function( title, content) {
		var theTitleElement = $( "#title" );
		theTitleElement.html( title);

		var theContentElement = $( "#content" );
		theContentElement.html( content);

		if( typeof cchip !== 'undefined') {
			cchip.printPages();
		}

		callbackFn();
	});
}

//-----------------------------------------------------------------------

function insertContent( wikipediaURL, callbackFn)
{
	insertPage( wikipediaURL, function() {
		getWikipediaLinks( wikipediaURL, function( title, list) {
			var index = 0;

			function recursivePage()
			{
				++index;
				if( index < list.length) {
					insertPage( 'https://en.wikipedia.org/wiki/' + list[index], recursivePage);
				} else {
					callbackFn();
				}
			}
			insertPage( 'https://en.wikipedia.org/wiki/' + list[index], recursivePage);
		});
	});
}

//-----------------------------------------------------------------------

//var site = 'https://nl.wikipedia.org/wiki/Pingu%C3%AFns';
//var site = 'https://en.wikipedia.org/wiki/Penguin';
var site = 'https://en.wikipedia.org/wiki/Bird';
//var site = 'https://nl.wikipedia.org/wiki/Portaal:Vogels';

if( typeof cchip === 'undefined') {
	insertContent( site, function() {
	});
} else {
	function cchipPrintLoop()
	{
		cchip.beginPrinting();
		insertContent( site, function() {
			cchip.endPrinting();
		});
	}
}

//-----------------------------------------------------------------------
