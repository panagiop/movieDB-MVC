'use strict';

let appendItemsToTemplate = ( list, classToBeAppended, templateFn ) => {
	if ( list && list.results ) { list = list.results; }
	
	if ( typeof list === 'string' ) {
		return $(classToBeAppended).append(templateFn(list));
	}

	if ( typeof list === 'object' ){
		list.forEach(( item ) => {
			return $(classToBeAppended).append(templateFn(item));
		});
	}
};

module.exports = appendItemsToTemplate;