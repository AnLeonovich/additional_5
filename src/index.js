module.exports = function check(str, bracketsConfig) {
   var obj = {}, k = {};
    var arr = [];
    var stack = [];
    var j=0, open =0, close =0;
    var s, c, b;
    var a = true;

    if(str.length % 2) return false; // если кол-во символов нечетное

    for(var i = 0; i < bracketsConfig.length; i++) {  
        obj[bracketsConfig[i][j]] = bracketsConfig[i][j+1]

        if(bracketsConfig[i][j] == bracketsConfig[i][j+1]){  // массив одинаковых открывающих/закрывающих (повторяшки)
            arr.push(bracketsConfig[i][j]);
        }

    }
  
    // количество открывающих/закрывающих скобок
    for(i = 0; i < str.length; i++){
        s = str[i];

        if(arr.indexOf(s)>=0){ // для повторяшек
            if(a){
                open++;
                a=false;
            } else {
                close++;
                a=true;
            }
        }else{   // для обычных (разная открывающая и закрывающая)
            if(obj[s]){
                open++;     
            } else {
                close++;
            }
        }
    }

    if(open != close){ // если количество открывающих и закрывающих не совпадает
        return false;
    }
  
    //проверка
    for(i = 0; i < arr.length; i++){ // метки для повторяшек
        k[i] = true;
    }

    for(i = 0; i < str.length; i++){

    c = str[i];

        if(arr.indexOf(c)>=0){  // для повторяшек
            if(k[arr.indexOf(c)] == true){
                stack.push(c);
                k[arr.indexOf(c)]=false;
            } else {

                if(stack.length === 0){
                    return false;
                }

                b = stack.pop();
                if(c != obj[b]) {
                    return false;
                }
                k[arr.indexOf(c)]=true;
            } 

        }else{  // для обычных
            if (obj[c]){
                stack.push(c);
            }else{
                if(stack.length === 0){
                    return false;
                }
                b = stack.pop();
                if(c != obj[b]) {
                    return false;
                }
            } 
        }
    }

    if (stack.length > 0){ 
        return false;
    }
      
    return true;
}
