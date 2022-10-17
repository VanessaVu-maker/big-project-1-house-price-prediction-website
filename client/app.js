function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBedValue() {
    var uiBedrooms = document.getElementsByName("uiBedrooms");
    for(var i in uiBedrooms) {
      if(uiBedrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var area = document.getElementById("uiArea");
    var bedrooms = getBedValue();
    var bathrooms = getBathValue();
    var aircon = document.getElementById("uiAircon");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        area: parseFloat(area.value),
        bedrooms: bedrooms,
        bath: bathrooms,
        aircon: aircon.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString();
        console.log(status);
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    var url = "http://127.0.0.1:5000/get_aircon"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_aircon"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_aircon request");
        if(data) {
            var aircon = data.aircon;
            var uiAircon = document.getElementById("uiAircon");
            $('#uiAircon').empty();
            for(var i in aircon) {
                var opt = new Option(aircon[i]);
                $('#uiAircon').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;