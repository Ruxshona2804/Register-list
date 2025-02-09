let phone_number = document.querySelector("#phone_number")
let password = document.querySelector("#password")
async function login() {
    try {
        let body = {
            "phone_number": phone_number.value,
            "password": password.value,  
        }
        
        let res = await fetch("https://asadbek6035.pythonanywhere.com/account/login/", {
            method:"POST",
           headers:{
             "Content-Type": "application/json",
           },
           body:JSON.stringify(body) , 
        });
        res = await res?.json()
        if(res?.success){
localStorage.setItem("accessToken", res?.data?.token?.access);
localStorage.setItem("refreshToken", res?.data?.token?.refresh);
window.location.pathname = '/pages/blogs.html'
        }
    } catch (error) {
        alert("XATO: " + error.message);
    }
}

