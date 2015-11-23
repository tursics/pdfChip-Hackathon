//-----------------------------------------------------------------------
// Example JavaScript document
//---------
// Copyright: © 2014 - David van Driessche, Four Pees, and some more
//-----------------------------------------------------------------------

function printTOC()
{
	// Make sure we have our variable with collected lists
	if (typeof cchipListCollector != 'undefined') {

		// Get the list of TOC items
		var theTocs = cchipListCollector.TOC;
		if (typeof theTocs !== "undefined") {

			// Get the element we need to fill
			var theTocsDiv = $( "#toc" );

			// Loop over all real items
			for (var theTocIndex = 0; theTocIndex < theTocs.length; theTocIndex++) {

				// The toc item
				var theToc = theTocs[theTocIndex];

				// Append a div to the toc
				var theDiv = $( '<div>' ).appendTo( theTocsDiv );

				// Create a paragraph for the title
				$( '<p>', {
					class: 'toc-1',
					html: theToc.content + ' - <a href="index.html#article' + encodeURIComponent( theToc.content.replace(/\s+/g, '')) + '">page ' + theToc.page + "</a>"
				}).appendTo( theDiv );

			}
		}
	}
}

//-----------------------------------------------------------------------

function printPages( site, callbackFn)
{
	getWikipediaHTML( site, function( title, content) {
		getWikipediaImages( site, function( title, images) {
			var image = 'Wikipedia-logo-v2.svg';
			if( images.length > 0) {
				image = images[0];
			}
			getWikipediaImageFile( site, image, function( imageURL) {
				var img = new Image();
				img.onload = img.onerror = function() {
					var theTitleImage = $( "#coverimage" );
					theTitleImage.attr("src", imageURL);

					var theTitleElement = $( "p.document-title" );
					theTitleElement.html( title);

					printTOC();

					if( typeof cchip !== 'undefined') {
						cchip.printPages();
					}

					callbackFn();
				};
				img.src = imageURL;
			});
		});
	});
}

//-----------------------------------------------------------------------

if( typeof cchip === 'undefined') {
	printPages( baseLink, function() {
	});
} else {
	function cchipPrintLoop()
	{
		cchip.beginPrinting();
		printPages( baseLink, function() {
			cchip.endPrinting();
		});
	}
}

//-----------------------------------------------------------------------
