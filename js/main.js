const button = document.getElementById('oblicz');

button.addEventListener('click', function(){
    countSalary();
});

function countSalary(){
    const empNames = document.getElementsByClassName('pracownik');
    const empCount = empNames.length;
    const time = document.getElementsByClassName('czas');
    const salaryPerHour = document.getElementsByClassName('stawka');
    const salarySpan = document.getElementsByClassName('wyplata');

    let fullSalary = 0;
    // tablica z najlepszymi pracownikami
    const bestEmployees = [];

    // iteracja po każdym pracowniku
    for(let i = 0; i < empCount; i++){

        let timeWorked = time[i].value;
        let ratePerHour = salaryPerHour[i].value;
        let fullSalary = 0;

        // obliczenie wypłat
        if(timeWorked > 160){
            let bonus = (timeWorked - 160) * (ratePerHour*2);
            fullSalary = (160 * ratePerHour) + bonus;

            // wrzucenie obiektu pracownika > 160 godzin do tablicy
            bestEmployees.push({
                name: empNames[i].textContent,
                time: timeWorked
            });
        } else {
            fullSalary = timeWorked * ratePerHour;
        }

        // znalezienie pracowników < 100h pracy i dodanie czerwonego koloru
        if(timeWorked < 100){
            empNames[i].style.color = 'red';
        }
        // aktualizacja spana
        salarySpan[i].textContent = fullSalary.toString();
    }

    // znalezienie trzech najlepszych pracowników
    getThreeBest(bestEmployees);
}

function getThreeBest(arr){
    // sortowanie obiektów w tablicy po najwyższym czasie pracy
    arr.sort(function(a, b){
        return b.time-a.time;
    });
    console.log(arr);

    // dodanie 3 pierwszych imion do stringa i dodanie do spana z najlepszymi pracownikami
    let workerNames = '';
    for(let i = 0; i < 3; i++){
        workerNames += `<span class="star">&star;</span> ${arr[i].name} <span class="star">&star;</span>`;
    }
    document.getElementById('najlepsi-pracownicy').innerHTML = workerNames;
}