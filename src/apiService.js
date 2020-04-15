const baseUrl = 'https://pixabay.com/api/';
const request = '?image_type=photo&orientation=horizontal&'
const apiKey = '16045246-fdd78b83cbf5b45609c75787e';

export default {
  page: 1,
  query:'',
  fetchQuery(){
    const parameters =`q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`
      return fetch (baseUrl + request + parameters)
      .then(res => res.json())
      .then(parsRes => {
        this.incrementPage();
        return parsRes.hits});
      },
      get searchQuery(){
        return this.query;
      },

      set searchQuery(string){
        this.query = string;
      },
      incrementPage() {
        this.page +=1;
      },
      resetPage() {
        this.page = 1;
      }
    }
