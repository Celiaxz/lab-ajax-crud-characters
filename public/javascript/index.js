const charactersAPI = new APIHandler("http://localhost:8000");

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
      try {
        //get all characters from API
        const getAllChar = await charactersAPI.getFulCharlList();
        displayCharacters(getAllChar);
      } catch (error) {}
    });

  // function to display
  function displayCharacters(characters) {
    // variable container to store our characters
    const charsContainer = document.querySelector(".characters-container");

    charsContainer.innerHTML = "";
    // loop through
    characters.forEach((character) => {
      const characterCard = document.createElement("div");
      characterCard.className = "character-info";
      charsContainer.appendChild(characterCard);
      characterCard.innerHTML = `
      <div class="id">Id: ${character.id}</div>
      <div class="name">Name: ${character.name}</div>
      <div class="occupation">Occupation: ${character.occupation}</div>
      <div class="cartoon">Is a Cartoon?: ${character.cartoon}</div>
      <div class="weapon">Weapon: ${character.weapon}</div>`;
    });
  }

  // fetch one
  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      // variable to store the dispalyed character
      const toDisplayChr = document.querySelector("#fetchOne-input").value;
      try {
        const fetchOne = await charactersAPI.getOneChar(toDisplayChr);
        //call function
        displayOneChar(fetchOne);
      } catch (error) {}
    });

  //function to fetch one
  function displayOneChar(fetchOne) {
    // resrendering it on same div of characters container instead of adding another div
    const charsContainer = document.querySelector(".characters-container");
    // empty container
    charsContainer.innerHTML = "";
    // if statement to check character by id

    if (fetchOne) {
      //Create the new div
      const characterCard = document.createElement("div");
      characterCard.className = "character-info";
      charsContainer.appendChild(characterCard);
      characterCard.innerHTML = `
      <div class="id">Id: ${fetchOne.id}</div>
      <div class="name">Name: ${fetchOne.name}</div>
      <div class="occupation">Occupation: ${fetchOne.occupation}</div>
      <div class="cartoon">Is a Cartoon?: ${fetchOne.cartoon}</div>
      <div class="weapon">Weapon: ${fetchOne.weapon}</div>`;
    }
  }

  // delete
  // document
  //   .getElementById("delete-one")
  //   .addEventListener("click", function (event) {

  //   });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      // input value to get the ID
      const charId = document.querySelector("#delete-input").value;

      //If an ID is entered in input
      if (charId) {
        const deleteChar = await charactersAPI.deleteOneRegister(charId);

        if (deleteChar) {
          document.getElementById("delete-one").style.backgroundColor = "green";
        } else {
          document.getElementById("delete-one").style.backgroundColor = "red";
        }
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      //input values with corresponing ids
      const idEdit = document.querySelector("#id-edit").value;
      const NameEdit = document.querySelector("#name-edit").value;
      const occupationEdit = document.querySelector("#occupation-edit").value;
      const weaponEdit = document.querySelector("#weapon-edit").value;
      const cartoonEdit = document.querySelector("#cartoon-edit").checked;

      //store gotten value in object just like fake api
      const editCharacter = {
        name: NameEdit,
        occupation: occupationEdit,
        weapon: weaponEdit,
        cartoon: cartoonEdit,
      };

      //variable to edit chararacters  on API
      const toEditChar = await charactersAPI.updateOneRegister(
        idEdit,
        editCharacter
      );
      if (toEditChar) {
        document.getElementById("edit-data").style.backgroundColor = "green";
      } else {
        document.getElementById("edit-data").style.backgroundColor = "red";
      }
    });

  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      //input values with corresponing ids
      const name = document.querySelector("#new-name").value;
      const occupation = document.querySelector("#new-occupation").value;
      const weapon = document.querySelector("#new-weapon").value;
      const cartoon = document.querySelector("#new-cartoon").checked;

      // destructuring, use variable name as field name
      const newCharacter = {
        name,
        occupation,
        weapon,
        cartoon,
      };

      //to store our
      const toAddChar = await charactersAPI.createOneRegister(newCharacter);

      if (toAddChar) {
        document.getElementById("send-data").style.backgroundColor = "green";
      } else {
        document.getElementById("send-data").style.backgroundColor = "red";
      }
    });
});
