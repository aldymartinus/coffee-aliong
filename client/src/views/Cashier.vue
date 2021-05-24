<template>
  <div class="grid-container">
    <div class="item-area">
      <div class="search-col">
        <input v-model="searchItem" type="text" placeholder="Pencarian" />
      </div>
      <div class="item-list border">
        <span v-if="items.length === 0" style="color:#aa9; display:flex; justify-content:center; margin-top:12rem;">Data Menu Kosong</span>
        <div v-for="(item) in items" :key="item._id" class="item-list">
          <div
            v-if="
              item.itemName.indexOf(searchItem) != -1 ||
              item.itemName.toLowerCase().indexOf(searchItem) != -1
            "
          >
            <li>
              <div class="action-button ">
                <Counter @clicked="quantityHandler" @click="cartItem(item)"/>
              </div>
              <span class="item-name" style="color: #1d3994">{{
                item.itemName
              }}</span>
              <br />
              <span style="color: #666;">{{ item.itemPrice }}</span>
              <br />
            </li>
            <hr style="border: 1px #ddd solid;" />
          </div>
        </div>
      </div>
    </div>
    <div class="cart-area">
      <div class="cart-item border">
        <div v-for="(item) in cart" :key="item._id" class="item-list">
            <span style="color: #1d3994">{{item.itemName}}</span><br>
            <span style="color: #666;">{{item.itemPrice}}</span>
            <span style="position:relative; float:right; margin-right:1.5rem; font-weight:bold; font-family:Helvetica;">{{item.quantity}} x</span>
            <hr style="border: 1px #ddd solid;">
        </div>
      </div>
      <div style="position:relative;" class="grand-total border">
        <span style="position:absolute; left:1rem; font-size:1rem; margin-top:0.2rem;  color:#888; font-family:Arial;">Total:</span>
        <span style="margin-left: 2rem; font-weight:bold; font-family:monospace;">{{new Intl.NumberFormat('id-ID',{style:"currency", currency:"IDR"}).format(total)}}-,</span>
      </div>
    </div>
    <div class="checkout-area">
      <div class="paid-nominal">
        <input :disabled="total < 1 ? true : false" @keyup="countChange" v-model="paidNominal" placeholder="Nominal Pembayaran">
      </div>
      <div class="change-nominal border">
        <div style="position:relative; display:flex; flex-direction:row; justify-content:space-evenly;">
          <span style="font-size:1rem;  margin-top:1.3rem; color:#888; font-family:Arial; position:absolute; left:1rem;">Kembalian:</span>
          <span style="margin-left: 2.5rem; font-weight:bold;">{{change}}-,</span>
        </div>
      </div>
      <div class="submit-button">
        <button :disabled="(paidNominal >= total &&  paidNominal != null) ? false : true" @click="saveTransaction()">Bayar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Counter from '@/components/Counter.vue'
export default {
    components: {
      Counter
  },
  data() {
    return {
      itemName: "",
      itemPrice: null,
      items: [],
      cart:[],
      totalArr:[],
      searchItem:"",
      selected:{},
      change:0,
      paidNominal:null,
      total:0,
      quantity:0,
      isTotalEmpty:true
    };
  },  
  async mounted() {
    const response = await axios.get(
      "http://localhost:3000/api/menuDetailsItem"
    );
    this.items = response.data;
  },
  methods:{
    countChange(){
      this.total < 1 ? this.paidNominal = null : null;
      this.change = new Intl.NumberFormat('id-ID',{style:"currency", currency:"IDR"}).format(this.paidNominal-this.total);
    },
    cartItem(item){
        const cartObj = {};
        let cartItems = Object.create(cartObj);
        cartItems._id = item._id;
        cartItems.itemName = item.itemName;
        cartItems.itemPrice = item.itemPrice;
        cartItems.quantity = this.quantity;

        if(this.cart.findIndex(x=> x.itemName === item.itemName) > -1){
        let index = this.cart.findIndex(x=> x.itemName === item.itemName);
        this.cart.splice(index,1);
        this.cart.push(cartItems);
        }else{
        this.cart.push(cartItems);
        }

        this.cart.forEach(element => {
          if (element.quantity === 0) {
            let index = this.cart.findIndex(x=> x.itemName === item.itemName);
            this.cart.splice(index,1);
          }
        });
      
        let totalObj = {};
        let totalPrices = Object.create(totalObj);
        totalPrices.itemName = item.itemName;
        totalPrices.subTotal = item.itemPrice*this.quantity;
        
        if (this.totalArr.findIndex(x=> x.itemName === item.itemName) > -1) {
          let index = this.totalArr.findIndex(x=> x.itemName === item.itemName);
          this.totalArr.splice(index,1);
          this.totalArr.push(totalPrices);
        }else{
          this.totalArr.push(totalPrices);
        }

        let subTotalArr = this.totalArr.map(item => item.subTotal);
        this.total = this.sumSubtotal(subTotalArr);
        this.countChange();
    },
    quantityHandler(e){
      this.quantity = e
    },
    sumSubtotal(arr){
      var total = 0;
      for(var count = 0;count<arr.length;count++){
      total = total + arr[count];
    }
      return total;
    },
     async saveTransaction(){
       const date = new Date();
        await axios
        .post("http://localhost:3000/api/transactionDetails", {
          date: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
          time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`,
          details : this.cart,
          paid: new Intl.NumberFormat('id-ID',{style:"currency", currency:"IDR"}).format(this.paidNominal),
        }).then(()=>{
          alert("Transaction Done!");
            location.reload(true);
        });
    }
  }
};
</script>

<style scoped>
.cart-item{
  padding: 0.5rem 0rem 0rem 0.5rem;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #ddd white;
}
.border {
  border: 1px solid #8ea4ca;
  border-radius: 3px;
}
.grid-container {
  height: 92vh;
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  grid-template-rows: 80% 20%;
  gap: 2px 3px;
  grid-template-areas:
    ". item-area cart-area ."
    ". checkout-area checkout-area .";
}
.item-area {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 10% 90%;
  gap: 2px 0px;
  grid-template-areas:
    "search-col"
    "item-list";
  grid-area: item-area;
}

.search-col {
  grid-area: search-col;
}

.search-col input {
  height: 82%;
  width: 98%;
  text-align: center;
}

.item-list {
  position: relative;
  grid-area: item-list;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #ddd white;
}

.item-list li {
  list-style: none;
  font-size: 15px;
  text-align: left;
  padding: 0.3rem;
}

.item-name:hover {
  text-decoration: underline;
}

.cart-area {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 87% 13%;
  gap: 2px 0px;
  grid-template-areas:
    "cart-item"
    "grand-total";
  grid-area: cart-area;
}

.cart-item {
  grid-area: cart-item;
}

.grand-total {
  grid-area: grand-total;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top:1.3rem ;
  font-size: 1.3rem;
  color: #222;
}

.checkout-area {
  margin-top: 0.3rem;
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 50% 50%;
  gap: 2px 2px;
  grid-template-areas:
    "paid-nominal paid-nominal"
    "change-nominal submit-button";
  grid-area: checkout-area;
}

.paid-nominal {
  grid-area: paid-nominal;
}

.paid-nominal input {
  width: 99%;
  height: 89%;
  text-align: center;
  font-size: larger;
  color:#222;
}

.change-nominal {
  grid-area: change-nominal;
}

.change-nominal span{
  display: flex;
  font-family: monospace;
  justify-content: center;
  margin-top: 1.1rem;
  font-size: 1.3rem;
  color: #222;
}

.submit-button {
  grid-area: submit-button;
}
.submit-button button {
  font-size: 1rem;
  width: 100%;
  height: 100%;
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
.submit-button button:hover {
  background-color: #6c8cd8;
}
.action-button{
  margin-top: 0.6rem;
  position:absolute;
  right: 1rem;
  display: flex;
  flex-direction: row;
}
</style>