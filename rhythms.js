const rhythmsURL = "http://localhost:8080/api/rhythms/getAll";

window.onload = () => {
    initRhythms();
};

const initRhythms = async () => {
  const rhythms = await getRhythms();
  mappedRhythms(rhythms);
};

const getRhythms = async () => {
  const rawData = await fetch(rhythmsURL);
  const jsonData = await rawData.json();
  return jsonData;
};

const mappedRhythms = (list) => {
    list.data.rhythms.map((rhythm) => {
        return printRhythms ({name: rhythm.name,
                            image: rhythm.image,
                            description: rhythm.description,
                            compositions: getCompositions(rhythm.compositions),
        })
})};
const getCompositions = (compositions) => {
    const compositionsList = []
    compositions.forEach(composition => {
        compositionsList.push(`${composition.name}: ${composition.description}`)        
    });
    return compositionsList;
};

const printRhythms = (rhythm) => {
    const rhythmsContainer = document.querySelector('#rhythms_container')
    rhythmsContainer.innerHTML += `
    <figure class="figure_container">
        <div class="name_container">
            <h3>${rhythm.name}</h3>
            <p>${rhythm.description}</p>
        </div>
        <div class="img_container">
            <img src="${rhythm.image}" alt="${rhythm.name}" />
        </div>
        <div>
            <h4>${rhythm.compositions.join(': ')}</h4>
        </div>
    </figure>
  `;
};

/*PARALLAX :3*/
$(window).scroll(function(e){
    parallax();
  });
  function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('top',-(scrolled*0.2)+'px');
  }