//-----------------------------------------------------------------------
// Example JavaScript document
//---------
// Copyright: © 2014 - David van Driessche, Four Pees, and some more
//-----------------------------------------------------------------------

function cchipPrintLoop() {

	// Make sure we have our variable with collected lists
	if (typeof cchipListCollector != 'undefined') {

		// Get the list of TOC items
		var theTocs = cchipListCollector.TOC;

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
				text: theToc.content + " - page " + theToc.page
			}).appendTo( theDiv );

		}
	}





	cchip.printPages();
}