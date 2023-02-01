<template>
  <ion-menu content-id="main-content">
    <ion-content > 
        <ion-list>
      <ion-list-header>
        Navigate
      </ion-list-header>
      <ion-menu-toggle v-for="p in appPages" :key="p.title">
        <ion-item button @click="navigate(p.url,p.title)">
          <ion-icon slot="start" :icon="p.icon"></ion-icon>
          <ion-label>
            {{p.title}}
          </ion-label>        
        </ion-item>

      </ion-menu-toggle>
      <ion-menu-toggle >
        <ion-item button @click="logOut()">
          <ion-icon slot="start" :icon="exitOutline"></ion-icon>
          <ion-label>
Deconexion          </ion-label>    
        </ion-item>
      </ion-menu-toggle>
    </ion-list> </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-header>
        
         </ion-header>
         <div v-if="['/', '/signin', '/signup','/home','/home2'].includes($route.path)">

         <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="home"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
    </div>
         <div v-if="!['/', '/signin', '/signup','/home','/home2'].includes($route.path)">

      <div class="head">
  <ion-menu-toggle>
            <ion-button fill="clear">
  <ion-img :src="require('../../public/assets/imgs/burger.png')"></ion-img>
</ion-button>

        </ion-menu-toggle>

        <ion-chip>
  <ion-avatar>
    <ion-img :src="'http://204.48.29.155:7080/profile/'+this.$store.state.auth.user.image"></ion-img>

  </ion-avatar>
  <ion-label>{{this.$store.state.auth.user.username
}}</ion-label>
</ion-chip>
  <ion-item class="head2" lines="none">
    <strong style="color:white; text-align: center; margin: auto;">Doctor Appointment</strong>
  </ion-item>
  <ion-item class="cirles" lines="none">
    
  </ion-item>

</div>
</div>

    </ion-header>

    <ion-content class="ion-padding">
      
      <ion-router-outlet />

      </ion-content>
  </ion-page>
</template>

<script lang="ts">
    import {   exitOutline,contractOutline } from 'ionicons/icons';
    import {  IonRouterOutlet  } from '@ionic/vue';

  import {IonBackButton,IonListHeader,IonButtons,IonImg,IonButton,IonChip,IonAvatar,
    IonList,
    IonContent,
    IonHeader,
    IonMenu,
    IonPage,
     IonToolbar,
    IonMenuToggle,
    IonLabel,IonItem,IonIcon
  } from '@ionic/vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: {IonBackButton,IonListHeader,IonButtons,IonImg,IonToolbar,IonButton,IonChip,IonAvatar,
      IonRouterOutlet,
      IonIcon,
      IonList,
      IonMenuToggle,
      IonLabel,IonItem,    
      IonContent,
      IonHeader,
      IonMenu,
      IonPage,
    },
    data(){
  return {
    exitOutline: exitOutline ,
    title :'Page 1' as any ,
    nameuser :'',
    appPages : [
 
      {
        title: 'Mes Rendez Vous',
        url: '/rendezvous',
        icon: contractOutline
      },
      {
        title: 'Liste des docteurs',
        url: '/list',
        icon: contractOutline
      },
      {
        title: 'Update profil',
        url: '/UpdateProfilePatient',
        icon: contractOutline
      },
    
    ],
  };
},
methods: {

  logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/signin');
    },
  navigate(url: string,titre :string){
      // this.$router.directionOverride = 0;
      this.$router.push(url)
this.title =titre 
    }
    },
    mounted: function(){
      try {
        this.nameuser =this.$store.state.auth.user.name ;
      } catch (error) {
        console.error(error)
      }
        this.title = this.$route.name;

   //  alert('hh)')
//this.OneSignalInit()
},
  });
</script>
<style scoped>
  ion-menu::part(backdrop) {
    background-color: rgba(255, 0, 255, 0.5);
  }
  ion-menu::part(container) {
    border-radius: 0 20px 20px 0;

    box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
  }

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
   