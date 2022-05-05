function find_same_color(){
    var div = document.getElementById('pla_link');
    div.innerHTML = "";
    pla_return = nearestColor(document.getElementById("color").value); 
    //div.innerHTML += "<b> " + pla_info[4] +"</b> <p> " +pla_info[3] +" <a href =\"" + pla_info[1] + "\"> Link </a></p>"  ;
    for (let index = 0; index < pla_return.length; index++) {
        pla_info = pla_return[index];
        console.log(pla_info)
    if( pla_info[1] != " None"){
        div.innerHTML += "<b> " + pla_info[4] +"</b>" + pla_info[6]+ "   <p> " +pla_info[3] +" <a href =\"" + pla_info[1] + "\"> Link </a></p><br>"  ;
    }else if (pla_info[2] != " None"){
        div.innerHTML += "<b> " + pla_info[4] +"</b>"+ pla_info[6]+ "  <p> " +pla_info[3] +" <a href =\"" + pla_info[2] + "\"> Link </a></p><br>"  ;
    }else{
        div.innerHTML += "<b> " + pla_info[4] +"</b>"+ pla_info[6]+ "  <p> " +pla_info[3] +" <a href =\"" + pla_info[5] + "\"> Link </a></p><br>"  ;
    }
    }
}
function get_pla_colors(){
    my_text = loadFile("demofile3.txt");
    my_text = parseCSV(my_text);
    //console.log(my_text);
    return(my_text);
}
function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}
function parseCSV(str) {
    var arr = [];
    var quote = false;
    for (var row = col = c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c+1];
        arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || '';
        
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }
        if (cc == '"') { quote = !quote; continue; }
        if (cc == ',' && !quote) { ++col; continue; }
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        
        arr[row][col] += cc;
    }
    return arr;
}
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  //console.log(hex)
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Distance between 2 colors (in RGB)
// https://stackoverflow.com/questions/23990802/find-nearest-color-from-a-colors-list
function distance(a, b) {
    return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
}

// return nearest color from array
function nearestColor(colorHex){
  var lowest = Number.POSITIVE_INFINITY;
  var low_index = 0;
  var tmp;
  let index = 0;
  var lowests = [[1000, 0],[1000, 0],[1000, 0]]
  while(index < baseColors.length){
      tmp = distance(hexToRgb(colorHex), hexToRgb(baseColors[index][0]))
    if(lowests[0][0] > tmp){
        console.log(lowests);
        lowests[0] = [tmp, index];
        lowests.sort();
        //lowests = lowests.reverse();
    }
      if (tmp < lowest) {
        lowest = tmp;
        low_index = index;
      };
      
        index = index + 1;
    };
    lowests.sort();
    
  return [baseColors[lowests[0][1]], baseColors[lowests[1][1]], baseColors[lowests[2][1]] ];
  
}
const baseColors = get_pla_colors()
//console.log(nearestColor("#FFFFFF")); 

