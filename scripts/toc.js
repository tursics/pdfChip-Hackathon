//-----------------------------------------------------------------------
// Example JavaScript document
//---------
// Copyright: © 2014 - David van Driessche, Four Pees, and some more
//-----------------------------------------------------------------------

function printTOC( callbackFn)
{
	// Make sure we have our variable with collected lists
	if (typeof cchipListCollector != 'undefined') {

		// Get the list of TOC items
		var theTocs = cchipListCollector.TOC;
		if ((typeof theTocs !== "undefined") && (theTocs.length > 0)) {

			// Get the element we need to fill
			var theTocsDiv = $( "#toc" );

			// Loop over all real items
			var theTocIndex = 0;

			function generateTOC( callbackTOCFn)
			{
				// The toc item
				var theToc = theTocs[theTocIndex];

//				getOneRandomImage( 'https://en.wikipedia.org/wiki/' + theToc.content, function( imageURL) {
imageURL = '';

					// Create a big link
					var theLink = $( '<a>', {
						class: 'toc-1-big-link',
						href: 'index.html#article' + encodeURIComponent( theToc.content.replace(/\s+/g, ''))
					}).appendTo( theTocsDiv );

					// Append a div to the toc
					var theDiv = $( '<div>', {
						class: 'toc-1-item'
					}).appendTo( theLink );

					$( '<img>', {
						class: 'toc-1-image',
						src: imageURL
					}).appendTo( theDiv );

					var theDiv2 = $( '<div>', {
						class: 'toc-1-text'
					}).appendTo( theDiv );

					$( '<p>', {
						class: 'toc-1-name',
						html: theToc.content
					}).appendTo( theDiv2 );

					$( '<p>', {
						class: 'toc-1-page',
						html: 'page ' + theToc.page
					}).appendTo( theDiv2 );

					callbackTOCFn();

//				});
			}

			function recursiveTOC()
			{
				++theTocIndex;

				if( theTocIndex < theTocs.length) {
					generateTOC( recursiveTOC);
				} else {
					callbackFn();
				}
			}
			generateTOC( recursiveTOC);

			callbackFn();
		} else {
			callbackFn();
		}
	} else {
		callbackFn();
	}
}

//-----------------------------------------------------------------------

function printPages( site, callbackFn)
{
	getWikipediaHTML( site, function( title, content) {
		getOneRandomImage( site, function( imageURL) {
			var theTitleImage = $( "#coverimage" );
			theTitleImage.attr("src", imageURL);

			var theTitleElement = $( "p.document-title" );
			theTitleElement.html( title);

			printTOC( function() {
				if( typeof cchip !== 'undefined') {
					$( 'body').waitForImages( function() {
						cchip.printPages();
						callbackFn();
					});
				} else {
					callbackFn();
				}
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
