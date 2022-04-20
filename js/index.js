function prueba(){
    const parameter = window.location.search;

    //Mostramos los valores en consola:
    console.log(parameter);

    if(parameter.substr(0, 4) === '?id=' && (parameter.substr(4) === '1' || parameter.substr(4) === '2')){
        console.log('correcto');
    } else {
        console.log('falso');
    }


    const request = new XMLHttpRequest ();

    request.open ('GET', `https://api7.cloudframework.io/recruitment/fullstack/users?id=${parameter.substr(4)}`);
    request.send ();

    request.onload = () => {
        if (request.status === 200) {
            console.log ("Success"); // So extract data from json and create table

         // Extracting data
            var data = JSON.parse(request.response)
            document.getElementById('name').value = data.data.name
            document.getElementById('surname').value = data.data.surname
            document.getElementById('email').value = data.data.email
            document.getElementById('phone').value = data.data.phone
            document.getElementById('age').value = data.data.age

         // Showing the table inside table
        }
    };

    request.onerror = () => {
        console.log ("error")
    };
}

window.onload = prueba