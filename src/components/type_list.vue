<style>

.title{
	padding-left: 30px;
	padding-right: 10px;
}

</style>
<template>
	<div id="app" style="padding: 10px;">
		<div style="padding-bottom: 20px;">
<!-- 			<Form ref="formValidate" :model="formValidate" :label-width="100">
				<Row>
					
					<FormItem>
						<div style="float:left">
						<i-button type="primary" icon="ios-search" @click="handleSubmit('formValidate')">搜索</i-button>
					    <Button @click="handleReset('formValidate')" icon="ios-search">重置</Button>
						</div>
						<div style="float:left;padding-left:5px;">
						<i-button type="primary" icon="ios-cloud-upload-outline" @click="add_customer_app()">新增</i-button>
						</div>
					</FormItem>
					
				</Row>
		
			   
			</Form> -->
			<Row>
				<i-button type="primary" icon="ios-cloud-upload-outline" @click="add_type()">新增</i-button>
			</Row>
		</div>
	   <Table border :columns="columns7" :data="dataList" style="height: 580px;"></Table>
	</div>
</template>

<script>
    export default {
		name: 'app',
        data () {
            return {
                columns7: [
                    {
                        title: 'id',
                        key: 'id',
						width: 50,
						align: 'center'
                    },
                    {
                        title: '分类名称',
                        key: 'typeValue',
						align: 'center',
						width: 150
					},
					{
					    title: 'logo',
					    key: 'typeLogo',
						align: 'center',
						width: 100,
						render: (h, params) => {
							if(params.row.typeLogo == ""){
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
										src :params.row.typeLogo
									}
								})
							}
							
							
						}
					},
					{
					    title: '序号',
					    key: 'serialNumber',
						align: 'center',
						width: 100
					},
					{
					    title: '分类类型',
					    key: 'showType',
						align: 'center',
						width: 100,
						render: (h, params) => {
						   return h('i-switch',{
						        props: {
						          size: 'large',
						          value: params.row.showType == 2? false:true
						        },
						        on: {
						          'on-change': (value) => {//触发事件是on-change,用双引号括起来，
									 this.switch(params.row,params.index,"showType") //params.index是拿到table的行序列，可以取到对应的表格值
									 }
						        }
						      }, [
						          h('span', {
						              slot: 'open'
						          }, '宫格'),
						          h('span', {
						              slot: 'close'
						          }, '列表')
						      ])
						}
					},
					{
					    title: '是否隐藏',
					    key: 'isHide',
						align: 'center',
						width: 80,
						render: (h, params) => {
						   return h('i-switch',{
						        props: {
						          size: 'large',
						          value: params.row.isHide == 2 ? false:true
						        },
						        on: {
						          'on-change': (value) => {//触发事件是on-change,用双引号括起来，
									 this.switch(params.row,params.index,"isHide") //params.index是拿到table的行序列，可以取到对应的表格值
									 }
						        }
						      }, [
						          h('span', {
						              slot: 'open'
						          }, '显示'),
						          h('span', {
						              slot: 'close'
						          }, '隐藏')
						      ])
						}
					},
					{
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
						  return h('div', [
							h('Button', {
								  props: {
									type: 'primary' ,// iview自带的删除icon
									icon: 'ios-add-circle'
								  },
								  on: {
									click: () => {
										this.edit_type(params.row.id);
									}
								  }
							},'编辑'),
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
			    jumpAppId: '',
			    typeId: '',
				jumpName:'',
				appId:"",
				pageNo:0,
				total:0
			},
			typeList:[],
			boxList:[],
			imgUrl :"",
			pageNo:1,
			ruleValidate: {
			    name: [
			        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
			    ],
			    city: [
			        { required: true, message: 'Please select the city', trigger: 'change' }
			    ]
			}
            }
        },
	   created: function () {
		   var that = this;
		   // `this` 指向 vm 实例
		   this.https.fetchPost('/type/contr/find_list', that.formValidate)
			.then(function (response) {
			  that.dataList = response.data.rows;
			  that.formValidate.pageNo = response.data.pageNo;
			  that.formValidate.total = response.data.total;
			  console.log(response.data);
			})
			.catch(function (error) {
			  console.log(error);
			});
			
		},
        methods: {
			switch(param,index,type) {
			  //打开是true,已经处理1
			  var isHide = param.isHide;
			  var id = param.id;
			  var showType = param.showType;
			  
			  if(type =="showType"){
				  if(showType ==2){
					  showType = 1
				  }else{
					  showType = 2;
				  } 
				  var that = this;
				  // `this` 指向 vm 实例
				   this.https.fetchPost('/type/contr/editType', {
				      id: id,        
				  	  showType:showType
				    })
				    .then(function (response) {
				  		that.dataList[index].showType = showType;
				    })
				    .catch(function (error) {
				      console.log(error);
				    });
			  }else{
				  if(isHide ==2){
					  isHide = 1
				  }else{
					  isHide = 2;
				  } 
				  var that = this;
				  // `this` 指向 vm 实例
				   this.https.fetchPost('/type/contr/editType', {
				      id: id,        
				      isHide: isHide
				    })
				    .then(function (response) {
				  				that.dataList[index].isHide = isHide;
				    })
				    .catch(function (error) {
				      console.log(error);
				    });
			  }
			 },
			 add_type(){
				 this.$router.push({path: "/add_type"})
			 },
			 edit_type(id){
				 this.$router.push({name:'addType',params:{'id':id}});
			 },
			 del(params,index){
				 var that = this;
				 console.log(index,params)
				 that.dataList.splice(index,1);
				this.https.fetchPost('/type/contr/delete_type',{'id':params.id})
				 .then(function (response) {
					 that.$Message.success("删除成功");
				 })
				 .catch(function (error) {
				   console.log(error);
				 });
				 
			 }
        }
    }
</script>
