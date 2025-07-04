const API = "https://686779e0e3fefb261edecfde.mockapi.io/users/users";
const Add = document.querySelector("#addUser");
const lavozim = document.querySelector("#lavozim");
const manzil = document.querySelector("#manzil");
const dataArea = document.querySelector(".dataArea");
const userDiv = document.querySelector(".userDiv");

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  async function fetchUsers(params) {
    try {
      const data = await fetch(API);
      const users = await data.json();
      disPlayUsers(users);
    } catch (error) {
      console.log(
        "Kechirasiz ma'lumotlarni yuklashda xatolik yuz berdi",
        error
      );
    }
  }
  function disPlayUsers(data) {
    dataArea.innerHTML = "";
    data.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.setAttribute(
        "class",
        "userDivw-[98%] m-auto bg-gray-200 shadow-2xl mb-2"
      );
      userDiv.innerHTML = `
 <ul class="userInforms flex justify-between w-[90%]">
          <li>${user.id}</li>
          <li>${user.name}</li>
          <li>${user.lastName}</li>
          <li>${user.addres}</li>
          <li>${user.birthday || ""}</li>
          <li>${user.profession}</li>
          <li>${user.degree}</li>
          <li>${user.salary}</li>
          <li>${user.isMerried}</li>
        </ul>
`;

      dataArea.appendChild(userDiv);
    });
  }
});
