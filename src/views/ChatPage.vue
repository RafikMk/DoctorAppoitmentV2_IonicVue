<template>
  <ion-page id="main-content"> 
    <ion-header class="back"></ion-header>
    <ion-content>
      <div>
        <ul>
          <li v-for="message in messages" :key="message.id">{{ message.user.name }}: {{ message.message }}   {{message.id}} aa</li>   
        </ul>
        <form @submit.prevent="sendMessage"> 
          <input v-model="message" type="text">  
          <button type="submit">Send</button>
        </form>
      </div>
    </ion-content> 
  </ion-page> 
</template> 
<script>

import { IonPage,IonHeader,IonContent} from '@ionic/vue';
import {pusher} from './pusher'
import axios from  "axios";

export default {
  components: {IonPage,IonHeader,IonContent},
  data() {
    return { 
      messages: [], 
      message: '',
   
    }
  },
  computed: { },
  methods: {
    sendMessage() {
      axios.post('http://localhost:8000/api/send-message', { message: this.message })
        .then(response => {
          this.message = ''
        })   
        .catch(error => {
          console.log(error)      
        }) 
    } 
  },
  mounted: function(){
    alert('data');
    const channel = pusher.subscribe('doctor_1');
console.log(channel) ;
channel.bind('patient_2', (data) => {
  console.log("channel name is: ", channel.name);
 this.messages.push(data)

  console.log(JSON.stringify(data));
  });
  },
  created() {
    axios.get('http://localhost:8000/api/messages')
      .then(response => {
        this.messages = response.data
      console.log(this.messages)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
