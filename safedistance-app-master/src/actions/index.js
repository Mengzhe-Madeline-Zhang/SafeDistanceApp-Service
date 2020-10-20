
/** Creating an action to fetch location stats using API call.
 * added type and payload to dispatch data to reducer.
 * */
export const fetchLocationData = (interval) => async dispatch => {

  let response = await fetch('https://prod.mengchen-gao.me/locationStats/' + interval,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    });
  let jsonData;
  if (response.ok) {
    jsonData = await response.json();
  } else {
    alert("Http-error: " + response.status);
  }
  dispatch({
    type: 'FETCH_LOCATIONS', payload: {
      interval: interval,
      data: jsonData
    }
  });
};


export const readLocationDataFromState = () => {
  return {
    type: 'READ_LOCATIONS'
  };
};