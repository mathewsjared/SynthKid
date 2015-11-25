
function print(value, pre, vert) {
  var output = '';

  if(typeof pre === 'string') {
    output += pre;
  }

  output += value;

  console.log(output);

  if(vert == undefined) {
    console.log('');
  }
  else {
    for(var i=0; i<vert; i++) {
      console.log('');
    }
  }
}
