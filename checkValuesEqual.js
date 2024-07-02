
function checkValuesEqual (first, second){
    if(first === second){
        console.log("The values are equal.");
    }else{
        console.log("The values are not equal.");
    }
}

checkValuesEqual("hello", "goodbye");
checkValuesEqual("hello", "hello");
checkValuesEqual(5, 5);
checkValuesEqual(5, "5");