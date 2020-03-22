<style>

.title{
	padding-left: 30px;
	padding-right: 10px;
}

</style>
<template>
	<div id="app" style="padding: 3px;">
		<div>
			<Form ref="formValidate" :model="formValidate" :label-width="100">
				<Row>
					<Col span="5">
					<FormItem label="分类" prop="typeId">
						<Select v-model="formValidate.typeId" style="width:250px" autocomplete="off" >
							<Option v-for="(item,index) in typeList" :value="item.id" :key="item.typeValue">{{ item.typeValue }}</Option>
						</Select>
						</Select>
					</FormItem>
					</Col>
					<FormItem>
						<div style="float:left;padding-left: 50px">
						<i-button type="primary" icon="ios-search" @click="handleSubmit('formValidate')">搜索</i-button>
					    <Button @click="handleReset('formValidate')" icon="ios-search">重置</Button>
						</div>
						<div style="float:left;padding-left:5px;">
						<i-button type="primary" icon="ios-cloud-upload-outline" @click="save_index_item()">保存排序</i-button>
						</div>
					</FormItem>
				</Row>
			</Form>
		</div>
		<i-table width="1200" height="700"border ref="currentRowTable" :columns="columns7" :data="dataList" :draggable="true" @on-drag-drop="onDragDrop"></i-table>
		   <!-- <i-table height="800" :columns="columns7" :data="dataList"></i-table> -->

	</div>

</template>

<script>
    export default {
		name: 'app',
        data () {
            return {
                columns7: [
                    {
						title: '',
                        key: 'typeCustomerAppId',
						width: 1,
						ellipsis:true,
						tooltip:true,
						align: 'center'
                    },
					{
						title:"",
					    key: 'customerAppId',
						width: 1,
						ellipsis:true,
						tooltip:true,
						align: 'center'
					},
					{
						title:"",
					    key: 'customerAppTypdId',
						width: 1,
						ellipsis:true,
						tooltip:true,
						align: 'center'
					},
					{
					    title:"",
					    key: 'typeId',
						width: 1,
						ellipsis:true,
						tooltip:true,
						align: 'center'
					},
                    {
                        title: '广告名',
                        key: 'jumpName',
						align: 'center',
						width: 150
					},
					{
					    title: '图标',
					    key: 'logo',
						align: 'center',
						width: 100,
						render: (h, params) => {
							if(params.row.logo == ""){
								return h('span', '无logo');
							}else{
								return h('img',{
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										width: '60px', // 改变icon的样式
										height:'60px'
									},
									attrs:{
										src :params.row.logo
									}
								})
							}
							
							
						}
					},
					/* {
					    title: '序号',
					    key: 'indexItem',
						align: 'center',
						width: 100
					}, */
					{
					    title: 'appid',
					    key: 'jumpAppId',
						align: 'center',
						width: 180
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
			formValidate: {
			    typeList: '',
				
			},
			
			typeList:[],
			boxList:[],
			visible:false,
			pageNo:0,
			ruleValidate: {
			    typeId: [
			        { required: true, message: 'The typeId cannot be empty', trigger: 'blur' }
			    ]
			  
			}
            }
        },
	   created: function () {
		   var that = this;
			this.https.fetchPost('/type/contr/type_data_dictionary', that.formValidate)
			.then(function (response) {
				console.log(response.data);
			    that.typeList = response.data;
			})
			.catch(function (error) {
			  console.log(error);
			});
			
			
			
		},
        methods: {
			handleView(url) {
			      this.imgUrl = url;
			      this.visible = true;
			},
			handleSubmit (name) {
				var that = this;
				if(that.formValidate.typeId ==undefined){
					 that.$Message.success('请输入查询条件!');
					return;
				}
				
				this.https.fetchPost('/type/contr/find_types', that.formValidate)
				.then(function (response) {
					that.dataList = response.data;
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			handleReset (name) {
			   this.$refs[name].resetFields();
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
					type.typeCustomerAppId = value.typeCustomerAppId;
					type.indexItem = index;
					typeList.push(type);
				})
				console.log(JSON.stringify(typeList));
				this.https.fetchPost('/type/contr/update_index_item',{typeList:JSON.stringify(typeList)})
				.then(function (response) {
					console.log(response.data);
					if(response.data.code =="200"){
						that.$Message.success(response.data.message);
					}
				})
				.catch(function (error) {
				  console.log(error);
				});
			},
			del(params,index){
				var  that = this;
				that.dataList.splice(index,1);
				this.https.fetchPost('/type/contr/del',{
					typeCustomerAppId:params.typeCustomerAppId,
					customerAppId:params.customerAppId,
					typeId:params.typeId,
					customerAppTypdId:params.customerAppTypdId
				})
				.then(function (response) {
					console.log(response.data);
					if(response.data.code =="200"){
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
