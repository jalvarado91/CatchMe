/// <reference path="../typings/jquery/jquery.d.ts"/>
$(document).ready(function() {
    
    //Username Link Click
    $('#new_subscription').on('pagebeforecreate',  newSubscriptionForm);
    	
    $('.route-select').on('change', routeSelected);
    
    $('#direction').on('change', directionSelected);
    
});

function newSubscriptionForm(data) {
    $('#new_subscription_form .direction-select').hide();
    $('#new_subscription_form .stop-select').hide();
    $('#new_subscription_form .time-range-select').hide();
}

function routeSelected(data) {
    var route = $('#route').val();
    var directions = [];
    
    $.getJSON('http://miami-transit-api.herokuapp.com/api/BusRouteDirections.json', {'RouteID': route}, function(data){
            console.log(JSON.stringify(data));
            directions = $.map(data['RecordSet']['Record'], function(direction, i){
                return direction['Direction'];
            });
            console.log(directions);
            var html = "";
            $.each(directions, function(){
                html += "<option value= '" + this.toString() + "'>";
                html += this.toString();
                html += '</option>';
            });
            
            $("#direction").html(html);
            $('.direction-select').show();
    });   
}

function directionSelected(data) {
    var route = $('#route').val();
    var direction= $('#direction').val();
    console.log(direction);
    var stops = [];
    
    $.getJSON('http://miami-transit-api.herokuapp.com/api/BusRouteStops.json', {'RouteID': route, "Dir": direction}, function(data){
           
            stops = $.map(data['RecordSet']['Record'], function(stop, i){
                return direction['Direction'];
            })

            var html = "";
            $.each(data['RecordSet']['Record'], function(){
                html += "<option value='"+ this["StopID"] + "'>";
                html += this["StopName"];
                html += '</option>';
            });
            console.log(html);
            $("#stop").html(html);
            $('.stop-select').show();
    });
    
   
}

