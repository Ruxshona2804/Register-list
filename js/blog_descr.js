let accessToken = localStorage.getItem('accessToken');
let id = new URLSearchParams(window.location.search).get("id");

if (!id) {
    document.getElementById("blog-detail").innerHTML = "<p style='color: red; font-weight: bold;'>Xatolik: Blog ID topilmadi!</p>";
} else {
    fetch(`https://asadbek6035.pythonanywhere.com/blog/retrieve/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server xatosi yoki noto'g'ri ID");
            }
            return response.json();
        })
        .then(blog => {
            document.getElementById("blog-detail").innerHTML = `
            <h1 style="text-align: center; color: darkgreen; font-size: 50px; margin-bottom: 20px;">Blog tafsilotlari</h1>
            <button onclick="window.location.href='blogs.html'" style="display: block; margin: 10px auto; padding: 10px 20px; background-color: green; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Ortga qaytish</button>
            <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center; background: #fff;">
                <img src="${blog.image}" alt="Blog rasm" style="width: 100%; border-radius: 10px; margin-bottom: 15px;">
                <h2 style="color: #333; font-size: 24px;">${blog.title}</h2>
                <p style="color: #666; font-size: 16px;"><strong>Kategoriya:</strong> ${blog.category}</p>
                <p style="color: #999; font-size: 14px;"><strong>Sana:</strong> ${blog.date_created}</p>
                <p style="color: #444; font-size: 18px; line-height: 1.5;">${blog.description}</p>
            </div>
            <section style="max-width: 600px; margin: 30px auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background: #f9f9f9;">
                <p style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">Kommentariyalar</p>
                <div>
                    <textarea id="comment" class="border rounded-lg p-3 w-full" style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 16px; resize: vertical;"></textarea>
                    <button onclick="postComment()" style="display: block; margin-top: 10px; padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Komment yuborish</button>
                </div>
            </section>
        `;
        })
        .catch(error => {
            console.error("Xatolik:", error);
            document.getElementById("blog-detail").innerHTML = "<p style='color: red; font-weight: bold;'>Blog ma'lumotlarini yuklashda xatolik yuz berdi.</p>";
        });
}











async function getByIDComment() {
    try {
        let res = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!res.ok) throw new Error("Kommentariyalarni yuklashda xatolik");
        res = await res.json();
        console.log(res);
    } catch (error) {
        console.error("Xatolik:", error);
    }
}

async function postComment() {
    try {
        let commentInput = document.getElementById("comment");
        let body = {
            blog: id,
            description: commentInput.value
        };

        let res = await fetch("https://asadbek6035.pythonanywhere.com/blog/comment/post/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error("Komment yuborishda xatolik");
        res = await res.json();

        if (res) {
            getByIDComment();
            commentInput.value = "";
            getByIDComments()
        }
    } catch (error) {
        console.error("Xatolik:", error);
    }
}

getByIDComment();



// Blogga tegishli kommentariyalarni olish
async function getByIDComments() {
    let res = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    res = await res.json();
    
    let commentsSection = document.getElementById("comments");
    commentsSection.innerHTML = ""; 

    if (res.length === 0) {
        commentsSection.innerHTML = "<p class='text-gray-500'>Hali hech qanday fikr yo‘q</p>";
        return;
    }

    res.forEach(comment => {
        let commentDiv = document.createElement("div");
        commentDiv.className = "border p-3 rounded-lg mb-2 bg-gray-100";
        commentDiv.innerHTML = `
            <p><strong>${comment.user.full_name}</strong> (${comment.date_created}):</p>
            <p>${comment.description}</p>
        `;
        commentsSection.appendChild(commentDiv);
    });
}

getByIDComments();