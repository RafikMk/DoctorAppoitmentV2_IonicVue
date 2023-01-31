<template>
    <ion-header>
      <ion-toolbar>
        <ion-title class="header">
          <strong>Title</strong>
          <ion-avatar slot="end">
            <img src="avatar.png" />
          </ion-avatar>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="sub-title">
        <strong>Subtitle</strong>
      </div>
      <div class="search">
  <ion-input placeholder="Search"></ion-input>
  <ion-button>
    <ion-icon name="search"></ion-icon>
  </ion-button>
</div>

<div class="list-doctors">
  <ion-item>
    <ion-thumbnail slot="start">
      <img src="doctor1.jpg" />
    </ion-thumbnail>
    <ion-label>
      <h2>Doctor 1</h2>
      <p>Speciality</p>
    </ion-label>
    <div class="status" slot="end"></div>
  </ion-item>

  <ion-item>
    <ion-thumbnail slot="start">
      <img src="doctor2.jpg" />
    </ion-thumbnail>
    <ion-label>
      <h2>Doctor 2</h2>
      <p>Speciality</p>
    </ion-label>
    <div class="status" slot="end"></div>
  </ion-item>
</div>

<div class="card-categories">
  <ion-icon name="medkit"></ion-icon>
  <h2>Health</h2>
</div>
</ion-content>
</template>
And here is the script for the component:

<script>
export default {
  name: "MyPage"
};
</script>
<style scoped>
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
margin-top: 40px;
display: flex;
}

.search ion-input {
background: var(--ion-color-light);
border-radius: 10px;
height: 45px;
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
}

.list-doctors .status {
  width: 20px;
  background-color: green;
}

.list-doctors ion-thumbnail {
  --border-radius: 10px;
}

.list-doctors ion-item {
  --background: var(--ion-color-light);
  --border-radius: 10px;
  margin-bottom: 8px;
}

.list-doctors ion-item:first-child {
  --background: #f7be3021;
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
  opacity: 0.8;
}
.card-categories ion-icon {
    font-size: 40px;
    margin-bottom: 8px;
  }


</style>