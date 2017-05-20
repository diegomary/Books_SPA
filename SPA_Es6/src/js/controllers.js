function listCtrl ($http, $interval, $timeout, getApi) {
  getApi.allData('http://localhost:3000/booksfromdb').then((response) => {
    if(response) this.allBooks = response.data; else alert("Error loading data");
  });
}

function searchCtrl ($http,$interval,$timeout) {
  this.temp = "Temporary placeholder for SEARCH controller";
};

export {listCtrl,searchCtrl};
