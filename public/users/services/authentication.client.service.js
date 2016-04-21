/*
File Name:          authentication.client.server.js
Author Name:        Albert Monteiro, Bhanu Kaplish, Manuel Castro
Website Name:       College-system
File Description:   This is an authentication file that refers users
*/

angular.module('users').factory('Authentication',[
    function(){
        this.user = window.user;
        return{
            user: this.user
        };
    }
]);