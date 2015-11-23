//-----------------------------------------------------------------------
// Example JavaScript document
//---------
// Copyright: © 2014 - David van Driessche, Four Pees
//-----------------------------------------------------------------------

function getContent( wikipediaURL, callbackFn)
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

// Add prime numbers to the "content" element
//
function addPrimesToContentElement() {

	// The content element
	var theContentElement = $( "#content" );
	
	// Loop and add prime numbers
	for ( var theIndex = 2; theIndex < 1800; theIndex++ ) {
	
		if (isPrime(theIndex)) {

		  $( '<p>', {
				  class: 'prime',
				  text: " " + theIndex
			  }).appendTo( theContentElement );

		}
	}
}

// Small utility function to determine if a number is prime
//
function isPrime(n) {
 if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
 if (n%2==0) return (n==2);
 var m=Math.sqrt(n);
 for (var i=3;i<=m;i+=2) {
  if (n%i==0) return false;
 }
 return true;
}

if( typeof cchip === 'undefined') {
	getContent( 'https://nl.wikipedia.org/wiki/Pingu%C3%AFns', function() {
	});
} else {
	function cchipPrintLoop()
	{
		cchip.beginPrinting();
		getContent( 'https://nl.wikipedia.org/wiki/Pingu%C3%AFns', function() {
			cchip.endPrinting();
		});
	}
}
