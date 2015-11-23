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

		theTitleElement.html( '<div id="article' + encodeURIComponent( title.replace(/\s+/g, '')) + '">' + title + '</div>');

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

if( typeof cchip === 'undefined') {
	insertContent( baseLink, function() {
	});
} else {
	function cchipPrintLoop()
	{
		cchip.beginPrinting();
		insertContent( baseLink, function() {
			cchip.endPrinting();
		});
	}
}

//-----------------------------------------------------------------------
