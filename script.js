// function dropMenu()
// {
//     // const hiddenMeds = document.querySelector('.pastMed');
//     const hiddenMeds = document.getElementsByClassName('pastMed')
//     const dropDown = document.querySelector('.dropDown');

//     // dropDown.addEventListener('click', function(){
//     //     hiddenMeds.classList.toggle('med-active');
//     // });

//     // hiddenMeds.forEach(function(med, index)
//     // {
//     //     med.style.animation = 'medFade 0.5s ease forwards ${index / 7 + 2}s';
//     // });

//     // hiddenMeds.forEach(function(med)
//     // {
//     //     med.style.opacity = 0;
//     // });
//     alert("clicked");

//     for (let i = 0; i < hiddenMeds.length; i++)
//     {
//         hiddenMeds[i].style.opacity = 0;
//     }

//     alert("clicked");
// }

// dropMenu();

function dropMenu()
{
    const dropDown = document.getElementById('dropDown');
    const hiddenMeds = document.getElementsByClassName('pastMed');
    const medStyles = window.getComputedStyle(hiddenMeds[0]);
    const dropStyles = window.getComputedStyle(dropDown);
    var currOpacity = medStyles.getPropertyValue('opacity');
    var newOpacity;
    
    if (currOpacity == 1)
    {
        newOpacity = 0;
        dropDown.style.transform = "rotate(-270deg)";
    }
    else
    {
        newOpacity = 1;
        dropDown.style.transform = "rotate(270deg)";
    }

    for (let i = 0; i < hiddenMeds.length; i++)
    {
        hiddenMeds[i].style.opacity = newOpacity;
    }

    
}