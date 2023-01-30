<template>
  <ion-page id="main-content"> 
  <ion-header class="back"></ion-header>
  <div lines="none" class="search">
    <ion-input placeholder="Search, e.g. Dr.Louis Pasterur">
      <ion-button color="tertiary">
        <ion-icon :icon="searchOutline" slot="icon-only"></ion-icon>
      </ion-button>
    </ion-input>
  </div>
<ion-content>
  <ion-list>
    <ion-item >
    <ion-label><b>Dr</b></ion-label>
    <ion-label><b>Time</b></ion-label>
    <ion-label><b>Date</b></ion-label>
    </ion-item>
    <ion-item v-for="appointment in appointments" :key="appointment.id"  @click="setOpen(true,appointment)">

    <ion-label>{{appointment.doctor_name}}</ion-label>
    <ion-label>{{appointment.time}}</ion-label>
    <ion-label>{{appointment.date}}</ion-label>
    <br>
    <p v-for="(item, index) in starsnb2" :key="index" style="display: inline-block;">
  <ion-icon :icon="starSharp" style="color: yellow;" @click='Review(0,index+1,appointment.doctor_id)' ></ion-icon>
  </p>
   <p v-for="(item, index) in starsnb" :key="index" style="display: inline-block;">
  <ion-icon :icon="star" @click='Review(index+1,0,appointment.doctor_id)' ></ion-icon>
  </p>
    </ion-item>
  
  
 
 
</ion-list>
<ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Modal</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="setOpen(false,null)">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
        <ion-label>Ailment: {{ presc.ailment }}</ion-label>
        <ion-label>Symptoms: {{ presc.symptoms }}</ion-label>
        <ion-label>Medicine: {{ presc.medicine }}</ion-label>
        <ion-label>Procedure: {{ presc.procedure }}</ion-label>
      </ion-item>
      </ion-content>
    </ion-modal>
</ion-content>
</ion-page>
</template>
<script lang="ts">
  import { IonButtons, IonButton, IonModal, IonToolbar, IonTitle,IonItem,IonList } from '@ionic/vue';

import axios from  "axios";
import {starOutline,starSharp } from 'ionicons/icons';  import {searchOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonLabel,IonIcon
  } from '@ionic/vue';
export default defineComponent({
    components: {IonItem,IonList,
      IonLabel,    
      IonContent,
      IonHeader,
      IonPage,
      IonButtons, IonButton, IonModal, IonToolbar, IonTitle 
    },
    data(){
        return{searchOutline:searchOutline,
          isOpen: false,
          presc : null as any,
          appointments: [] as any,
          starsnb :[] ,
          starsnb2 :[] ,
          //heartOutline:heartOutline,
          star:starOutline,
          starSharp:starSharp
      }
    },
   /* computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },*/
      methods:{
        setOpen(isOpen: boolean,appointment : any) {
        this.isOpen = isOpen;
        axios.get(`http://127.0.0.1:8000/api/prescription/2/${appointment.doctor_id}`).then(response => {
      this.presc = response.data
      this.presc.ailment =response.data.data[0].ailment
      this.presc.symptoms =response.data.data[0].symptoms
      this.presc.medicine =response.data.data[0].medicine
      this.presc.procedure =response.data.data[0].procedure
      console.log( this.presc.data[0])
    });
      },
    getbooking() {

    axios.get(`http://127.0.0.1:8000/api/mybookings/${this.$store.state.auth.user.id}`).then(response => {
      this.appointments = response.data
    });
  },


        Review (nb :any,nb2 :any,doctor_id)
{
 
  switch (nb) {
  case 1:

  this.starsnb2.length  =1 +this.starsnb2.length
  this.starsnb.length  =4 -this.starsnb2.length +1
    
    break;
  case 2:

  this.starsnb.length  =3-this.starsnb2.length
        this.starsnb2.length  =2 + this.starsnb2.length
  break;
  case 3:
  this.starsnb.length  =2 -this.starsnb2.length
        this.starsnb2.length  =3+ this.starsnb2.length
    break;
    case 4:
    this.starsnb.length  =1 -this.starsnb2.length
        this.starsnb2.length  =4+ this.starsnb2.length
    break;
    case 5:
    this.starsnb.length  =0
        this.starsnb2.length  =5
    break;
  default:
console.log("no review")
  }
  switch (nb2) {
    case 1:
  this.starsnb.length  =4
        this.starsnb2.length  =1
    break;
  case 2:
  this.starsnb.length  =3
        this.starsnb2.length  =2
  break;
  case 3:
  this.starsnb.length  =2
        this.starsnb2.length  =3
    break;
    case 4:
    this.starsnb.length  =1
        this.starsnb2.length  =4
    break;
    case 5:
    this.starsnb.length  =0
        this.starsnb2.length  =5
    break;
  default:
  console.log("no review")
  }
  alert(this.starsnb2.length);
  axios.get(`http://127.0.0.1:8000/api/review/${doctor_id}/${this.starsnb2.length}`).then(response => {
console.log(response)   
 });
}
      },
      mounted: function(){
        this.getbooking()
        this.starsnb.length  =5
        this.starsnb2.length  =0
        
        
    //  if (this.currentUser == null) {
 //     this.$router.push('/signin');
 //   }
   //  alert('hh)')
//this.OneSignalInit()
},

       

       
})



</script>

<style scoped>
.icon-container {
  width: 50px;
  height: 50px;
  position: relative;
}
.cirles{
  --background:white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}
img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.head{
  background-color: #2C2B47;
}

.status-circle-online {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #22ff00;
  border: 2px solid white;
  bottom: 0;
  right: 0;
  position: absolute;
}
.status-circle-offline {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgb(255, 0, 0);
  border: 2px solid white;
  bottom: 0;
  right: 0;
  position: absolute;
}

ion-header ion-toolbar {
  overflow: hidden;
}

ion-chip {
  --background: #dfdfdf;
  float: right;
  color: rgb(27, 22, 22);
}
.head2{
  --background:#2C2B47;
  height: 40px;
}

#page {
  --background: #fff
}

#menu {
  --background: url(../../public/assets/imgs/6.png) 0 0/100% 100% no-repeat;
}


.back {
  --background: #fff;
}

.custom {
  --background: #dfdfdf;
  --color: rgb(27, 22, 22);
  --placeholder-color: rgb(66, 66, 66);
  --placeholder-opacity: .8;
  border-radius: 20px;
  --padding-bottom: 10px;
  --padding-end: 10px;
  --padding-start: 10px;
  --padding-top: 10px;
  width: 90%;
  margin: auto;


}

.header strong {
  font-size: 28px;
  line-height: 36px;
}

.header ion-avatar {
  --border-radius: 10px;
  width: 50px;
  height: 50px;
}

.sub-title {
  padding: 16px;
}

.sub-title strong {
  font-size: 18px;
  line-height: 36px;
}

.search {
  top: 40px;
  display: flex;
  background:white ;
}

.search ion-input {
  background: rgb(234, 232, 232);
  border-radius: 10px;
  width:50px;
  --padding-start: 16px;
  font-size: 12px;

}

.search ion-button {
  height: 45px;
  width: 50px;
  --border-radius: 30px 10px 10px 10px;
  order: 1;
}

.list-doctors {
  padding: 16px;
 
  --border-radius: 10px;
}

.list-doctors .status {
  width: 20px;
  background: green;
}

.list-doctors ion-thumbnail {
  --border-radius: 10px;
}

.list-doctors ion-item {
  background-color:#f7be3021;
  border-radius: 10px;
  margin-bottom: 8px;

}

.list-doctors ion-item:first-child {
  --background: #f7be30 21;
  opacity: none;
  opacity: 1;
}

.card-categories {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  background: var(--ion-color-light);
  border-radius: 10px;
  color: white;
  width: 110px;
  margin-left:10px;
  opacity: 0.8;
}

.card-categories ion-icon {
  font-size: 40px;
  margin-bottom: 8px;
}
  /* Material Design styles */

  
   </style>
   