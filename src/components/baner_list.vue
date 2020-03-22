<style>

.title{
	padding-left: 30px;
	padding-right: 10px;
}

</style>
<template>
	<div id="app" style="padding: 3px;">
		<div style="padding-bottom: 20px;">
			<Row>
				<div style="float:left;padding-top:50px;">
				<i-button type="primary" icon="ios-cloud-upload-outline" @click="save_index_item()">保存排序</i-button>
				</div>
			</Row>
		</div>
		<i-table width="1200" height="700"border ref="currentRowTable" :columns="columns7" :data="dataList" :draggable="true" @on-drag-drop="onDragDrop"></i-table>
	</div>

</template>

<script>
    export default {
		name: 'app',
		iniect:['reload'],
        data () {
            return {
                columns7: [
					{
						title: 'ID',
					    key: 'bannerId',
						width: '100',
						align: 'center'
					},
					{
						title: '',
					    key: 'customerAppId',
						width: 1,
						ellipsis:true,
						tooltip:true,
						align: 'center'
					},
                    {
						title: '广告名称',
                        key: 'jumpName',
						width: 250,
						align: 'center'
                    },
					{
					    title: '广告轮播图',
					    key: 'bannerUrl',
						align: 'center',
						width: 350,
						render: (h, params) => {
							if(params.row.bannerUrl == ""){
								return h('span', '无logo');
							}else{
								return h('img',{
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										width: '300px', // 改变icon的样式
										height:'120px'
									},
									attrs:{
										src :params.row.bannerUrl
									}
								})
							}
							
							
						}
					},
					{
					    title: '',
						width: 1,
						ellipsis:true,
						tooltip:true,
					    key: 'indexItem',
						align: 'center',
					},
					{
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
						  return h('div', [
							h('Button', {
								  props: {
									icon: 'ios-trash' ,// iview自带的删除icon
									type: 'error' ,// iview自带的删除icon
								  },
								  style: {
									marginLeft: '10px', // 改变icon的样式
								  },
								  on: {
									click: (value) => {
										this.del(params.row,params.index);
									}
								  }
							},"删除")
						  ])
                        }
                    }
                ],
				dataList:[],
			visible:false,
            }
        },
	   created: function () {
			var that = this;
			this.https.fetchPost('/banner/contr/get_baner_list',{})
			.then(function (response) {
			    that.dataList = response.data;
			})
			.catch(function (error) {
			  console.log(error);
			});
			
			
			
		},
        methods: {
			getBanerList(){
				var that = this;
				this.https.fetchPost('/banner/contr/get_baner_list',{})
				.then(function (response) {
				    that.dataList = response.data;
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			swapArr(arr, index1, index2){
				//改变数组下面两个元素的位置
				 arr[index1] = arr.splice(index2, 1, arr[index1])[0];
				 return arr;
			},
			 onDragDrop(a,b){
				//拖动表格里面的每一行 
				console.log(a,b);
				this.dataList=this.swapArr(this.dataList,a,b);
			},
			save_index_item(){
				var that = this;
				var list = this.dataList;
				var typeList=new Array();
				list.forEach(function(value,index){
					var type={}
					type.typeCustomerAppId = value.bannerId;
					type.indexItem = index;
					type.bannerId = value.bannerId;
					typeList.push(type);
				})
				console.log(JSON.stringify(typeList));
				this.https.fetchPost('/banner/contr/update_index_item',{banerList:JSON.stringify(typeList)})
				.then(function (response) {
					if(response.data.code =="200"){
						that.$Message.success(response.data.message);
						that.https.fetchPost('/banner/contr/get_baner_list',{})
						.then(function (response) {
							that.dataList = response.data;
						})
						.catch(function (error) {
						  console.log(error);
						});
						
					}
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			del(params,index){
				var  that = this;
				this.https.fetchPost('/banner/contr/del',{
					bannerId:params.bannerId,
					customerAppId:params.customerAppId
				})
				.then(function (response) {
					console.log(response.data);
					if(response.data.code =="200"){
						that.dataList.splice(index);
						that.$Message.success(response.data.message);
						
					}
				})
				.catch(function (error) {
				  console.log(error);
				});
				
			}
        }
    }
</script>
