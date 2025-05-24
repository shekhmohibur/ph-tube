// fething categories from api
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
  .catch(error => console.log(error))
}
// fetching videos from api
const loadVideos = (searchText = ('')) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then(res => res.json())
  .then(data => displayVideos(data.videos))
  .catch(error => console.log(error))
}
//loading category videos
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => {
    removeActiveClass();
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add('active')
    displayVideos(data.category)
  })
  .catch(error => console.log(error))
}
//fetching video details 
const loadVideoDetails =async(video_id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayVideosDetails(data.video)
}
// removing active class from btns
const removeActiveClass = () =>{
  const button = document.getElementsByClassName('category-btn');
  for(let btn of button){
    btn.classList.remove('active')
  }
}
// valid posted date for videos
const timeConversion = (time) => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
};
document.getElementById('searchBox').addEventListener('keyup',(event) =>{
loadVideos(event.target.value)
})
loadCategories();
loadVideos();

// displaying categories
const displayCategories = (categories) =>{
  const categoryContainer =document.getElementById('categories');
  categories.forEach((item) => {
    const buttonContainer = document.createElement('button');
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" class="btn category-btn" onclick="loadCategoryVideos(${item.category_id})">${item.category}</button>
    `
    categoryContainer.append(buttonContainer)
  })
}
//display video details
const displayVideosDetails = (video) => {
  document.getElementById('showModal').onclick();
  console.log(video)
  document.getElementById('modalDetails').innerHTML = `
  <img src="${video.thumbnail}" >
  <h2>${video.title}</h2>
  <p>${video.description}</p>
  `

}
// display vidoes 
const displayVideos = (videos) =>{
  const videoContainer = document.getElementById('videos');
  videoContainer.innerHTML = '';
  if(videos.length == 0){
    videoContainer.classList.remove('grid');
    videoContainer.innerHTML = `
      <div class="flex flex-col min-h-[400px] justify-center items-center">
        <img class="w-44" src="assets/Icon.png">
        <p class="font-bold text-2xl text-center">Oops! Sorry, There is no content here</p>
      </div>
    `;
    return
  }else{
    videoContainer.classList.add('grid');
  }
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
        video.others.posted_date?.length == 0? "" :`<span class="absolute right-2 bottom-2 bg-black text-white text-xs">${timeConversion(video.others.posted_date)}</span>`
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
        <button onclick="loadVideoDetails('${video.video_id}')" class="badge badge-primary badge-outline cursor-pointer">Details</button>
      </div>    
    </div>
    </div>
  `;
  videoContainer.append(card)
})
  
}