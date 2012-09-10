//Conversion of Degress to Radians
exports.ToRad = function(deg) {
	return deg * Math.PI/180;
}

//Conversion of Radians to Degrees
exports.ToDeg = function(rad) {
	return ((rad * 180/Math.PI) + 360) % 360;
}

//Reference for the functions below http://www.movable-type.co.uk/scripts/latlong.html
exports.Distance = function(point1, point2) {
    var R = 6371; // km
    
    function ToRad(deg) {
		return deg * Math.PI/180;
	}
	
    var dLat = ToRad(point2.lat-point1.lat);
    var dLon = ToRad(point2.lng-point1.lng); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(ToRad(point1.lat)) * Math.cos(ToRad(point2.lat)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
}//result in Km

exports.Bearing = function(point1, point2) {
  var lat1 = point1.lat * Math.PI/180;
  var lat2 = point2.lat * Math.PI/180;
  var dlng = (point2.lng - point1.lng) * Math.PI/180;
  var y = Math.sin(dlng) * Math.cos(lat2);
  var x = Math.cos(lat1) * Math.sin(lat2) -
          Math.sin(lat1) * Math.cos(lat2) * Math.cos(dlng);
  var brng = Math.atan2(y, x);
  return brng;
}

//compute the X displacement from the center of the screen given
//the relative horizontal angle of a POI
exports.ComputeXDelta = function(relAngle) {
    var res = Math.sin(relAngle) / Math.sin(viewAngleX /2);
    return res;
}

function sortByDistance(a, b) {
    var x = a.distance;
    var y = b.distance;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

exports.sortArrayByDistance = function(array){
	array.sort(sortByDistance);
	return array;
}