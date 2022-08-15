const compositionsURL = "http://localhost:8080/api/compositions/getAll";

window.onload = () => {
  initCompositions();
};

const initCompositions = async () => {
  const compositions = await getCompositions();
  mappedCompositions(compositions);
};

const getCompositions = async () => {
  const rawData = await fetch(compositionsURL);
  const jsonData = await rawData.json();
  return jsonData;
};

const mappedCompositions = (list) => {
    list.data.compositions.map((composition) => {
        return printCompositions ({name: composition.name,
                            image: composition.image,
                            description: composition.description,
                            chords: getChords(composition.chords),
                            rhythms: getRhythms(composition.rhythms),
                            melodies: getMelodies(composition.melodies)
        })
})};
const getChords = (chords) => {
    const chordsList = []
    chords.forEach(chord => {
        chordsList.push(`${chord.name}: ${chord.description}`)        
    });
    return chordsList;
};
const getRhythms = (rhythms) => {
    const rhythmsList = []
    rhythms.forEach(rhythm => {
        rhythmsList.push(`${rhythm.name}: ${rhythm.description}`)        
    });
    return rhythmsList;
};
const getMelodies = (melodies) => {
    const melodiesList = []
    melodies.forEach(melody => {
        melodiesList.push(`${melody.name}: ${melody.description}`)        
    });
    return melodiesList;
};


const printCompositions = (composition) => {
    const compositionsContainer = document.querySelector('#compositions_container')
    compositionsContainer.innerHTML += `
    <figure class="figure_container">
        <div class="name_container">
            <h3>${composition.name}</h3>
            <p>${composition.description}</p>
        </div>
        <div class="img_container">
            <img src="${composition.image}" alt="${composition.name}" />
        </div>
        <div>
            <h4>${composition.chords.join('/')}</h4>
            <h4>${composition.rhythms.join('/')}</h4>
            <h4>${composition.melodies.join('/')}</h4>
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

