import Vue from 'vue'
import Router from 'vue-router'
import HELLOWORLD from '@/components/HelloWorld'
import LOGIN from '@/components/login'
import MENU from '@/components/menu'
import MY_APP from '@/components/my_app'
import CUSTOMER_APP_LIST from '@/components/customer_app_list'
import ADD_CUSTOMER_APP from '@/components/add_customer_app'
import ADD_CONFIG from '@/components/add_config'
import TYPE_LIST from '@/components/type_list'
import CUSTOMER_ADD_IMAGES from '@/components/customer_add_images'
import TYPE_APP_LIST from '@/components/type_app_list'
import BANER_LIST from '@/components/baner_list'
import TEST from '@/components/test'
import ADD_TYPE from '@/components/add_type'
import CUSTOMER_ADD_BANNER_IMAGES from '@/components/customer_add_banner_images'
import ADVERTISING_STATISTICS from '@/components/advertising_statistics'
import DAILY_VISIT_TREND_LIST from '@/components/daily_visit_trend_list'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu'
    },
	{
		path: '/helloWorld',
		name: 'HelloWorld',
		component: HELLOWORLD
	},
	{
		path: '/menu',
		name: 'menu',
		component: MENU
	},
	{
		path: '/my_app',
		name: 'myApp',
		component: MY_APP
	},
	{
		path: '/customer_app_list',
		name: 'customerAppList',
		component: CUSTOMER_APP_LIST
	},
	{
		path: '/add_customer_app',
		name: 'addCustomerApp',
		component: ADD_CUSTOMER_APP
	},
	{
		path: '/add_config',
		name: 'addConfig',
		component: ADD_CONFIG
	},
	{
		path: '/type_list',
		name: 'typeList',
		component: TYPE_LIST
	},
	{
		path: '/customer_add_images',
		name: 'customerAddImages',
		component: CUSTOMER_ADD_IMAGES
	},
	{
		path: '/type_app_list',
		name: 'typeAppList',
		component: TYPE_APP_LIST
	},
	{
		path: '/baner_list',
		name: 'banerList',
		component: BANER_LIST
	},
	{
		path: '/test',
		name: 'test',
		component: TEST
	},
	{
		path: '/add_type',
		name: 'addType',
		component: ADD_TYPE
	},
	{
		path: '/customer_add_banner_images',
		name: 'customerAddBannerImages',
		component: CUSTOMER_ADD_BANNER_IMAGES
	},
	{
		path: '/advertising_statistics',
		name: 'advertisingStatistics',
		component: ADVERTISING_STATISTICS
	},
	{
		path: '/daily_visit_trend_list',
		name: 'dailyVisitTrendList',
		component: DAILY_VISIT_TREND_LIST
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
  ]
})
