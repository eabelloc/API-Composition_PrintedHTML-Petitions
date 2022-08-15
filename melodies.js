const melodiesURL = "http://localhost:8080/api/melodies/getAll";

window.onload = () => {
    initMelodies();
};

const initMelodies = async () => {
  const melodies = await getMelodies();
  mappedMelodies(melodies);
};

const getMelodies = async () => {
  const rawData = await fetch(melodiesURL);
  const jsonData = await rawData.json();
  return jsonData;
};

const mappedMelodies = (list) => {
    list.data.melodies.map((melody) => {
        return printMelodies ({name: melody.name,
                            image: melody.image,
                            description: melody.description,
                            compositions: getCompositions(melody.compositions),
        })
})};
const getCompositions = (compositions) => {
    const compositionsList = []
    compositions.forEach(composition => {
        compositionsList.push(`${composition.name}: ${composition.description}`)        
    });
    return compositionsList;
};

const printMelodies = (melody) => {
    const melodiesContainer = document.querySelector('#melodies_container')
    melodiesContainer.innerHTML += `
    <figure class="figure_container">
        <div class="name_container">
            <h3>${melody.name}</h3>
            <p>${melody.description}</p>
        </div>
        <div class="img_container">
            <img src="${melody.image}" alt="${melody.name}" />
        </div>
        <div>
            <h4>${melody.compositions.join(': ')}</h4>
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
  