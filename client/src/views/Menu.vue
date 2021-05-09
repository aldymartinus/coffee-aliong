<template>
  <div class="input">
    <div class="search-bar">
      <input
        v-model="searchItem"
        class="search-col"
        type="text"
        placeholder="Pencarian"
      />
    </div>
    <div class="add-item">
      <input
        type="text"
        ref="itemName"
        v-model="itemName"
        class="name"
        placeholder="Nama Item"
      />
      <input
        type="text"
        v-model="itemPrice"
        class="price"
        placeholder="Harga Item"
      />
      <div class="item-button">
        <button @click="addItem" class="button input-button">Tambahkan</button>
      </div>
    </div>
    <div class="card">
       <span v-if="items.length === 0" style="color:#aa9; display:flex; justify-content:center; margin-top:12rem;">Data Menu Kosong</span>
      <div v-for="(item, i) in items" :key="item._id" class="item-list">
        <div
          v-if="
            item.itemName.indexOf(searchItem) != -1 ||
            item.itemName.toLowerCase().indexOf(searchItem) != -1
          "
        >
          <li>
            <div class="action-button">
              <span
                @click="isSelected(item) ? unselect() : select(item)"
                style="margin-right: 0.7rem"
                >{{ isSelected(item) ? "batal" : "edit" }}</span
              >
              <span
                @click="
                  isSelected(item) ? updateItem(item, i) : removeItem(item, i)
                "
                class="delete-item"
                >{{ isSelected(item) ? "simpan" : "hapus" }}</span
              >
            </div>
            <input
              style="
                margin-bottom: 0.2rem;
                border: 1px #bbb solid;
                border-radius: 2px;
              "
              v-model="newItemName"
              v-if="isSelected(item)"
            />
            <span v-else class="item-name" style="color: #1d3994">{{
              item.itemName
            }}</span>
            <br />
            <input
              style="
                margin-bottom: 0.2rem;
                border: 1px #bbb solid;
                border-radius: 2px;
              "
              v-model="newItemPrice"
              v-if="isSelected(item)"
            />
            <span v-else style="color: #666">{{ item.itemPrice }}</span>
            <br />
          </li>
          <hr style="border: 1px #ddd solid; margin-top: -0.2rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      itemName: "",
      newItemName: "",
      itemPrice: null,
      newItemPrice: null,
      selected: {},
      items: [],
      searchItem: "",
    };
  },
  async mounted() {
    const response = await axios.get(
      "http://localhost:3000/api/menuDetailsItem"
    );
    this.items = response.data;
  },
  methods: {
    async addItem() {
      await axios
        .post("http://localhost:3000/api/menuDetailsItem", {
          name: this.itemName,
          price: this.itemPrice,
        })
        .then((Response) => {
          this.message = Response.data;
          this.items.push(Response.data);
        });
      this.itemName = "";
      this.itemPrice = null;
      this.$refs.itemName.focus();
    },
    async removeItem(item, i) {
      await axios.delete("api/menuDetailsItem/" + item._id);
      this.items.splice(i, 1);
    },
    async updateItem(item, i) {
      const response = await axios.put("api/menuDetailsItem/" + item._id, {
        itemName: this.newItemName,
        itemPrice: this.newItemPrice,
      });
      this.items[i] = response.data;
      this.unselect();
    },
    select(item) {
      this.selected = item;
      this.newItemName = item.itemName;
      this.newItemPrice = item.itemPrice;
    },
    unselect() {
      this.selected = {};
      this.newItemName = "";
      this.newItemPrice = null;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
  },
};
</script>

<style scoped>
.txtUpdate {
  border: 0;
  border-bottom: 1px solid #bbb;
}
.item-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.delete-item:hover {
  color: #a12f31;
}
.button {
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
.button:hover {
  background-color: #6c8cd8;
}
.input {
  margin: 0 auto;
  /* border: 1px black solid; */
  height: 94%;
  width: 25vw;
}
.action-button {
  margin-top: 1rem;
  color: #1d3994;
  font-size: small;
  position: absolute;
  right: 0.5rem;
}
.action-button span:hover {
  cursor: pointer;
  text-decoration: underline;
}
.item-list {
  padding: 0.3rem;
  margin-bottom: -0.6rem;
}
.item-name:hover {
  text-decoration: underline;
}
.card {
  border-radius: 2px;
  position: relative;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: #ddd white;
  margin: 0 auto;
  margin-top: 0.6rem;
  padding-top: 0.2rem;
  border: 1px solid #9eb4db;
  height: 79%;
  width: 25vw;
}
.card li {
  list-style: none;
  font-size: 15px;
  text-align: left;
  padding-bottom: 0.5rem;
  padding-left: 0.2rem;
}
.input-button {
  padding: 8px 0;
  width: 100%;
}
.search-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 0.7rem;
}
.search-col {
  padding-left: 0.3rem;
  width: 100%;
  height: 1.5rem;
}
.add-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name {
  margin-bottom: 0.2rem;
  padding-left: 0.3rem;
  height: 1.5rem;
}
.price {
  margin-bottom: 0.3rem;
  padding-left: 0.3rem;
  height: 1.5rem;
}
</style>