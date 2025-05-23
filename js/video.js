const getCategoryBtn = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
  const data = await res.json();
  categoryBtns(data.categories);
}