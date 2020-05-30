const checks = document.getElementsByClassName('ifChecked');
let anchor = document.getElementById('anchor');

function Click(){
    for (let a of checks){
        if(a.checked){
            anchor.href += a.id;
            anchor.href += '&id=';
        }
    }
};