const getCategoryBtn = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
  const data = await res.json();
  categoryBtns(data);
}

getCategoryBtn();

const categoryBtns = (btns) =>{
    const cateWrap = document.getElementById('category-btn');
    for(const btn of btns.categories){
        console.log(btn)
        const newBtn = document.createElement('button');
        
    }
}