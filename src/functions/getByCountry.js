const getByCountry = (country) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://coronavirus-19-api.herokuapp.com/countries/${country}`
    );
    const { cases, recovered, deaths, active } = await response.json();
    dispatch({
      type: "find",
      payload: { active, cases, recovered, deaths },
    });
  } catch (err) {
    console.log(err.message);
    return {};
  }
};

export default getByCountry;
