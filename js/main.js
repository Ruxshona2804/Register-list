
let full_name = document.querySelector("#full_name")
let phone_number = document.querySelector("#phone_number")
let password = document.querySelector("#password")
let password2 = document.querySelector("#password2")
let avatar = document.querySelector("#avatar")


async function register() {
    try {
        if (password.value !== password2.value) 
            throw new Error("Parol mos kelmadi!!!")

        const form_data = new FormData()
        form_data.append( "full_name", full_name.value)
        form_data.append( "phone_number", phone_number.value)
        form_data.append( "password", password.value)
        form_data.append( "password2", password2.value)
        form_data.append( "avatar", avatar.files[0])

        let res = await fetch("https://asadbek6035.pythonanywhere.com/account/register/", {
             method: "POST",
             body: form_data,
         });
         
        res = await res?.json()
        console.log(res);
        
           if (res) {
             window.location.pathname = `/pages/login.html`
         }   
    } catch (error) {
        alert(error.message)

    }
}


