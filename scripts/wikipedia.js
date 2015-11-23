//-----------------------------------------------------------------------
// Load data from wikipedia
//---------
// Copyright: ??? Thomas Tursics
//-----------------------------------------------------------------------
//
// use this function to get the wikipedia source text
// getWikipediaWikitext( wikipediaURL, function( title, content) {
//     use content as you want
// });
//
// use this function to get the wikipedia HTML output
// getWikipediaHTML( wikipediaURL, function( title, content) {
//     use content as you want
// });

function getAPIWikipiaURL( wikipediaURL, prop)
{
	var parts = wikipediaURL.split( '/');
	if(( 5 == parts.length) && (parts[3] == 'wiki')) {
		parts[3] = 'w';
		parts[4] = 'api.php?action=query&titles=' + parts[4] + '&prop=' + prop + '&rvprop=content&format=json&callback=?';
	}
	return parts.join( '/');
}

function getWikipediaWikitext( wikipediaURL, callbackFn)
{
	var url = getAPIWikipiaURL( wikipediaURL, 'revisions');

	$.getJSON( url, {}).done(function( data) {
		var title = '';
		var content = '';
		for( var page in data.query.pages) {
			title = data.query.pages[page].title;
			console.log( data.query.pages[page]);
			content = data.query.pages[page].revisions[0]['*'];
		}

		callbackFn( title, content);
	});
}

function getWikipediaHTML( wikipediaURL, callbackFn)
{
	var url = getAPIWikipiaURL( wikipediaURL, 'extracts');

	$.getJSON( url, {}).done(function( data) {
		var title = '';
		var content = '';
		for( var page in data.query.pages) {
			title = data.query.pages[page].title;
			content = data.query.pages[page].extract;
		}

		callbackFn( title, content);
	});
}
