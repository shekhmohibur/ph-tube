// fething categories from api
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
  .catch(error => console.log(error))
}
// fetching videos from api
const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then(res => res.json())
  .then(data => displayVideos(data.videos))
  .catch(error => console.log(error))
}
// valid posted date for videos
loadCategories();
loadVideos();
// displaying categories
const displayCategories = (categories) =>{
  const categoryContainer =document.getElementById('categories');
  categories.forEach((item) => {
    const button = document.createElement('button');
    button.classList = 'btn';
    button.innerText = item.category;
    categoryContainer.append(button)
  })
}

// display vidoes 
const displayVideos = (videos) =>{
  const videoContainer = document.getElementById('videos');
  videos.forEach((video) => {
  const card = document.createElement('div');
  card.classList = 'card card-compact';
  card.innerHTML = `
  <figure class="h-52 relative">
    <img
      src="${video.thumbnail}"
      alt="${video.title}" 
      class="h-full w-full object-cover"/>
      ${
        video.others.posted_date?.length == 0? "" :`<span class="absolute right-2 bottom-2 bg-black text-white">${video.others.posted_date}</span>`
      }
  </figure>
  <div class="">
    <div class="px-0 py-3 flex gap-3">
      <div>
        <img class="w-12 h-12 rounded-full object-full" src="${video.authors[0].profile_picture}">
      </div>
      <div>
        <h2 class="text-lg font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
          <p class="text-gray-400">${video.authors[0].profile_name}</p>
          ${video.authors[0].verified === true?`<img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000">`:""}
        </div>
        <p>${video.others.views}</p>
      </div>    
    </div>
    </div>
  `;
  videoContainer.append(card)
})
  
}