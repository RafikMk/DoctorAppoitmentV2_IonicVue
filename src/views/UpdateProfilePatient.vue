<template>
    <ion-page id="main-content"> 
    <ion-header class="back">
</ion-header>
<ion-content>
  <div>
    <div>
    <form @submit.prevent="uploadImage">
      <input type="file" ref="imageInput" name="image" style="display: none;" />
      <button type="button" @click="openFileDialog">Update Avatar</button>
      <button type="submit">Save</button>
    </form>
  </div>
  </div>
    <ion-item lines="full">
      <ion-label position="floating">Name</ion-label>
      <ion-input v-model="doctor.name" type="text" required></ion-input>
    </ion-item>
    <ion-item lines="full">
      <ion-label position="floating">Email</ion-label>
      <ion-input v-model="doctor.email" type="email" required></ion-input>
    </ion-item>
    <ion-item lines="full">
          <ion-label position="floating">Address</ion-label>
          <GMapAutocomplete
    class="form-control custom-address-input"
            v-model="doctor.address"
            @place_changed="setPlace"
            :options="autocompleteOptions"
            
          ></GMapAutocomplete>
        </ion-item>
    <ion-item lines="full">
      <ion-label position="floating">Mobile</ion-label>
      <ion-input type="text" v-model="doctor.phone_number"  required></ion-input>
    </ion-item>
    <ion-radio-group v-model="gender" lines="full">
      <ion-list-header>
        <ion-label>Gender</ion-label>
      </ion-list-header>
      <ion-item>
        <ion-label>Male</ion-label>
        <ion-radio slot="start" value="male" :checked='doctor.gender === "male"' ></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>Female</ion-label>
        <ion-radio slot="start"  :checked='doctor.gender === "female"'  value="female"></ion-radio>
      </ion-item>
    </ion-radio-group>

    <ion-list>

      <ion-item>
  <ion-label>Specialite</ion-label>
  <ion-select v-model="selectedSpecialite"   :value="selectedSpecialite"  :options="specialites" >
    <ion-select-option v-for="(specialite, index) in specialites" :key="index" :value="specialite.specialite">{{ specialite.specialite }}</ion-select-option>
  </ion-select>
</ion-item>
<ion-item lines="full">
      <ion-label position="floating">Highest education</ion-label>
      <ion-input v-model="doctor.education" type="text" required></ion-input>
    </ion-item>

  </ion-list>
    <ion-row>
      <ion-col>
        <ion-button type="submit" color="danger" expand="block" @click.prevent="submitForm">Submit</ion-button>
      </ion-col>
   
    </ion-row>
</ion-content>
</ion-page>
</template>
<script lang="ts">
//import axios from  "axios";
 import { defineComponent } from 'vue';
import api from "../services/api";
import {IonButton,IonInput,IonItem,IonRadioGroup ,IonRadio,IonListHeader ,IonCol,
    IonContent,
    IonHeader,
    IonPage,
    IonLabel,
    IonSelect,IonSelectOption,IonList,IonRow
  } from '@ionic/vue';
export default defineComponent({
    components: {
      IonButton,IonInput,IonItem,IonRadioGroup ,IonRadio,IonListHeader,IonList,IonRow,IonCol,
      IonLabel,    
      IonContent,
      IonHeader,
      IonPage,
      IonSelect,IonSelectOption

    },
    data(){
        return{
          autocompleteOptions: {
        types: ['address']
      },
          specialites :[] as any ,
          selectedSpecialite :'',
          gender :'',
      doctor :{} as any
      }
    },
   /* computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },*/
      methods:{
        openFileDialog() {
      this.$refs.imageInput.click();
    },
    async uploadImage(event) {
      let file = this.$refs.imageInput.files[0];
      console.log(event);

      let formData = new FormData();

      formData.append('image', file);
      formData.append('user_id', this.doctor.id); // this.userId should be replaced by the actual user id

      try {
        const response = await api.put('/update/avatar', formData,{ headers:
        {'Content-Type': 'multipart/form-data'}});
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    },
        submitForm() {
         this.doctor.specialite= this.selectedSpecialite
      api.put('/update/patient/'+this.doctor.id, this.doctor)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
      },
        setPlace(place) {
          
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      this.doctor.address = place.formatted_address;
        this.doctor.latitude = place.geometry.location.lat();
        this.doctor.longitude = place.geometry.location.lng();
        },
        getDoctorsById(){
        const id =this.$store.state.auth.user.id ;
      api.get('/get/patient/'+id).then((response)=>{
         this.doctor=response.data
         this.selectedSpecialite = this.doctor.specialite
       //  this.doctor.gender="male"
         console.log( this.doctor.name)
        })
    },
    getspecialite(){
      api.get('/specialite/').then((response)=>{
         this.specialites=response.data
 
        })
    },
},
mounted: function(){

this.getspecialite()
  this.getDoctorsById()
},
       

       
})



</script>
<style>
.custom-address-input{
border-top-width: 0px !important;
border-right-width: 0px !important;
border-bottom-width: 0px !important;
border-left-width: 0px !important;
}
</style>