let accessToken = localStorage.getItem("accessToken");
(function checkAuth() {
    if (!accessToken) {
        window.location.href = "login.html";
    }
})();
document.addEventListener("DOMContentLoaded", function () {
    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = `<p class="text-center text-gray-500 text-lg">Loading...</p>`;
    fetch("https://asadbek6035.pythonanywhere.com/blog/list/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Serverdan noto‘g‘ri javob keldi!");
            }
            return response.json();
        })
        .then(blogs => {
            blogList.innerHTML = "";
            blogs.forEach(blog => {
                const blogItem = document.createElement("div");
                blogItem.classList.add("blog-item", "bg-blue-50", "p-6", "rounded-xl", "shadow-xl", "max-w-lg");
                blogItem.innerHTML = `
                    <img class="w-full h-40 object-cover rounded-xl shadow-lg mb-4" src="${blog?.image}" alt="Blog rasm" width="200">
                    <h2 class="text-gray-700 font-bold">${blog.title}</h2>
                    <p class="text-gray-700 font-semibold"><strong>Kategoriya:</strong> ${blog.category}</p>
                    <p class="text-gray-700 font-semibold"><strong>Sana:</strong> ${blog.date_created}</p>
                    <p class="text-gray-700 font-semibold">${blog.description}</p>
                    <button class="inline-block mt-3 border bg-blue-400 active:bg-blue-600 m-2 p-2 rounded-lg text-center font-bold" 
                        onclick="viewDetail(${blog.id})">Batafsil</button>    `;
                blogList.appendChild(blogItem);
            });
        })
        .catch(error => {
            console.error("Xatolik:", error);
            blogList.innerHTML = `<p class="text-center text-red-500 text-lg">Xatolik yuz berdi. Ma'lumot yuklanmadi.</p>`;
        });
});
function viewDetail(blogId) {
    window.location.href = `blog_descr.html?id=${blogId}`;
}