/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// [START imports]
var firebase = require('firebase-admin');
// [END imports]
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
var Promise = require('promise');
var escape = require('escape-html');
var clientsocket = require('socket.io-client')('http://localhost:8080');
var serviceAccount = require('./serviceAccountKey.json');
var config = require('./config.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://the-deal-maker.firebaseio.com"
});
// [END initialize]

/**
 * Send a new star notification email to the user with the given UID.
 */
// [START single_value_read]

/**
 * Keep the likes count updated and send email notifications for new likes.
 */
 
 var pricelists = firebase.database().ref('/items');
 pricelists.orderByKey().on("child_added", function(data) {
   console.log(data.key);
});

console.log(config.tradeinterval);
// add jobs when ever needed
function assetCreateJob (){
// get list of assets from firebase and update in blockchain
//  call back to update firebase


}

function tradeJob (){
// get list of assets from firebase and update in blockchain
//  call back to update firebase


}



setInterval(assetCreateJob, 3000);
setInterval(tradeJob, config.tradeinterval);

 function createasset ()
 {
		var msg = {
			name:'hello'
		};
		// alert('hi');
		 //var io1 = socket.connect();
		clientsocket.emit('createasset', msg);
 }
 clientsocket.on('createdasset', function(msg) {
//	 alert(angular.toJson(msg));
      console.log("message", msg);
     // this.chats.push(msg);
 });
	

	//pricelists.then
	
function startAssetListeners() {
  firebase.database().ref('/propertys').on('child_added', function(postSnapshot) {
    var postReference = postSnapshot.ref;
    var uid = postSnapshot.val().propertyowner;
	var blockchainassetid = postSnapshot.val().blockchainassetid;
    var postId = postSnapshot.key;
	console.log(uid);
	if(!blockchainassetid)
	{
		console.log('blockchainassetid not defined');
		createasset();
		
		
	}
    // Update the star count.
    // [START post_value_event_listener]
	/*
    postReference.child('stars').on('value', function(dataSnapshot) {
      updateStarCount(postReference);
      // [START_EXCLUDE]
      updateStarCount(firebase.database().ref('user-posts/' + uid + '/' + postId));
      // [END_EXCLUDE]
    }, function(error) {
      console.log('Failed to add "value" listener at /posts/' + postId + '/stars node:', error);
    });
    // [END post_value_event_listener]
    // Send email to author when a new star is received.
    // [START child_event_listener_recycler]
    postReference.child('stars').on('child_added', function(dataSnapshot) {
      sendNotificationToUser(uid, postId);
    }, function(error) {
      console.log('Failed to add "child_added" listener at /posts/' + postId + '/stars node:', error);
    });
	*/
    // [END child_event_listener_recycler]
  });
  console.log('New star notifier started...');
  console.log('Likes count updater started...');
}


 
function startListeners() {
  firebase.database().ref('/propertys').on('child_added', function(postSnapshot) {
    var postReference = postSnapshot.ref;
    var uid = postSnapshot.val().uid;
    var postId = postSnapshot.key;
    // Update the star count.
    // [START post_value_event_listener]
    postReference.child('stars').on('value', function(dataSnapshot) {
      updateStarCount(postReference);
      // [START_EXCLUDE]
      updateStarCount(firebase.database().ref('user-posts/' + uid + '/' + postId));
      // [END_EXCLUDE]
    }, function(error) {
      console.log('Failed to add "value" listener at /posts/' + postId + '/stars node:', error);
    });
    // [END post_value_event_listener]
    // Send email to author when a new star is received.
    // [START child_event_listener_recycler]
    postReference.child('stars').on('child_added', function(dataSnapshot) {
      sendNotificationToUser(uid, postId);
    }, function(error) {
      console.log('Failed to add "child_added" listener at /posts/' + postId + '/stars node:', error);
    });
    // [END child_event_listener_recycler]
  });
  console.log('New star notifier started...');
  console.log('Likes count updater started...');
}

/**
 * Send an email listing the top posts every Sunday.
 */
function startWeeklyTopPostEmailer() {
  // Run this job every Sunday at 2:30pm.
  schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function () {
    // List the top 5 posts.
    // [START top_posts_query]
    var topPostsRef = firebase.database().ref('/posts').orderByChild('starCount').limitToLast(5);
    // [END top_posts_query]
    var allUserRef = firebase.database().ref('/users');
    Promise.all([topPostsRef.once('value'), allUserRef.once('value')]).then(function(resp) {
      var topPosts = resp[0].val();
      var allUsers = resp[1].val();
      var emailText = createWeeklyTopPostsEmailHtml(topPosts);
      sendWeeklyTopPostEmail(allUsers, emailText);
    }).catch(function(error) {
      console.log('Failed to start weekly top posts emailer:', error);
    });
  });
  console.log('Weekly top posts emailer started...');
}


// Start the server.
//startListeners();
startWeeklyTopPostEmailer();
startAssetListeners();