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
// use this function to get the wikipedia Text output
// getWikipediaText( wikipediaURL, function( title, content) {
//     use content as you want
// });
//
// use this function to get the wikipedia HTML output
// getWikipediaHTML( wikipediaURL, function( title, content) {
//     use content as you want
// });

var limitLinks = 1;

function getAPIWikipediaURL( wikipediaURL, prop)
{
	var parts = wikipediaURL.split( '/');
	if(( 5 == parts.length) && (parts[3] == 'wiki')) {
		parts[3] = 'w';
		parts[4] = 'api.php?action=query&titles=' + parts[4] + '&prop=' + prop + '&rvprop=content&format=json&callback=?';
	}
	return parts.join( '/');
}

function getAPIWikipediaParseURL( wikipediaURL)
{
	var parts = wikipediaURL.split( '/');
	if(( 5 == parts.length) && (parts[3] == 'wiki')) {
		parts[3] = 'w';
		parts[4] = 'api.php?action=parse&page=' + parts[4] + '&format=json&callback=?';
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
	try {
		var url = getAPIWikipediaURL( wikipediaURL, 'revisions');

		$.getJSON( url, {}).done(function( data) {
			var title = '';
			var content = '';

			try {
				for( var page in data.query.pages) {
					title = data.query.pages[page].title;
					console.log( data.query.pages[page]);
					content = data.query.pages[page].revisions[0]['*'];
				}
			} catch( x) {
			}

			callbackFn( title, content);
		})
		.fail( function() {
			callbackFn( '', '');
		});
	} catch( x) {
		callbackFn( '', '');
	}
}

function getWikipediaText( wikipediaURL, callbackFn)
{
	try {
		var url = getAPIWikipediaURL( wikipediaURL, 'extracts');

		$.getJSON( url, {}).done(function( data) {
			var title = '';
			var content = '';

			try {
				for( var page in data.query.pages) {
					title = data.query.pages[page].title;
					content = data.query.pages[page].extract;
				}
			} catch( x) {
			}

			callbackFn( title, content);
		})
		.fail( function() {
			callbackFn( '', '');
		});
	} catch( x) {
		callbackFn( '', '');
	}
}

function convertWikipediaLinks( wikipediaURL, text)
{
	var parts = wikipediaURL.split( '/');
	parts.splice( 3, parts.length);
	var baseURL = parts.join( '/');

	text = text.replace(/ src="\/\//g, ' src="http://');
	text = text.replace(/ srcset="\/\//g, ' srcset="http://');
	text = text.replace(/ href="\/\//g, ' href="http://');
	text = text.replace(/ href="\/wiki\//g, ' href="' + baseURL + '/wiki/');

	return text;
}

function getWikipediaHTML( wikipediaURL, callbackFn)
{
	try {
		var url = getAPIWikipediaParseURL( wikipediaURL);

		$.getJSON( url, {}).done(function( data) {
			var title = '';
			var content = '';

			try {
				if( typeof data.parse !== 'undefined') {
					title = data.parse.title;
					content = convertWikipediaLinks( wikipediaURL, data.parse.text['*']);
				} else {
					title = 'Error: ' + data.error.code;
					content = data.error.info + '<br><br>' + wikipediaURL;
				}
			} catch( x) {
			}

			callbackFn( title, content);
		})
		.fail( function() {
			callbackFn( '', '');
		});
	} catch( x) {
		callbackFn( '', '');
	}
}

function getWikipediaLinks( wikipediaURL, callbackFn)
{
	var list = new Array();
	try {
		var url = getAPIWikipediaURL( wikipediaURL, 'links&pllimit=' + limitLinks);

		$.getJSON( url, {}).done(function( data) {
			var title = '';
			var content = '';

			try {
				for( var page in data.query.pages) {
					title = data.query.pages[page].title;
					content = data.query.pages[page].links;

					if( typeof content !== 'undefined') {
						for( var i = 0; i < content.length; ++i) {
							list.push( content[i].title);
						}
					}
				}
			} catch( x) {
			}

			callbackFn( title, list);
		})
		.fail( function() {
			callbackFn( '', list);
		});
	} catch( x) {
		callbackFn( '', list);
	}
}

function getWikipediaImages( wikipediaURL, callbackFn)
{
	var list = new Array();

	try {
		var url = getAPIWikipediaURL( wikipediaURL, 'images');

		$.getJSON( url, function() {
		}).done(function( data) {
			var title = '';
			var content = '';

			try {
				for( var page in data.query.pages) {
					title = data.query.pages[page].title;
					content = data.query.pages[page].images;

					if( typeof content !== 'undefined') {
						for( var i = 0; i < content.length; ++i) {
							list.push( content[i].title);
						}
					}
				}
			} catch( x) {
			}

			callbackFn( title, list);
		}).fail( function() {
			callbackFn( '', list);
		}).always( function() {
		});
	} catch( x) {
		callbackFn( '', list);
	}
}

function getWikipediaImageFile( site, imageNamespace, callbackFn)
{
	try {
		var image = imageNamespace.split( ':');
		var url = getAPIWikipediaImageURL( site, image[ image.length - 1], 'imageinfo&iiprop=url');
		var list = new Array();

		$.getJSON( url, {}).done(function( data) {
			var content = '';

			try {
				for( var page in data.query.pages) {
					content = data.query.pages[page].imageinfo[0].url;
				}

				callbackFn( content);
			} catch( x) {
				callbackFn( content);
			}
		})
		.fail( function() {
			callbackFn( '');
		});
	} catch( x) {
		callbackFn( '');
	}
}

function getOneRandomImage( site, callbackFn)
{
	try {
		getWikipediaImages( site, function( title, images) {
			try {
				var image = 'Wikipedia-logo-v2.svg';
				if( images.length > 0) {
					while( true) {
						image = images[ Math.floor(( Math.random() * images.length))];
						if(( image.indexOf( 'Commons-logo.svg') < 0) && (image.length > 1)) {
							break;
						}
						image = 'Wikipedia-logo-v2.svg';
					}
				}
				var callbackFn_ = callbackFn;
				getWikipediaImageFile( site, image, function( imageURL) {
					callbackFn_( imageURL);
				});
			} catch( x) {
				callbackFn( '');
			}
		});
	} catch( x) {
		callbackFn( '');
	}
}
