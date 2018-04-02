<style lang="less" scoped>
	.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
	}
</style>
<template>
	<Header>
    <wau-header-menus :menulist="menulist" :activemenu="activemenu">
    	<div class="layout-logo"></div>
    </wau-header-menus>
  </Header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Template from '@/mixins/template'
import WauHeaderMenus from './menus.vue'

@Component({
	props: {
		header: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	components: {
		WauHeaderMenus
	}
})
export default class WauHeader extends Vue{

	data(){
		let header = (<any>this).header
		let data = window.wau['data']
		header = Template.render(header, data)
		// console.log(header)
		return {
			menulist:  header['menus'] || [],
			activemenu: header['active']
		}
	}

}
</script>