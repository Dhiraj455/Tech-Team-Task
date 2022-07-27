console.log('Hello World!');
// function hello() {
//     console.log('Hello World!');
//     var x = document.getElementById("search-addon");
//     // filter = input.value.toUpperCase();
//     filter = x.value.toUpperCase();


function hello(){
    console.log("hello");
    var x = document.getElementById("mix");
    console.log(x.value);
    var filter = x.value.toUpperCase();
    var y = document.getElementsByClassName("food-items");
    for (i = 0; i < y.length; i++) {
        var a = y[i].getElementsByTagName("h5")[0];
        var txtValue = a.textContent || a.innerText;
        // txtValue = a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            y[i].style.display = "";
        } else {
            y[i].style.display = "none";
        }
    }
}
