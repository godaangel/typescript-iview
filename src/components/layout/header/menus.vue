<style lang="less" scoped>
	.layout-nav{
		float: right;
	}
</style>
<template>
	<div class="wau-header-menus">
		<Menu mode="horizontal" theme="dark" :active-name="activemenu" @on-select="clickMenu">
      <slot></slot>
      <div class="layout-nav">
        <MenuItem :name="menu.id" :key="menu.id" v-for="menu in menulist">
          <Icon v-if="menu.icon" :type="menu.icon"></Icon>
          {{menu.content}}
        </MenuItem>
      </div>
    </Menu>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import Component from 'vue-class-component'

	@Component({
		props: {
			menulist: {
				type: Array,
				default: function() {
					return [];
				}
			},
			activemenu: {
				type: [String, Number],
				default: ''
			}
		}
	})
	export default class WauHeaderMenus extends Vue {

		data(){
			return {};
		}

		clickMenu(res) {
			console.log(res)
			this.$loactionHref('/index')
		}
	}
</script>