const request = require( 'request' );

module.exports = ( apiURL ) => {
	
	function promisedRequest( uri ) {
		return new Promise( function( resolve, reject ){
			request({
				uri: uri,
				json: true
			}, function ( err, response, body ) {
				if ( err ) { 
					return reject( err ); 
				}
				if ( response.statusCode !== 200 ) { 
					return reject( new Error( 'Request failed' ) ); 
				}
				if ( !body ) { 
					return reject( new Error( 'No content' ) ); 
				}
				if ( Array.isArray( body ) && !body.length ) { 
					return reject( new Error( 'Empty' ) ); 
				}
				resolve( body );
			});
		});
	}
	
	function getPage( type, page, sort, genre ) {
		return new Promise( function( resolve, reject ){
			let sort = sort || '';
			let genre = genre || 'all';
			let uri = apiURL + '/' + type + '/' + page + '?sort=' + sort + '&genre=' + genre;
			promisedRequest( uri )
			.then( function( results ){
				resolve( results );
			})
			.catch(function( err ){
				reject( err );
			});
		});
	}
	function getItem( type, imdbID ) {
		return new Promise( function( resolve, reject ){
			let uri = apiURL + '/' + type +'/' + imdbID;
			promisedRequest( uri )
			.then( function( results ){
				resolve( results );
			})
			.catch(function( err ){
				reject( err );
			});
		});
	}
	function getItemGroup( type, imdbIDs, sort ) {
		return new Promise( function( resolve, reject ){
			let sort = sort || '';
			let uri = apiURL + '/' + type +'/select/' + imdbIDs + '?sort=' + sort;
			promisedRequest( uri )
			.then( function( results ){
				resolve( results );
			})
			.catch(function( err ){
				reject( err );
			});
		});
	}
	
	//TODO: Search
	
	return {
		getPage: getPage,
		getItem: getItem,
		getItemGroup: getItemGroup
	}
	
}



/*

getPage( '[shows | movies]', '1', 'trending', 'all' )
.then( function( results ){
  console.log( results );
})
.catch( function( err ){
  console.error( err );
});

getItem( '[show | movie]', 'tt0944947' )
.then( function( results ){
  console.log( results );
})
.catch( function( err ){
  console.error( err );
});

getItemGroup( '[shows | movies]', 'tt0944947,tt0944947,tt0944947,tt0944947', 'updated' )
.then( function( results ){
  console.log( results );
})
.catch( function( err ){
  console.error( err );
});

*/