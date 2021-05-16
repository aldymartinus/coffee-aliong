<template>
  <div class="counter">
    <button :disabled="(quantity < 1) ? true : false" @click="minusCount">-</button>
    <input
      v-model="quantity"
      type="text"
      readonly
      inputmode="numeric"
      aria-valuemin="0"
    />
    <button @click="plusCount">+</button>
  </div>
</template>
<script>
export default {
  name: "Counter",
  data() {
    return {
      quantity: 0,
      isDisabled: true,
    };
  },
  methods: {
    plusCount() {
      this.quantity += 1;
      this.$emit("clicked", this.quantity);
    },
    minusCount() {
      if (this.quantity !== 0) {
        this.quantity -= 1;
        this.$emit("clicked", this.quantity);
      }
    },
  },
};
</script>

<style scoped>
.counter {
  display: flex;
  flex-direction: row;
}
.counter input {
  width: 2rem;
  text-align: center;
  border: none;
  font-size: large;
}
.counter button {
  font-weight: bold;
  height: 1.8rem;
}
</style>
