//-----------------------------------------------------------------------
// Example JavaScript document
//---------
// Copyright: © 2014 - David van Driessche, Four Pees, and some more
//-----------------------------------------------------------------------

function insertPage( wikipediaURL, callbackFn)
{
//	getWikipediaWikitext( wikipediaURL, function( title, content) {
//	getWikipediaText( wikipediaURL, function( title, content) {
	getWikipediaHTML( wikipediaURL, function( title, content) {
		var theTitleElement = $( "#title" );

		theTitleElement.html( '<div id="article' + encodeURIComponent( title.replace(/\s+/g, '')) + '">' + title + '</div>');

		var theContentElement = $( "#content" );
		theContentElement.html( content);

		if( typeof cchip !== 'undefined') {
			$( 'body').waitForImages( function() {
				cchip.printPages();
				callbackFn();
			});
		} else {
			callbackFn();
		}
	});
}

//-----------------------------------------------------------------------

function insertContent( wikipediaURL, callbackFn)
{
	try {
		insertPage( wikipediaURL, function() {
			try {
				getWikipediaLinks( wikipediaURL, function( title, list) {
					try {
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
						if( list.length > 0) {
							insertPage( 'https://en.wikipedia.org/wiki/' + list[index], recursivePage);
						} else {
							callbackFn();
						}
					} catch( x) {
						callbackFn();
					}
				});
			} catch( x) {
				callbackFn();
			}
		});
	} catch( x) {
		callbackFn();
	}
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
