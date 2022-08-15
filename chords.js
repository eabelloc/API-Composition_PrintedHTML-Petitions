const chordsURL = "http://localhost:8080/api/chords/getAll";

window.onload = () => {
  initChords();
};

const initChords = async () => {
  const chords = await getChords();
  mappedChords(chords);
};

const getChords = async () => {
  const rawData = await fetch(chordsURL);
  const jsonData = await rawData.json();
  return jsonData;
};

const mappedChords = (list) => {
    list.data.chords.map((chord) => {
        return printChords ({name: chord.name,
                            image: chord.image,
                            description: chord.description,
                            compositions: getCompositions(chord.compositions),
        })
})};
const getCompositions = (compositions) => {
    const compositionsList = []
    compositions.forEach(composition => {
        compositionsList.push(`${composition.name}: ${composition.description}`)        
    });
    return compositionsList;
};

const printChords = (chord) => {
    const chordsContainer = document.querySelector('#chords_container')
    chordsContainer.innerHTML += `
    <figure class="figure_container">
        <div class="name_container">
            <h3>${chord.name}</h3>
            <p>${chord.description}</p>
        </div>
        <div class="img_container">
            <img src="${chord.image}" alt="${chord.name}" />
        </div>
        <div>
            <h4>${chord.compositions.join(': ')}</h4>
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

const search = () => {
  const button = document.querySelector('button')
  const filteredchords = chordsList.filter((composition) => {
      composition.name.lowerCase().includes(myInput.value.tolowerCase())
  });
  console.log("filtered", filteredchords)
  printChords(filteredchords)
}