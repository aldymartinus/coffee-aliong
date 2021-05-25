<template>
  <div class="parent">
    <div class="cal-input">
      <input type="date" />
      <button>Cari</button>
    </div>
    <div class="transaction-list">
        <div class="transaction-item" v-for="(transaction ,index) in transactionArr" :key="transaction._id">
            <div class="transaction-data">
                <span style="color: #111;" class="timestamp-date">{{transaction.date}}</span>
                <span style="color: #111;" class="timestamp-time">{{transaction.time}}</span>
                <span style="color: #111;" class="paid-nominal">Pembayaran: {{transaction.paid}}</span>
            </div>
        <div class="card">
        <div class="transaction-details" v-for="item in transactionDetails[index]" :key="item._id">
            <div style="display:flex; flex-direction:column;">
            <span class="details-name" style="color: #1d3994">{{item.itemName}}</span>
            <span class="details-price" style="color: #555;">@{{item.itemPrice}}</span>
            </div>
            <span class="details-quantity" style="color: #222;">{{item.quantity}}x</span>
        </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return{
            transactionArr : [],
            transactionDetails : [],
        }
    },
    async mounted(){
        const response = await axios.get("http://localhost:3000/api/transactionDetails")
        this.transactionArr = response.data;
        this.transactionDetails = this.transactionArr.map(x => x.details);
        console.log(this.transactionDetails);
    }
}
</script>

<style scoped>
.parent {
  margin: 0 auto;
  height: 95%;
  width: 50%;
}
.cal-input {
  margin-top: 1rem;
  display: flex;
}
.cal-input input {
  text-align: center;
  height: 1.8rem;
  flex-basis: 80%;
  margin-right: 0.5rem;
}
.cal-input button {
  flex-basis: 20%;
  font-size: 0.8rem;
  background-color: rgb(65, 101, 186);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 2px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1px;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-property: all;
  transition-property: all;
  -webkit-transition-timing-function: ease-in-out;
  transition-timing-function: ease-in-out;
}
.cal-input button:hover {
  background-color: #6c8cd8;
}
.transaction-list {
  height: 94%;
  margin-top: 0.5rem;
  border: 1px solid #8ea4ca;
  border-radius: 3px;
}
.transaction-item{
    margin: 0.3rem;
}
.transaction-data{
    margin-top: 1rem;
    display: flex;
    font-size: small;
}
.timestamp-date{
    margin-left: 0.5rem;
    flex-basis: 25%;
}
.timestamp-time{
    flex-basis: 30%;
}
.paid-nominal{
    flex-basis: 45%;
}
.transaction-details{
    margin-bottom: 0.7rem;
    padding-bottom: 0.2rem;
    border-bottom:1px solid #aaa ;
    display: flex;
    justify-content: space-between;
}
.card{
    margin: 0.2rem 0.2rem;
    padding: 0.5rem;
    border: 1px solid #8ea4ca;
    border-radius: 2px;
}
.details-quantity{
    margin: 0.5rem;
    font-weight: bold;
}
</style>