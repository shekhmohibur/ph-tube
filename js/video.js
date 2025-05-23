const getCategoryBtn = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );
  const data = await res.json();
  categoryBtns(data.categories);
};
// fetched button from api
getCategoryBtn();
const categoryBtns = (btns) => {
  const cateWrap = document.getElementById("category-btn");
  btns.forEach((item) => {
    const btnwrap = document.createElement("div");
    btnwrap.classList.add("btnStyle");
    btnwrap.innerHTML = `
        <button class="btn py-6 text-lg categoryBtn rounded-md">${item.category}</button>
        `;
    cateWrap.append(btnwrap);
  });
};
// fetched videos from api
const getVideos = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await res.json();
  fetchVideo(data.videos);
};
getVideos();
const fetchVideo = (videos) => {
  const vidoesContainer = document.getElementById("videos");
  videos.forEach((item) => {
    const videoWrap = document.createElement("div");
    console.log(item);
    videoWrap.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-sm">
  <figure class="px-10 pt-10">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>    
  </div>
</div>
        `;
    vidoesContainer.append(videoWrap);
  });
};
