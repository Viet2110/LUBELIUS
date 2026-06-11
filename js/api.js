// npx json-server --watch db.json
const URL_TABLE = "http://localhost:3000/tables";
const URL_FOOD = "http://localhost:3000/food";
const URL_ORDER = "http://localhost:3000/orders";
const URL_PROFILE = " http://localhost:3000/profile";
const URL_PAYBILL = "http://localhost:3000/paybill";

async function getAll(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; // Trả về data đúng cách
  } catch (error) {
    console.error('Có lỗi xảy ra:', error);
    return null;
  }
}
function edit(url, item) {
  fetch(`${url}/${item.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Item đã được cập nhật', data);
    })
    .catch(error => console.error('Lỗi khi cập nhật', error));
}
function add(url, object) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })
    .then(response => response.json())
    .then(data => {
      // After successful creation, refresh the post list
      fetchPosts();
    })
    .catch(error => console.error('Error creating post:', error));
}

function deleted(url, id) {
  fetch(`${url}/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => console.error('Lỗi khi xóa Item này', error));
}