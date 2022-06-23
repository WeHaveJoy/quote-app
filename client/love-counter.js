// import AlpineInstance from "alpinejs";

export default function LoveCounter() {
    return {
      loveCounter :Alpine.$persist(0),
      init() {
        setInterval( () => {
          if (this.loveCounter > 0) {
            this.loveCounter--;
          }
         console.log(this.loveCounter)
        }, 3000)
      },
      love() {
       this.loveCounter++
      },
      hearts() {
         
         if (this.loveCounter <= 0) {
          return "💔"
         }
      
         if (this.loveCounter > 0 && this.loveCounter <= 5) {
           return "💚"
         } else if (this.loveCounter <= 10) {
           return "💚💚";
         } else {
           return "💚💚💚";
         }
      },
  // love: [],
  //   // loveData: {
  //     username: "",
  //     password: "",
  //     // count: "",
  //   // },

  //   addUser() {
  //    axios
  //    .post(`http://localhost:4017/api/love_user/`, {
  //       // method: "POST",
  //       // headers: { "Content-Type": "application/json" },

  //       // body: JSON.stringify(this.loveData),
  //       username: this.username,
  //       password: this.password,
  //     })

  //     .then(results => {
  //       console.log(results.data);
  //     })
  //   },

     }
}