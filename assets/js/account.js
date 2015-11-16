var ref = new Firebase('https://makehacks.firebaseio.com/');
var usersRef = ref.child('users');
var user = null;
var userType = null;
var userName = null;
var userDescription = null;
var userSkills = null;
var userCity = null;
var userPic = null;
var checkOffline = false;

ref.setTokenName('QuikBuxApp');

setTimeout(function() {checkOffline=true}, 1000);

ref.authChangeListener(
    function(userData){
        //logged out
        if(checkOffline){
	        var site = window.location.href;
	       	if(site.indexOf('signup.html') == -1 && site.indexOf('login.html') == -1 && site.indexOf('index.html') == -1){
	       		window.location.href = 'index.html';
	       	}
        }
    }, 
    function(userData){
    	user = userData.uid;
    	var isConfigured = true;

    	usersRef.child(user).child('temp').once('value', function(snapshot){
    		console.log(user)
    		isConfigured = snapshot.val();
    		var site = window.location.href;

    		if(isConfigured && (site.indexOf('config.html') > -1 || site.indexOf('signup.html') > -1 || site.indexOf('login.html') > -1)){
    			window.location.href = 'home.html';
    		}else if(!isConfigured && site.indexOf('config.html') == -1){
    		    window.location.href = 'config.html';
    		}
    	});

    	usersRef.child(user).once('value', function(snapshot){
    		try {
	    		userType = snapshot.val().type;
	    		userName = snapshot.val().name;
	    		userDescription = snapshot.val().description;
	    		userSkills = snapshot.val().skills;
	    		userCity = snapshot.val().city;
	    		userPic = snapshot.val().pic;

	    	} catch(e){

	    	}
    	});	    	
    }
);

  
ref.checkForAvailableToken(
	function(userData){
		//logged in
		user = userData.uid;
	},
	function(userData){

	}
);