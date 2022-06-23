import axios from 'axios'

export default function loveFunc() {

  return {
    love: [],
    loggedUser: {},
    signUp: {
      username: '',
      password: '',
    },
    signIn: {
      username: '',
      password: '',
    },

    regUser() {
      axios
        .post('http://localhost:4017/api/signUp', this.signUp)

        .then(results => {
          console.log(results.data);
          this.message
          // this.username = `${this.username} ${this.password}`
        }).catch(e => console.log(e.response.data))
    },



    logUser() {

      axios
        .post('http://localhost:4017/api/logIn', this.signIn)
        .then((qApp) => {
          var { token, user } = qApp.data;
          console.log(qApp.data);
          if (!token) {
            return false
          }

          // this.appState = appState.Home
          this.isOpen = true;
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          // this.parseJwt(token)
          this.token = JSON.stringify(token)
          localStorage.setItem('token', this.token);

          setTimeout(() => {
            this.token = ''
          }, 4000);
          return true;
        })

        .then(result => {
          if (!result) {
            this.isOpen = false;
            this.message = 'Incorrect user credentials'
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

