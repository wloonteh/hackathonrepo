$.getJSON("http://192.168.43.212:3000/cities/?format=json",function(data){
  var danger_level = data[0].dangerLevel;
  console.log(danger_level);
  $("#danger_level").append(danger_level);
  if (danger_level >= 9) {
    document.getElementById("danger_level").style.color = "#C63232";
  } else if (danger_level >= 7) {
    document.getElementById("danger_level").style.color = "#EA8F33";
  } else if (danger_level >= 4) {
    document.getElementById("danger_level").style.color = "#EAE548";
  } else if (danger_level > 1) {
    document.getElementById("danger_level").style.color = "#74BD49";
  }
});