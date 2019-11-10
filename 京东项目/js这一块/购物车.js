var shoppingTrolley = {
	store : document.getElementsByClassName('store'),
	
	 initialise : function(){
	 	for(var i = 0; i < this.store.length; i ++){
	 		console.log(this.store[i]);
	 		var storeChildCheck = this.store[i].getElementsByClassName('storeChildCheck');
		 	var self = this;
		 	for(var i = 0; i < storeChildCheck.length; i ++){
		 		(function (i){	
		 			var singleSelection = self.seek(storeChildCheck[i]).getElementsByClassName('singleSelection');
					// console.log(self.seek(storeChildCheck[i]));
		 			storeChildCheck[i].addEventListener('change', function(){
		 				console.log(singleSelection.length);
			 			for(var j = 0; j < singleSelection.length; j ++){
			 				// console.log(singleSelection[j]);
			 					singleSelection[j].checked = storeChildCheck[i].checked;
			 			}
		 			}, false);
		 		}(i))
		 		
		 	}
	 	}
	 	
	 },
	 init :function(){
	 	this.initialise();
	 },
	 seek : function (obj){
	 	return obj.parentNode.parentNode.parentNode;
	 },
};
shoppingTrolley.init();