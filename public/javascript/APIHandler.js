class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  // getFullList = async () => {
  //   const response = await fetch("http://localhost:8000/characters");
  //   console.log(response);
  //   if (response.status === 200) {
  //     return response.json();
  //   }
  // };
  getFulCharlList = async () => {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters`);
      console.log("my response:", response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // getOneChar = async (id) => {
  //   const response = await fetch("http://localhost:8000/characters/:id");
  //   if (response.status === 200) {
  //     return response.json();
  //   }
  // };
  getOneChar = async (id) => {
    try {
      const url = `${this.BASE_URL}/characters/${id}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  createOneRegister = async (oneCharData) => {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/characters`,
        oneCharData
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("error occurred while creating: ", error);
      return oneCharData;
    }
  };

  updateOneRegister = async (id, CharUpDate) => {
    try {
      const response = await axios.patch(
        `${this.BASE_URL}/characters/${id}`,
        CharUpDate
      );
      console.log("response :", response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("error occurred while updating: ", error);
    }
  };

  deleteOneRegister = async (id) => {
    try {
      const response = await axios.delete(`${this.BASE_URL}/characters/${id}`);
      console.log("response :", response);
      if (response.status === 200) {
        return true; // when deleted
      }
    } catch (error) {
      console.log("error ocurred while deleting : ", error);
    }
  };
}
