/*console.log("add blog");

let image = document.querySelector("#image")
let accessToken = localStorage.getItem('accessToken')
console.log(accessToken);

async function addBlog() {
    let form_data = new FormData()
    form_data.append("image" , image.files[0])
    form_data.append("title" , "blog3")
    form_data.append("category" , "3")
    form_data.append("description" , "more peoples")


    let res = await fetch("https://asadbek6035.pythonanywhere.com/blog/create/",
        {
            method: "POST",
            headers:{
                "Authorization": `Bearer ${accessToken}`
            },
            body: form_data,
        })
        res =  await res?.json()
        console.log(res);
       /* if(res){
            window.location.pathname = '/pages/blogs.html'
        }*/






            document.getElementById("blogForm").addEventListener("submit", async function (event) {
                event.preventDefault();
                
                let accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    alert("Iltimos, avval tizimga kiring!");
                    return;
                }
                
                let formData = new FormData();
                formData.append("title", document.getElementById("title").value);
                formData.append("category", document.getElementById("category").value);
                formData.append("description", document.getElementById("description").value);
                formData.append("image", document.getElementById("image").files[0]);
                
                try {
                    let response = await fetch("https://asadbek6035.pythonanywhere.com/blog/create/", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        },
                        body: formData
                    });
                    
                    let result = await response.json();
                    if (response.ok) {
                        alert("Blog muvaffaqiyatli qo'shildi!");
                        window.location.href = "blogs.html";
                    } else {
                        alert("Xatolik yuz berdi: " + JSON.stringify(result));
                    }
                } catch (error) {
                    console.error("Xatolik:", error);
                    alert("Server bilan bog'lanishda muammo yuz berdi.");
                }
            });