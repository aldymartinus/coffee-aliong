<template>
  <div class="parent">
    <div class="cal-input">
      <input type="date" v-model="dateInput" />
      <button @click="dateInput = null">Reset</button>
    </div>
    <div class="transaction-list">
        <div class="transaction-item" v-for="(transaction ,index) in transactionArr" :key="transaction._id">
          <div v-if="transaction.date == dateInput || dateInput == null"> 
            <div class="transaction-data">
                <span class="timestamp-date">{{transaction.date}}</span>
                <span class="timestamp-time">{{transaction.time}}</span>
                <span class="paid-nominal">Pembayaran: {{new Intl.NumberFormat('id-ID',{style:"currency", currency:"IDR"}).format(transaction.paid)}}</span>
            </div>
        <div class="card">
          <div class="transaction-details" v-for="item in transactionDetails[index]" :key="item._id">
              <div style="display:flex; flex-direction:column;">
                <span class="details-name" style="color: #1d3994">{{item.itemName}}</span>
                <span class="details-price" style="color: #555;">@{{item.itemPrice}}</span>
                <span class="details-subtotal">Sub total: {{new Intl.NumberFormat('id-ID',{style:"currency", currency:"IDR"}).format(item.itemPrice*item.quantity)}}</span>
              </div>
            <span class="details-quantity" style="color: #222;">{{item.quantity}}x</span>
          </div>
          <div class="details-payment">
            <span>Grand total: {{new Intl.NumberFormat('id-ID',{style:"currency", currency:"IDR"}).format(totalArr[index])}}</span>
            <span>Kembalian: {{new Intl.NumberFormat('id-ID',{style:"currency", currency:"IDR"}).format(transactionArr[index].paid-totalArr[index])}}</span>
          </div>
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
            totalArr: [],
            subTotalArr: [],
            dateInput: null,
        }
    },
    async mounted(){
        const response = await axios.get("http://localhost:3000/api/transactionDetails")
        this.transactionArr = response.data;
        this.transactionDetails = this.transactionArr.map(x => x.details);
        this.transactionDetails.forEach(element => {
          this.subTotalArr.push(element.map(x => x.itemPrice*x.quantity));
        });
        this.subTotalArr.forEach(element =>{
          this.totalArr.push(this.sumSubtotal(element));
        });
        console.log(this.totalArr);
    },
    methods:{
    sumSubtotal(arr){
      var total = 0;
      for(var count = 0;count<arr.length;count++){
      total = total + arr[count];
    }
      return total;
    },
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
  scrollbar-width: thin;
  overflow: auto;
  height: 94%;
  margin-top: 0.5rem;
  border: 1px solid #8ea4ca;
  border-radius: 3px;
}
.transaction-item{
    margin: 0.3rem;
}
.transaction-data{
    font-weight: bold;
    margin: 0 0.2rem;
    margin-top: 1rem;
    padding: 0.3rem 0;
    display: flex;
    font-size: small;
    border-radius: 2px;
    color: #1d3994;
    background-color: #f1f5ff;
    border: 1px solid #beccea;
}
.timestamp-date{
    margin-left: 0.5rem;
    flex-basis: 25%;
}
.timestamp-time{
    margin: 0 0.5rem;
    flex-basis: 25%;
}
.paid-nominal{
    flex-basis: 50%;
}
.transaction-details{
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border:1px solid #ccc ;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
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
.details-subtotal{
  padding-top: 0.1rem;
  color: #333;
  margin: 0.3rem 0;
  border-top: 1px solid #888;
}
.details-payment{
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 2px 6px 2px rgba(60,64,67,0.149);
  padding: 0.5rem;
  color: #1d3994;
  background-color: #f1f5ff;
  border: 2px solid #beccea;
  display: flex;
  flex-direction: column;
}
@media screen and (max-width:1000px) {
  .parent {
  width: 100%;
}
}
</style>