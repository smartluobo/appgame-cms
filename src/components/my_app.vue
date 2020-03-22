<style>

.title{
	padding-left: 30px;
	padding-right: 10px;
}

</style>
<template>
	<div id="app" style="padding: 10px;">
		<div>
			<Form ref="formValidate" :model="formValidate" :label-width="100">
				<Row>
				<Col span="5">

			    <FormItem label="appId" prop="appId">
			        <Input v-model="formValidate.appId" placeholder="Enter your name"></Input>
			    </FormItem>
				
				</Col>
				
				<Col span="5">
				<FormItem label="名字" prop="title">
				   <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
				   
				</FormItem>
				</Col>
				
				<Col span="5">
			    <FormItem label="审核状态" prop="isShow">
			        <Select v-model="formValidate.isShow" placeholder="Select your status">
			            <Option value="0">审核</Option>
			            <Option value="1">通过</Option>
			        </Select>
			    </FormItem>
				</Col>
				
				<Col span="5">
				<FormItem label="是否盒子" prop="isBox">
				    <Select v-model="formValidate.isBox" placeholder="Select your status">
				        <Option value="0">否</Option>
				        <Option value="1">是</Option>
				    </Select>
				</FormItem>
				</Col>
				
				</Row>

			    <FormItem>
					<div style="float:left">
					<i-button type="primary" icon="ios-search" @click="handleSubmit('formValidate')">搜索</i-button>
			        <Button @click="handleReset('formValidate')" icon="ios-search">重置</Button>
					<i-button type="primary" icon="ios-cloud-upload-outline" >模板下载</i-button>
					<i-button type="primary" icon="ios-cloud-upload-outline" @click="batchUpdate(1)">批量开启</i-button>
					<i-button type="primary" icon="ios-cloud-upload-outline" @click="batchUpdate(0)">批量关闭</i-button>
					</div>
					<div style="float:left;padding-left: 5px;">
					     <Upload action="/config/contr/importExcel" name="textFile">
					         <i-button type="primary" icon="ios-cloud-upload-outline" >导入模板</i-button>
					     </Upload>
					</div>
					<div style="float:left;padding-left:5px;">
					<i-button type="primary" icon="ios-cloud-upload-outline" @click="addCofig()">新增</i-button>
					<i-button type="dashed">总新增用户:{{this.$data.allVisitUvNew}}</i-button>
					<i-button type="dashed">天新增点击次数:{{this.$data.allVisitPv}}</i-button>
					</div>
				</FormItem>
			</Form>
		</div>
		  <div style="min-height:500px ;">
			  <Table border :columns="columns7" :data="dataList"></Table>
		  </div>
		  <Page :total="this.$data.formValidate.total" :current="this.$data.formValidate.pageNo" show-elevator style="padding-top: 5px;" @on-change="changePage"/>
	</div>

</template>

<script>
    export default {
		name: 'app',
		inject:['reload'],
        data () {
            return {
                columns7: [
                    {
                        title: 'id',
                        key: 'id',
						width: 80,
						align: 'center'
                    },
                    {
                        title: 'appId',
                        key: 'appId',
						align: 'center',
						width: 200
					},
					{
					    title: '小程序名字',
					    key: 'title',
						align: 'center',
						width: 250
					},
					{
					    title: '昨日新增用户',
					    key: 'visitUvNew',
						align: 'center',
						width: 150
					},
					{
					    title: '昨日访问次数',
					    key: 'visitPv',
						align: 'center',
						width: 150
					},
					{
					    title: '总新增人数',
					    key: 'allVisitUvNew',
						align: 'center',
						width: 150
					},
					{
					    title: '今日UV',
					    key: 'uv',
						align: 'center',
						width: 100
					},
					{
					    title: '今日访问次数',
					    key: 'pv',
						align: 'center',
						width: 150
					},
					{
					    title: '类型',
						key: 'isBox',
						align: 'center',
						width: 100,
						render: (h, params) => {
						   return h('i-switch',{
						        props: {
						          size: 'large',
						          value: params.row.isBox == 0 ? false:true
						        },
						        style: {
						            // marginRight: '5px'
						        },
						        on: {
						          'on-change': (value) => {//触发事件是on-change,用双引号括起来，
										   //参数value是回调值，并没有使用到
									 this.switch(params.row,params.index,'isBox') //params.index是拿到table的行序列，可以取到对应的表格值
									 }
						        }
						      }, [
						          h('span', {
						              slot: 'open'
						          }, '盒子'),
						          h('span', {
						              slot: 'close'
						          }, '截流')
						      ])
						}
						/* render:(h,params)=>{
							if(params.row.isBox == 1){
								return h('span', '盒子');
					
							}else if(params.row.isBox == 2){
								return h('span', '截流');
					
							}
						} */
					},
                    {
                        title: 'unitId',
						key: 'unitId',
						align: 'center',
						width: 100
                    },
                    {
                        title: '审核状态',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                           return h('i-switch',{
                                props: {
                                  size: 'large',
                                  value: params.row.isShow == 0 ? false:true
                                },
                                style: {
                                    // marginRight: '5px'
                                },
                                on: {
                                  'on-change': (value) => {//触发事件是on-change,用双引号括起来，
										   //参数value是回调值，并没有使用到
									 this.switch(params.row,params.index,'isShow') //params.index是拿到table的行序列，可以取到对应的表格值
									 }
                                }
                              }, [
                                  h('span', {
                                      slot: 'open'
                                  }, '通过'),
                                  h('span', {
                                      slot: 'close'
                                  }, '审核')
                              ])
                        }
                    },
					{
					    title: '批量控制',
					    key: 'action',
					    width: 100,
					    align: 'center',
					    render: (h, params) => {
					       return h('i-switch',{
					            props: {
					              size: 'large',
					              value: params.row.isBatch == 0 ? false:true
					            },
					            style: {
					                // marginRight: '5px'
					            },
					            on: {
					              'on-change': (value) => {//触发事件是on-change,用双引号括起来，
										   //参数value是回调值，并没有使用到
									 this.isBatch(params.row,params.index) //params.index是拿到table的行序列，可以取到对应的表格值
									 }
					            }
					          }, [
					              h('span', {
					                  slot: 'open'
					              }, '是'),
					              h('span', {
					                  slot: 'close'
					              }, '否')
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
										this.edit(params.row)
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
										this.del(params.row.id,params.index);
									}
								  }
							},"删除")
						  ])
                        }
                    }
                ],
                data6: [{
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    }],
				dataList:[],
				value:'',
				appId:'',
				value1:'',
			formValidate: {
			    appId: '',
			    isShow: '',
				isBox:'',
				pageNo:0,
				total:0,
				title:''
			},
			allVisitPv:0,
			allVisitUvNew:0,
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
		   this.https.fetchPost('/config/contr/findConfigList', that.formValidate)
			.then(function (response) {
			  that.dataList = response.data.rows;
			  that.formValidate.pageNo = response.data.pageNo;
			  that.formValidate.total = response.data.total;
			  that.allVisitPv = response.data.allCount.allVisitPv;
			  that.allVisitUvNew = response.data.allCount.allVisitUvNew;
			})
			.catch(function (error) {
			  console.log(error);
			});
		},
        methods: {
			handleSubmit (name) {
				var that = this;
				console.log(this.formValidate)
				var appid = this.formValidate.appid;
				var is_show = this.formValidate.isShow;
				this.https.fetchPost('/config/contr/findConfigList', that.formValidate)
				 .then(function (response) {
					that.dataList = response.data.rows;
					that.formValidate.total =  response.data.total;
					that.formValidate.pageNo =  response.data.pageNo;
					that.allVisitPv = response.data.allCount.allVisitPv;
					that.allVisitUvNew = response.data.allCount.allVisitUvNew;
				 })
				 .catch(function (error) {
				   console.log(error);
				 });
			},
			handleReset (name) {
			   this.$refs[name].resetFields();
			},
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            },
			change (){
				
			},
			search (){
				var that = this.appId;
				console.log(that+"appId");
				console.log(this.value+"value");
				console.log(this.value1);
			},
			switch(param,index,type) {
			  //打开是true,已经处理1
			   var id = param.id;
			   var isBox = param.isBox;
			   var isShow = param.isShow;
			  if(type =="isShow"){
				  if(isShow ==0){
				  	isShow = 1
				  }else{
				  	isShow = 0;
				  } 
			  }else{
				  if(isBox ==0){
				  	isBox = 1
				  }else{
				  	isBox = 0;
				  } 
			  }
			  var that = this;
			  // `this` 指向 vm 实例
			  this.https.fetchPost('/config/contr/editConfig', {
			     id: id,        // 参数 firstName
			     isShow: isShow,    // 参数 lastName
				 isBox: isBox
			   })
			   .then(function (response) {
				that.dataList[index].isShow = isShow;
			   })
			   .catch(function (error) {
			     console.log(error);
			   });
			 },
			 isBatch(param,index) {
			   //打开是true,已经处理1
			    var id = param.id;
			    var isBatch = param.isBatch;
				if(isBatch ==0){
					isBatch = 1
				}else{
					isBatch = 0;
				} 
			   var that = this;
			   // `this` 指向 vm 实例
			   this.https.fetchPost('/config/contr/update_is_batch', {
			      id: id,        // 参数 firstName
			      isBatch: isBatch    // 参数 lastName
			    })
			    .then(function (response) {
					that.dataList[index].isBatch = isBatch;
			    })
			    .catch(function (error) {
			      console.log(error);
			    });
			  },
			 del (params,index){
				 console.log("213213"+index);
				 var that = this;
				 var id = params.id;
				 this.https.fetchPost('/config/contr/delConfig', {
				    id: id        // 参数 firstName
				  })
				  .then(function (response) {
					  if(response.data.code == "200"){
						  that.dataList.splice(index);
						  that.$Message.success('删除成功!');
					  }else{
						  that.$Message.success('删除失败!');
					  }
						
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			 },
			 changePage(res){
				 console.log(res+"*******");
				 var that = this;
				 that.formValidate.pageNo = res;
				 // `this` 指向 vm 实例
				 this.https.fetchPost('/config/contr/findConfigList', that.formValidate)
				  .then(function (response) {
				 		that.dataList = response.data.rows;
						that.formValidate.pageNo = response.data.pageNo;
						that.formValidate.total = response.data.total;
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			 },
			 addCofig(){
				 this.$router.push({path: "/add_config"})
			 },
			 edit(params){
				 this.$router.push({name:'addConfig',params:{'id':params.id}});
			 },
			 batchUpdate(params){
				 var that = this;
			 	this.https.fetchPost('/config/contr/batch_update_is_show', {
					isShow : params
				})
			 	 .then(function (response) {
					//this.$router.push({name:'addConfig',params:{'id':params.id}});
					that.$Message.success('批量操作成功!');
					that.$router.go(0)
			 	 })
			 	 .catch(function (error) {
			 	   console.log(error);
			 	 });
				 
				 
			 },
			 
			 del(id,index){
				 var that = this;
				 this.https.fetchPost('/config/contr/delConfig', {id:id})
				  .then(function (response) {
					that.dataList.splice(index);
					that.$Message.success('删除成功!');
					this.reload();
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			 }
			
        }
    }
</script>
