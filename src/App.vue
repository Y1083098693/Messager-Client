<template>
  <div id="app">
    <keep-alive :exclude="exclude">
      <router-view></router-view>
    </keep-alive>
    <pop-ups />
  </div>
</template>

<script>
import popUps from "./PopUps";
export default {
  name: "App",
  data() {
    return {
      include: ["Layout"],
      exclude: ["Login", "NotFound"]
    };
  },
  watch: {
    $route(to, from) {
      const exclude = this.exclude;
      if (to.name === "Login") {
        !exclude.includes("Layout") && exclude.push("Layout");
      } else {
        const index = exclude.indexOf("Layout");
        index !== -1 && exclude.splice(index, 1);
      }
    }
  },
  components: {
    popUps
  }
};
</script>
