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

function getAPIWikipediaURL( wikipediaURL, prop)
{
	var parts = wikipediaURL.split( '/');
	if(( 5 == parts.length) && (parts[3] == 'wiki')) {
		parts[3] = 'w';
		parts[4] = 'api.php?action=query&titles=' + parts[4] + '&prop=' + prop + '&rvprop=content&format=json&callback=?';
//		parts[4] = 'api.php?action=parse&page=' + parts[4] + '&format=json&callback=?';
	}
	return parts.join( '/');
}

function getAPIWikipediaImageURL( wikipediaURL, imageNamespace, prop)
{
	var parts = wikipediaURL.split( '/');
	if(( 5 == parts.length) && (parts[3] == 'wiki')) {
		parts[3] = 'w';
		parts[4] = 'api.php?action=query&titles=File:' + imageNamespace + '&prop=' + prop + '&format=json&callback=?';
	}
	return parts.join( '/');
}

function getWikipediaWikitext( wikipediaURL, callbackFn)
{
	var url = getAPIWikipediaURL( wikipediaURL, 'revisions');

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
	var url = getAPIWikipediaURL( wikipediaURL, 'extracts');
//	console.log( url);

	$.getJSON( url, {}).done(function( data) {
		var title = '';
		var content = '';
//console.log(data);
//title = data.parse.displaytitle;
//content = data.parse.text['*'];
		for( var page in data.query.pages) {
			title = data.query.pages[page].title;
			content = data.query.pages[page].extract;
		}

		callbackFn( title, content);
	});
}

function getWikipediaLinks( wikipediaURL, callbackFn)
{
	var url = getAPIWikipediaURL( wikipediaURL, 'links&limit=max');
	var list = new Array();

	$.getJSON( url, {}).done(function( data) {
		var title = '';
		var content = '';
		for( var page in data.query.pages) {
			title = data.query.pages[page].title;
			content = data.query.pages[page].links;

			if( typeof content !== 'undefined') {
				for( var i = 0; i < content.length; ++i) {
					list.push( content[i].title);
				}
			}
		}

		callbackFn( title, list);
	});
}

function getWikipediaImages( wikipediaURL, callbackFn)
{
	var url = getAPIWikipediaURL( wikipediaURL, 'images');
	var list = new Array();

	$.getJSON( url, {}).done(function( data) {
		var title = '';
		var content = '';
		for( var page in data.query.pages) {
			title = data.query.pages[page].title;
			content = data.query.pages[page].images;

			if( typeof content !== 'undefined') {
				for( var i = 0; i < content.length; ++i) {
					list.push( content[i].title);
				}
			}
		}

		callbackFn( title, list);
	});
}

function getWikipediaImageFile( site, imageNamespace, callbackFn)
{
	var image = imageNamespace.split( ':');
	var url = getAPIWikipediaImageURL( site, image[ image.length - 1], 'imageinfo&iiprop=url');
	var list = new Array();

	$.getJSON( url, {}).done(function( data) {
		var content = '';
		for( var page in data.query.pages) {
			content = data.query.pages[page].imageinfo[0].url;
		}

		callbackFn( content);
	});
}
